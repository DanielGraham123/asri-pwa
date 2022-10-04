import React, { useContext } from "react";
import { HiSun, HiMoon } from "react-icons/hi";
import { ThemeContext } from "@/contexts/ThemeContext";
import Switch from "../Switch";

export default function ThemeToggler() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <div className="flex items-center">
        {theme === "dark" ? (
          <HiMoon className="mr-2 text-gray-500" size={20} />
        ) : (
          <HiSun className="mr-2 text-gray-500" size={20} />
        )}

        <Switch>
          {theme === "dark" ? "Apply Dark Mode" : "Apply Light Mode"}
        </Switch>
      </div>
    </>
  );
}
