import React from "react";
import type { Plan } from "./@type";
import type { PlanTheme } from "./theme";
import { features } from "./data";
import { motion, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";
import Button from "./Button";

type CardProps = {
  className?: string;
  darkMode: boolean;
  annually: boolean;
  discount: number;
  children?: React.ReactNode;
  isMain?: boolean;
  startFrom?: boolean;
  currency?: string;
};

type CardClassProps = {
  headingContainerClass?: string;
  headingClass?: string;
  priceContainerClass?: string;
  featureListClass?: string;
};

const PriceContainer = ({
  annually,
  price,
  annualDiscount = 0,
  className = "",
  currency = "$",
}: {
  annually: boolean;
  price: number;
  annualDiscount?: number;
  className?: string;
  currency?: string;
}) => {
  const discountPrice = Math.floor(price - price * (annualDiscount / 100));
  return (
    <div className={`${className} relative`}>
      <AnimatePresence>
        {annually && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0 }}
            transition={{ ease: "linear" }}
            className="overflow-hidden"
          >
            {currency}
            {discountPrice}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!annually && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0 }}
            transition={{ ease: "linear" }}
            className="overflow-hidden"
          >
            {currency}
            {price}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Card = ({
  annually,
  className,
  darkMode,
  discount,
  children,
  isMain,
  startFrom,
  headingContainerClass = "px-10 md:px-20 text-center",
  headingClass = "flex flex-col justify-center items-center",
  priceContainerClass = "mt-3 text-center flex flex-col justify-center items-center",
  featureListClass,
  title,
  description,
  disableFeatures,
  basePrice,
  Icon,
  color,
  currency = "$",
}: CardProps & Plan & CardClassProps & PlanTheme) => {
  const totalPrice = features
    .filter((feature) => !disableFeatures.includes(feature.id))
    .reduce((acc, feature) => acc + feature.price, basePrice);
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={`rounded-3xl relative overflow-clip shadow-lg ${
        darkMode ? "bg-black" : "bg-white"
      } ${className} ${isMain ? "text-white" : ""}`}
    >
      {/* Backdrop background */}
      {!isMain && (
        <div
          className={`${
            color.bg
          } pointer-events-none opacity-30 bg-gradient-to-b from-transparent ${
            darkMode ? "via-black to-black" : "via-white to-white"
          } absolute inset-0`}
        />
      )}

      {/* Main Plan Highlight */}
      {isMain && (
        <div
          className={`${
            color.bg
          } absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent ${
            darkMode ? "to-black/20" : "to-white/20"
          }`}
        />
      )}

      {/* HEADING */}

      <div
        className={`relative z-10 flex flex-col items-center justify-center pt-6 px-6 lg:px-8 xl:pt-10 xl:px-20 ${headingContainerClass}`}
      >
        <div className={headingClass}>
          <div className={isMain ? "text-white" : color.text}>
            <Icon className="w-10 h-10" />
          </div>
          <h2
            className={`font-bold text-3xl ${
              isMain ? "text-white" : color.text
            }`}
          >
            {title}
          </h2>
          <p className="text-sm">{description}</p>
        </div>
        <div className={priceContainerClass}>
          {startFrom && <div className="text-sm opacity-60">Start from</div>}
          <div className="flex items-end">
            <PriceContainer
              annually={annually}
              price={totalPrice}
              annualDiscount={discount}
              className="font-bold text-5xl"
              currency={currency}
            />
            <motion.div
              className={`${
                darkMode || isMain ? "opacity-80" : "opacity-60"
              } font-bold text-lg`}
            >
              /month
            </motion.div>
          </div>
          {!startFrom && (
            <div
              className={`w-full flex text-sm ${
                darkMode || isMain ? "opacity-80" : "opacity-60"
              }`}
            >
              <div className="w-full">
                {annually
                  ? `Billed annually ${currency}${totalPrice * 12}/year`
                  : `Billed monthly`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FEATURES LIST */}
      {children || (
        <>
          <div
            className={`flex relative z-10 flex-col sm:grid sm:gap-x-4 md:flex p-6 lg:px-10 ${featureListClass}`}
          >
            {features.map((feature) => {
              const disabled = disableFeatures.includes(feature.id);
              return (
                <div
                  key={feature.id}
                  className={`border-t py-2 flex md:text-sm lg:text-base items-center gap-2 w-full ${
                    darkMode || isMain ? "border-white/20" : "border-black/5"
                  }`}
                >
                  {disabled ? (
                    <X className={`w-6 h-6`} />
                  ) : (
                    <Check
                      className={`w-6 h-6 ${
                        isMain ? "text-green-300" : "text-green-600"
                      }`}
                    />
                  )}
                  <span className={disabled ? "opacity-60" : ""}>
                    {feature.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="p-4 relative z-10">
            <Button
              onClick={() => alert(`Subscribed to ${title} plan`)}
              className={`w-full flex items-center justify-center p-4 rounded-xl ${
                isMain ? "bg-black" : color.bg
              } text-white`}
            >
              Subscribe {title} Plan
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Card;
