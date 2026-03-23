import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Globe,
  HardHat,
  LayoutGrid,
  MapPinned,
  Mountain,
  Plane,
  Satellite,
  Trees,
  Wrench,
} from "lucide-react";

export type ServiceDefinition = {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: LucideIcon;
};

export const services: ServiceDefinition[] = [
  {
    id: "topographic-surveys",
    title: "Topographic Surveys",
    description:
      "Detailed terrain mapping and elevation data for project planning and design.",
    details:
      "We capture natural and man-made features (terrain, elevations, roads, buildings, drainage) and deliver accurate maps, plans, and digital terrain models to support design and construction.",
    icon: Mountain,
  },
  {
    id: "cadastral-surveys",
    title: "Land (Cadastral) Surveys",
    description:
      "Boundary determination, subdivision, and land ownership documentation.",
    details:
      "We provide accurate boundary determination, beacon verification/re-establishment, subdivisions, and documentation aligned with applicable survey regulations and land administration requirements.",
    icon: MapPinned,
  },
  {
    id: "engineering-surveys",
    title: "Engineering Surveys",
    description: "High-precision surveys for infrastructure and construction projects.",
    details:
      "We support construction and infrastructure projects with setting out, as-built surveys, control establishment, profiles and cross-sections, and quality checks to keep work aligned and verifiable.",
    icon: HardHat,
  },
  {
    id: "geodetic-gps-control",
    title: "Geodetic GPS Control",
    description:
      "CORS Network-based geodetic control surveys for large-scale projects.",
    details:
      "We establish and verify geodetic control networks using GNSS methods (including CORS/RTK workflows where applicable) to provide reliable horizontal and vertical control for large-scale mapping and engineering works.",
    icon: Satellite,
  },
  {
    id: "uav-mapping",
    title: "UAV-Based Mapping",
    description: "Drone-powered aerial surveys for rapid and accurate terrain mapping.",
    details:
      "We use UAV/drone surveys to produce orthophotos, point clouds, DEM/DSM, and other mapping outputs for planning, monitoring, and progress reporting with fast turnaround.",
    icon: Plane,
  },
  {
    id: "gis-remote-sensing",
    title: "GIS & Remote Sensing",
    description:
      "Spatial data analysis, management, and presentation using GIS technology.",
    details:
      "We build and manage GIS datasets, perform spatial analysis, and integrate remote sensing products to support decision-making, reporting, and visualization.",
    icon: Globe,
  },
  {
    id: "spatial-planning",
    title: "Spatial Planning",
    description: "Strategic spatial analysis and planning for sustainable development.",
    details:
      "We provide spatial analysis and planning support for sustainable development, aligning land potential, constraints, and stakeholder needs with implementable strategies.",
    icon: LayoutGrid,
  },
  {
    id: "land-use-planning",
    title: "Land-Use Planning",
    description: "Optimal land allocation and use strategies for communities and projects.",
    details:
      "We develop land-use plans and frameworks that balance growth, infrastructure needs, environmental constraints, and regulatory requirements.",
    icon: Trees,
  },
  {
    id: "urban-regional-planning",
    title: "Urban & Regional Planning",
    description: "Comprehensive planning solutions for urban and regional development.",
    details:
      "We support urban and regional development with policy-aligned planning, development control guidance, and data-driven frameworks for implementation and monitoring.",
    icon: Building2,
  },
  {
    id: "equipment-supply-training",
    title: "Equipment Supply & Training",
    description: "Sales, calibration, and training on professional surveying equipment.",
    details:
      "We supply surveying equipment and provide training and support to help teams operate confidently and maintain accurate, reliable workflows in the field.",
    icon: Wrench,
  },
];

export function getServiceById(id: string | undefined) {
  return services.find((s) => s.id === id);
}

