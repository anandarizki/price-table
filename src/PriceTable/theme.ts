import { Circle, PencilRuler, Square, Triangle } from "lucide-react";
import type { PlanId } from "./@type";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type PlanTheme = {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: { hex: string; bg: string; text: string };
};

export const planTheme: Record<PlanId, PlanTheme> = {
  basic: {
    Icon: Circle,
    color: {
      hex: "#689884",
      bg: "bg-[#689884]",
      text: "text-[#689884]",
    },
  },
  pro: {
    Icon: Square,
    color: {
      hex: "#5682bb",
      bg: "bg-[#5682bb]",
      text: "text-[#5682bb]",
    },
  },
  enterprise: {
    Icon: Triangle,
    color: {
      hex: "#bb832d",
      bg: "bg-[#bb832d]",
      text: "text-[#bb832d]",
    },
  },
  custom: {
    Icon: PencilRuler,
    color: {
      hex: "#AEAD75",
      bg: "bg-[#AEAD75]",
      text: "text-[#AEAD75]",
    },
  },
};

export const baseClass = (isDark: boolean) =>
  `transition-colors text-sm md:text-base ${
    isDark
      ? "bg-[#292A24] text-white border-white/10"
      : "bg-[#FFFDF6] text-black border-black/10"
  }`;
