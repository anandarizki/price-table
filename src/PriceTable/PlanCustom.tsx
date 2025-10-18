import { useState } from "react";
import type { FeatureId, Plan } from "./@type";
import Card, { PriceContainer } from "./Card";
import type { PlanTheme } from "./theme";
import { features } from "./data";
import { Check, Lock, PlusIcon } from "lucide-react";
import Button from "./Button";
import { motion } from "motion/react";

function PlanCustom({
  darkMode,
  annually,
  discount,
  data,
  theme,
  currency = "$",
  onSelect,
}: {
  darkMode: boolean;
  annually: boolean;
  discount: number;
  currency?: string;
  data: Plan;
  theme: PlanTheme;
  onSelect: (id: string) => void;
}) {
  const [disabled, setDisabled] = useState<FeatureId[]>(
    features.filter((f) => data.disableFeatures.includes(f.id)).map((p) => p.id)
  );

  const handleSelect = (id: FeatureId) => {
    setDisabled((prev) => {
      if (prev.includes(id)) {
        return prev.filter((fid) => fid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const requiredFeatures = features.filter(
    (f) => !data.disableFeatures.includes(f.id)
  );
  const optionalFeatures = features.filter((f) =>
    data.disableFeatures.includes(f.id)
  );

  const noSelected = disabled.length === optionalFeatures.length;

  return (
    <Card
      annually={annually}
      discount={discount}
      darkMode={darkMode}
      startFrom={noSelected}
      currency={currency}
      onSelect={onSelect}
      {...data}
      {...theme}
      disableFeatures={disabled}
      className="pb-6 md:py-6 md:pb-10 sm:pb-6 xl:pt-6 xl:pb-16"
      headingContainerClass="px-0 lg:px-10 xl:px-10 sm:flex-row sm:justify-between sm:items-center text-center sm:text-left"
      headingClass="flex flex-col justify-center items-center sm:items-start"
      priceContainerClass="mt-3 sm:text-right flex flex-col justify-center items-center sm:items-end"
      featureListClass="sm:grid md:space-x-4 sm:grid-cols-2 lg:flex"
    >
      <div className="mt-4 lg:mt-10 grid sm:gap-x-4 sm:grid-cols-2 lg:grid-cols-3 px-6 xl:pt-0 xl:p-20 xl:pb-0">
        {requiredFeatures.map((f) => (
          <div
            key={f.id}
            className={`border-t py-3 flex md:text-sm lg:text-base items-center gap-2 w-full ${
              darkMode ? "border-white/20" : "border-black/10"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{f.label}</span>
          </div>
        ))}
        {optionalFeatures.map((f) => {
          const isSelected = disabled.includes(f.id);
          return (
            <Button
              key={f.id}
              onClick={() => handleSelect(f.id)}
              animateScale={0.01}
              className={`rounded-lg border-2 mt-3 cursor-pointer group p-3 flex md:text-sm lg:text-base items-center gap-2 w-full ${
                !isSelected
                  ? "border-green-600"
                  : darkMode
                  ? "border-white/20 hover:bg-white/20"
                  : "border-black/10 hover:bg-black/5"
              }`}
            >
              {isSelected ? (
                <PlusIcon className="w-6 h-6" />
              ) : (
                <Check className="w-6 h-6 text-green-600" />
              )}
              <div className="flex flex-1 justify-between gap-5">
                <span>{f.label}</span>
                <div className="opacity-50 flex items-center">
                  <PriceContainer
                    price={f.price}
                    annually={annually}
                    annualDiscount={discount}
                    currency={currency}
                    className="text-sm"
                  />
                </div>
              </div>
            </Button>
          );
        })}
      </div>
      {!noSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 px-4 sm:px-6 mt-6 xl:px-20 lg:pt-0 flex flex-col sm:flex-row-reverse gap-2"
        >
          <Button
            onClick={() => onSelect(data.title)}
            className={`p-4 rounded-xl w-full sm:max-w-xs ${theme.color.bg} text-white`}
          >
            Subscribe {data.title} Plan
          </Button>
          <Button
            onClick={() => {
              setDisabled(optionalFeatures.map((f) => f.id));
            }}
            className={`p-4 rounded-xl w-full sm:max-w-xs text-white bg-gray-700`}
          >
            Reset
          </Button>
        </motion.div>
      )}
    </Card>
  );
}

export default PlanCustom;
