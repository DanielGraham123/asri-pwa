import React, { useEffect } from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

export default function DashboardCard06() {
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
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white border border-slate-300 rounded-md">
      {/* <header className="px-5 pt-3 border-b border-slate-100">
       
      </header> */}
      <h2 className="font-semibold text-slate-800 px-5 py-3">Diagnostics</h2>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={250} height={150} />
    </div>
  );
}
