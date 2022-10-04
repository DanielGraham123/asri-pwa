import Image from "next/image";
import React from "react";
import ThemeToggler from "../utils/ThemeToggler";

const WelcomeBanner = () => {
  const date = new Date();

  const hour = date.getHours();

  return (
    <div className="flex items-center justify-between">
      <div className="">
        <h1 className="text-sm text-indigo-700 font-bold mb-">
          {hour >= 12
            ? hour >= 17
              ? "Good Evening"
              : "Good Afternoon"
            : "Good Morning"}
          , Doctor.
        </h1>
        <p className="text-sm">How are you doing today?</p>
      </div>

      <div>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default WelcomeBanner;
