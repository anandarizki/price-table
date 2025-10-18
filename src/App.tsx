import { useEffect, useState } from "react";
import PriceTable from "./PriceTable";
import { ANNUAL_DISCOUNT, plans } from "./PriceTable/data";
import { Moon, Sun } from "lucide-react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(
      window &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  const handleSelectPlan = (id: string) => {
    alert(`Mock Event:Subscribed to ${id} plan`);
  };
  return (
    <>
      <PriceTable
        plans={plans}
        annualDiscount={ANNUAL_DISCOUNT}
        darkMode={darkMode}
        onSelectPlan={handleSelectPlan}
      />
      <button
        className={`fixed right-0 top-1/2 -translate-y-1/2 p-3 rounded-l-full z-50 cursor-pointer ${
          darkMode ? "text-black bg-gray-200 " : "text-white bg-gray-800 "
        }`}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <Sun /> : <Moon />}
      </button>
    </>
  );
}

export default App;
