import { useState } from "react";
import type { Plan, PlanId } from "./@type";
import { motion } from "motion/react";
import BillSwitcher from "./BillSwitcher";
import { baseClass, planTheme } from "./theme";
import Card from "./Card";
import PlanCustom from "./PlanCustom";

type Props = {
  darkMode?: boolean;
  plans: Record<PlanId, Plan>;
  annualDiscount?: number;
  onSelectPlan: (id: string) => void;
};

const PriceTable = ({
  darkMode = false,
  plans,
  annualDiscount,
  onSelectPlan,
}: Props) => {
  const [annually, setAnnually] = useState(true);

  const discount = annually && annualDiscount ? annualDiscount : 0;
  return (
    <div className={`h-screen overflow-auto ${baseClass(darkMode)}`}>
      {/* Intro Section */}
      <motion.div
        initial={{ translateY: "100px", opacity: 0 }}
        animate={{ translateY: "0px", opacity: 1 }}
        transition={{ ease: "easeOut" }}
        className={`p-15 md:p-20 md:pb-0 pb-0 text-center ${baseClass(
          darkMode
        )}`}
      >
        <h1 className="text-3xl md:text-5xl font-bold">Plans</h1>
        <p className="text-sm md:text-base mt-2">
          Choose your subscription plan based on your needs.
        </p>
      </motion.div>

      {/* Anually Switcher */}
      <motion.div
        initial={{ translateY: "100px", opacity: 0 }}
        animate={{ translateY: "0px", opacity: 1 }}
        transition={{ delay: 0.1, ease: "easeOut" }}
        className={`sticky top-0 z-20 py-2 my-2 text-sm md:text-base backdrop-blur-lg bg-transparent ${baseClass(
          darkMode
        )}`}
      >
        <BillSwitcher
          darkMode={darkMode}
          annually={annually}
          onToggle={setAnnually}
        />
      </motion.div>

      {/* Plans Section */}
      <motion.section
        initial={{ translateY: "100px", opacity: 0 }}
        animate={{ translateY: "0px", opacity: 1 }}
        transition={{ delay: 0.2, ease: "easeOut" }}
        className="p-6 pt-0 md:p-10 min-h-[calc(100vh-50px)]"
      >
        <div className="container grid grid-cols-1 gap-4 lg:gap-8 max-w-7xl m-auto">
          {/* Predefined Plans */}
          <div className="grid gap-4 lg:gap-0 sm:grid-cols-2 lg:flex items-center">
            {/* Basic Plan */}
            <Card
              annually={annually}
              discount={discount}
              darkMode={darkMode}
              onSelect={onSelectPlan}
              {...plans.basic}
              {...planTheme.basic}
              className="order-2 lg:flex-1 lg:order-1 rounded-3xl lg:rounded-r-none"
            />
            {/* Pro Plan */}
            <Card
              annually={annually}
              discount={discount}
              darkMode={darkMode}
              onSelect={onSelectPlan}
              {...plans.pro}
              {...planTheme.pro}
              isMain
              className="order-1 lg:flex-1 sm:col-span-2 lg:order-2 relative z-10 lg:flex lg:flex-col lg:gap-8 lg:pt-6"
              headingContainerClass="px-0 xl:px-20 sm:flex-row sm:justify-between sm:items-center lg:flex-col text-center sm:text-left lg:text-center"
              headingClass="flex flex-col justify-center items-center sm:items-start sm:w-[330px] lg:w-full lg:items-center"
              priceContainerClass="mt-3 flex sm:text-right lg:text-center flex-col justify-center items-center sm:items-end"
              featureListClass="md:grid sm:grid-cols-2 md:space-x-4 lg:flex"
            />
            {/* Enterprise Plan */}
            <Card
              annually={annually}
              discount={discount}
              darkMode={darkMode}
              onSelect={onSelectPlan}
              {...plans.enterprise}
              {...planTheme.enterprise}
              className="order-3 lg:flex-1 rounded-3xl lg:rounded-l-none"
            />
          </div>
          {/* Custom Plan */}
          <PlanCustom
            darkMode={darkMode}
            annually={annually}
            discount={discount}
            data={plans.custom}
            theme={planTheme.custom}
            onSelect={onSelectPlan}
          />
        </div>
      </motion.section>
    </div>
  );
};

export default PriceTable;
