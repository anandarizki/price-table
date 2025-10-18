import { motion } from "motion/react";
import Button from "./Button";
import { ANNUAL_DISCOUNT } from "./data";
type Props = {
  darkMode?: boolean;
  annually: boolean;
  onToggle: (annually: boolean) => void;
};

const BillSwitcher = ({ darkMode, annually, onToggle }: Props) => {
  const activeTab = (
    <motion.span
      layout
      layoutId="active-tab"
      transition={{ duration: 0.1 }}
      className={`absolute rounded-full inset-1 shadow-xs ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    />
  );
  return (
    <div
      className={`gap-1 grid grid-cols-2 rounded-full shadow-inner w-full max-w-[360px] m-auto ${
        darkMode ? "bg-white/10" : "bg-gray-100/80"
      }`}
    >
      <Button
        onClick={() => onToggle(true)}
        disabled={annually}
        animateScale={0.05}
        className="p-2 sm:p-3 relative"
      >
        {annually && activeTab}
        <span className="relative">
          <span>Annually</span>
          {` `}
          <span className="text-xs">(Save {ANNUAL_DISCOUNT}%)</span>
        </span>
      </Button>
      <Button
        onClick={() => onToggle(false)}
        disabled={!annually}
        animateScale={0.05}
        className="p-2 sm:p-3 relative"
      >
        {!annually && activeTab}
        <span className="relative">
          <span>Monthly</span>
        </span>
      </Button>
    </div>
  );
};

export default BillSwitcher;
