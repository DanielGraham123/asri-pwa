import React, { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function Switch({ children }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <label
      htmlFor="default-toggle"
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        value=""
        id="default-toggle"
        className="sr-only peer"
        onChange={() => toggleTheme()}
        checked={theme === "light"}
      />
      <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 dark:peer-focus:ring-0 rounded-full peer dark:bg-[#E2E2F2] peer-checked:after:translate-x-full peer-checked:after:border-indigo-400 after:content-[''] after:absolute after:top-[3px] after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900">{children}</span>
    </label>
  );
}
