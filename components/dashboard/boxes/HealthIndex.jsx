import React, { useEffect } from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// import ApexCharts from "apexcharts";

import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import moment from "moment";
// Import utilities
import { tailwindConfig } from "../../utils/Utils";
import { parse } from "postcss";

const MONTHS = () => {
  const months = [];
  const dateStart = moment();
  const dateEnd = moment().add(12, "month");
  while (dateEnd.diff(dateStart, "months") > 0) {
    months.push(dateStart.format("M"));
    dateStart.add(1, "month");
  }
  months.sort((a, b) => parseInt(a) - parseInt(b));
  let monthStrs = [];
  months.forEach((month) => monthStrs.push(moment(month).format("MMM")));
  return monthStrs;
};
console.log("months: ", MONTHS());

const data = [
  { name: "Cardiology", value: 30, text: "30%" },
  { name: "Surgery", value: 21, text: "21%" },
  { name: "Malaria", value: 10, text: "10%" },
  { name: "Others", value: 5, text: "5%" },
];

export default function HealthIndex() {
  const palettes = [
    tailwindConfig().theme.colors.red[600],
    tailwindConfig().theme.colors.blue[700],
    tailwindConfig().theme.colors.yellow[400],
    tailwindConfig().theme.colors.indigo[600],
  ];
  const chartData = {
    series: [
      {
        name: "Index",
        type: "bar",
        data: [43, 21, 41, 56, 27, 43],
      },
      {
        name: "TEAM B",
        type: "area",
        data: [43, 21, 41, 56, 27, 43],
      },
    ],
    options: {
      chart: {
        // height: 250,
        type: "area",
        stacked: false,
        toolbar: { show: false },
        background: "#17165e",
        foreColor: "#fff",
      },
      grid: { show: false },
      stroke: {
        width: [0, 3, 8],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "15%",
          borderRadius: 5,
        },
      },
      colors: ["#5279F6", "#0C0A85"],
      fill: {
        opacity: [0.85, 0.25, 0.85],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "horizontal",
          opacityFrom: 0.85,
          opacityTo: 1,
          stops: [0, 100, 100, 80],
        },
      },
      labels: [...MONTHS()].slice(6),
      legend: {
        show: false,
      },
      theme: {
        mode: "light",
        palette: "palette3",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      dataLabels: {
        enabled: false,
        show: false,
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

      xaxis: {
        type: "categories",
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        shared: false,
        intersect: true,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          },
        },
      },
    },
  };

  return (
    <div className="bg-blend-">
      <div className="flex flex-col bg-[#17165e] h-full w-full border-slate-300 rounded-lg shadow-md relative">
        <h2 className="font-semibold  text-white px-5 pt-3 pb-2">
          Health Index
        </h2>

        <div className="relative left-5 z-10">
          <div className="bg-red- absolute">
            <div className=" text-white font-semibold text-3xl">
              75%
              <div className=" text-gray-400 text-xs">Patients Health Rate</div>
            </div>
          </div>
        </div>

        {/* <div className="m0 mr2 "> */}
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type="area"
          className="mx-3 aboslute"
          height={230}
        />
        {/* </div> */}
      </div>
    </div>
  );
}
