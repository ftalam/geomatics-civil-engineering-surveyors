import { describe, it, expect } from "vitest";
import { services } from "@/data/services";

const expectedServiceTitles = [
  "Topographic Surveys",
  "Land (Cadastral) Surveys",
  "Engineering Surveys",
  "Geodetic GPS Control",
  "UAV-Based Mapping",
  "GIS & Remote Sensing",
  "Spatial Planning",
  "Land-Use Planning",
  "Urban & Regional Planning",
  "Equipment Supply & Training",
];

describe("Services Validation", () => {
  it("should have all expected services defined", () => {
    const titles = services.map((s) => s.title);
    expectedServiceTitles.forEach((title) => {
      expect(titles).toContain(title);
    });
  });

  it("should have exactly 10 services", () => {
    expect(services.length).toBe(10);
  });

  it("should have required service properties", () => {
    services.forEach((service) => {
      expect(typeof service.id).toBe("string");
      expect(service.id.length).toBeGreaterThan(0);
      expect(typeof service.title).toBe("string");
      expect(service.title.length).toBeGreaterThan(0);
      expect(typeof service.description).toBe("string");
      expect(service.description.length).toBeGreaterThan(0);
      expect(typeof service.details).toBe("string");
      expect(service.details.length).toBeGreaterThan(0);
      expect(typeof service.icon).toBe("function");
    });
  });

  it("should not have duplicate services", () => {
    const uniqueTitles = new Set(services.map((s) => s.title));
    const uniqueIds = new Set(services.map((s) => s.id));
    expect(uniqueTitles.size).toBe(services.length);
    expect(uniqueIds.size).toBe(services.length);
  });
});
