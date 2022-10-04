import React from "react";

function LoadingSpinner() {
  return (
    <div>
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-7 h-7 border-4 border-indigo-400 border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
}

export default LoadingSpinner;
