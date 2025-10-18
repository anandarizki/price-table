import React from "react";
import { motion } from "motion/react";
type Props = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  animateScale?: number;
};

const Button = ({
  onClick,
  className = "",
  children,
  disabled,
  animateScale = 0.03,
}: Props) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1 + animateScale }}
      whileTap={{ scale: disabled ? 1 : 1 - animateScale }}
      onClick={onClick}
      className={`${
        disabled ? "pointer-events-none" : "cursor-pointer"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
