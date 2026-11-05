import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Register from "../pages/Register";

const { signUp, signInWithOtp } = vi.hoisted(() => ({
  signUp: vi.fn(),
  signInWithOtp: vi.fn(),
}));

vi.mock("../lib/supabaseClient", () => ({
  supabase: {
    auth: { signUp, signInWithOtp },
  },
}));

vi.mock("@/components/AuthLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Geoshop registration", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("alert", vi.fn());
    signUp.mockResolvedValue({ data: {}, error: null });
    signInWithOtp.mockResolvedValue({ error: null });
  });

  it.each([
    { checked: false, expectedConsent: false },
    { checked: true, expectedConsent: true },
  ])("submits marketing consent as $expectedConsent", async ({ checked, expectedConsent }) => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("(+254)7 12 345678"), {
      target: { value: "+254712345678" },
    });
    fireEvent.change(screen.getByPlaceholderText("your.email@example.com"), {
      target: { value: "person@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "secure-password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter password"), {
      target: { value: "secure-password" },
    });

    const consentCheckbox = screen.getByRole("checkbox");
    if (checked) fireEvent.click(consentCheckbox);
    fireEvent.click(screen.getByRole("button", { name: "Send OTP" }));

    await waitFor(() => expect(signUp).toHaveBeenCalledOnce());
    expect(signUp).toHaveBeenCalledWith({
      email: "person@example.com",
      password: "secure-password",
      options: {
        data: {
          phone: "+254712345678",
          marketing_consent: expectedConsent,
        },
      },
    });
    await waitFor(() => expect(signInWithOtp).toHaveBeenCalledOnce());
  });
});
