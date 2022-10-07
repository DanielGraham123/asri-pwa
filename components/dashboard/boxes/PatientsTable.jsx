import React, { useEffect } from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// import ApexCharts from "apexcharts";
// import ApexCharts from "react-apexcharts";

import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

const data = [
  { name: "Cardiology", value: 30, text: "30%" },
  { name: "Surgery", value: 21, text: "21%" },
  { name: "Malaria", value: 10, text: "10%" },
  { name: "Others", value: 5, text: "5%" },
];

export default function PatientsTable() {
  const palettes = [
    tailwindConfig().theme.colors.red[600],
    tailwindConfig().theme.colors.blue[700],
    tailwindConfig().theme.colors.yellow[400],
    tailwindConfig().theme.colors.indigo[600],
  ];
  const chartData = {
    series: [44, 55, 67],
    options: {
      chart: {
        height: "200px",
        width: "200px",
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 100,
            size: "45%",
            dropShadow: {
              enabled: false,
              top: 15,
              left: 15,
              blur: 15,
              opacity: 0.5,
            },
          },

          dataLabels: {
            name: {
              fontSize: "10px",
              fontFamily: "Arial",
              fontWeight: 200,
              color: tailwindConfig().theme.colors.indigo[700],
              offsetY: 20,
              formatter: function (val) {
                return (val + "").toUpperCase();
              },
            },
            value: {
              fontSize: "23px",
              fontFamily: "Arial",
              fontWeight: 700,
              color: tailwindConfig().theme.colors.indigo[700],
              offsetY: -22,
              formatter: function (val) {
                return (val + "").toUpperCase();
              },
            },
            total: {
              show: true,
              label: "Patients",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
      labels: ["Men", "Women", "Children"],
      legend: {
        show: true,
        position: "bottom",
      },
    },
  };

  return (
    <div className="flex flex-col bg-white w-full border-slate-300 rounded-lg shadow-md pb-4">
      <h2 className="font-semibold text-slate-800 px-5 pt-3">Patients</h2>

      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        legend={chartData.legend}
        type="radialBar"
        height={250}
      />
    </div>
  );
}
