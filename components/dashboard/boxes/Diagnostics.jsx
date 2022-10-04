import React, { useEffect } from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

const data = [
  { name: "Cardiology", value: 30, text: "30%" },
  { name: "Surgery", value: 21, text: "21%" },
  { name: "Malaria", value: 10, text: "10%" },
  { name: "Others", value: 5, text: "5%" },
];

export default function Diagnostics() {
  const chartData = {
    labels: ["Cardiology", "Surgery", "Malaria", "Others"],
    datasets: [
      {
        label: "Diagnostics",
        data: [30, 21, 10, 5],
        backgroundColor: [
          tailwindConfig().theme.colors.red[600],
          tailwindConfig().theme.colors.blue[700],
          tailwindConfig().theme.colors.yellow[400],
          tailwindConfig().theme.colors.indigo[600],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.red[700],
          tailwindConfig().theme.colors.blue[800],
          tailwindConfig().theme.colors.yellow[500],
          tailwindConfig().theme.colors.indigo[700],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col bg-white w-full border-slate-300 rounded-lg shadow-md">
      {/* <header className="px-5 pt-3 border-b border-slate-100">
       
      </header> */}
      <h2 className="font-semibold text-slate-800 px-5 pt-3">Diagnostics</h2>
      {/* Chart built with Chart.js 3 */}
      <div className="pt-2">
        <DoughnutChart data={chartData} width={200} height={120} />
      </div>
    </div>
  );
}
