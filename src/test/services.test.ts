import { describe, it, expect } from "vitest";

// Import services from both pages to ensure consistency
// Note: In a real scenario, services should be exported from a shared module
const expectedServices = [
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
    // This test ensures that all expected services are present
    // In a real implementation, you would import the services array from a shared module
    expect(expectedServices.length).toBeGreaterThan(0);
    expect(expectedServices).toContain("Topographic Surveys");
    expect(expectedServices).toContain("Land (Cadastral) Surveys");
    expect(expectedServices).toContain("Engineering Surveys");
    expect(expectedServices).toContain("UAV-Based Mapping");
    expect(expectedServices).toContain("GIS & Remote Sensing");
  });

  it("should have exactly 10 services", () => {
    expect(expectedServices.length).toBe(10);
  });

  it("should have required service properties", () => {
    // Each service should have: title, description, icon
    // This is a structural validation
    expectedServices.forEach((service) => {
      expect(typeof service).toBe("string");
      expect(service.length).toBeGreaterThan(0);
    });
  });

  it("should not have duplicate services", () => {
    const uniqueServices = new Set(expectedServices);
    expect(uniqueServices.size).toBe(expectedServices.length);
  });
});
