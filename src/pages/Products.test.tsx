import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Products from "./Products";

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Products", () => {
  it("opens product details and switches to its resources tab", async () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "View Details" })[0]);

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("heading", {
        name: "CHCNAV Vi-Li i100 GNSS Receiver",
        level: 2,
      }),
    ).toBeInTheDocument();

    fireEvent.mouseDown(within(dialog).getByRole("tab", { name: "Resources" }), {
      button: 0,
    });
    expect(
      await within(dialog).findByText(
        "No brochures, datasheets, or manuals are available for this product yet.",
      ),
    ).toBeInTheDocument();
  });
});
