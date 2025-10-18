import type { Feature, Plan, PlanId } from "./@type";

export const ANNUAL_DISCOUNT = 15;

export const features: Feature[] = [
  { id: "f1", label: "Custom Domain", price: 3 },
  { id: "f2", label: "API Access", price: 5 },
  { id: "f3", label: "Team Seats", price: 4 },
  { id: "f4", label: "Priority Support", price: 5 },
  { id: "f5", label: "Advanced Analytics", price: 4 },
  { id: "f6", label: "Role-Based Access", price: 3 },
  { id: "f7", label: "Single Sign-On", price: 5 },
  { id: "f8", label: "Automated Backups", price: 2 },
  { id: "f9", label: "White-labeling", price: 4 },
  { id: "f10", label: "Audit Logs", price: 2 },
  { id: "f11", label: "Onboarding Sessions", price: 3 },
  { id: "f12", label: "SLA Uptime Guarantee", price: 5 },
];

export const plans: Record<PlanId, Plan> = {
  basic: {
    id: "basic",
    title: "Basic",
    description:
      "Core tools with reliability, performance, and essential support.",
    disableFeatures: ["f6", "f7", "f8", "f9", "f10", "f11", "f12"],
    basePrice: 7,
  },
  pro: {
    id: "pro",
    title: "Pro",
    description:
      "Advanced tools for growing teams, offering collaboration, analytics, integrations, and support.",
    disableFeatures: ["f9", "f10", "f11", "f12"],
    basePrice: 4,
  },
  enterprise: {
    id: "enterprise",
    title: "Enterprise",
    description:
      "Scalable solution with security, compliance, and priority support.",
    disableFeatures: [],
    basePrice: 3,
  },
  custom: {
    id: "custom",
    title: "Custom",
    description:
      "Tailored offerings with expert onboarding to meet unique business needs swiftly.",
    disableFeatures: ["f6", "f7", "f8", "f9", "f10", "f11", "f12"],
    basePrice: 0,
  },
};
