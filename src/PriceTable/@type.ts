export type FeatureId =
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "f9"
  | "f10"
  | "f11"
  | "f12";

export type PlanId = "basic" | "pro" | "enterprise" | "custom";

export type Plan = {
  title: string;
  description: string;
  disableFeatures: string[];
  basePrice: number;
};

export type Feature = {
  id: FeatureId;
  label: string;
  price: number;
};

export type PlanProps = {
  darkMode?: boolean;
  annually: boolean;
  className?: string;
  data: Plan;
};
