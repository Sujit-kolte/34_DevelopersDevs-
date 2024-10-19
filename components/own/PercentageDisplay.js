// components/PercentageDisplay.js
"use client";

import { useEffect, useState } from "react";

const PercentageDisplay = ({ targetPercentage }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPercentage < targetPercentage) {
        setCurrentPercentage((prev) => Math.min(prev + 1, targetPercentage)); // Ensure it doesn't exceed target
      } else {
        clearInterval(interval);
      }
    }, 20); // Adjust this for speed

    return () => clearInterval(interval);
  }, [currentPercentage, targetPercentage]);

  const radius = 45; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (currentPercentage / 100) * circumference; // Calculate the offset based on percentage

  return (
    <div className="relative flex items-center justify-center h-full">
      <svg className="aspect-square h-28" width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="lightgray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="blue"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-200 ease-in-out"
        />
      </svg>
      <span className="absolute text-blue-600 text-3xl font-bold">
        {currentPercentage}%
      </span>
    </div>
  );
};

export default PercentageDisplay;
