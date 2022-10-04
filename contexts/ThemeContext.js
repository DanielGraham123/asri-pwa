import React, { useState, useEffect, createContext } from "react";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("theme");

    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }

  return "light";
};

export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const themeSetter = (currentTheme) => {
    const rootElement = window.document.documentElement;
    const isDark = currentTheme === "dark";

    rootElement.classList.remove(isDark ? "light" : "dark");
    rootElement.classList.add(currentTheme);

    localStorage.setItem("theme", currentTheme);
  };

  if (initialTheme) {
    themeSetter(initialTheme);
  }

  useEffect(() => {
    themeSetter(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
