import React, { useEffect } from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// import ApexCharts from "apexcharts";
// import ApexCharts from "react-apexcharts";

import dynamic from "next/dynamic";
import { HiDotsHorizontal } from "react-icons/hi";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

// Import utilities
import { tailwindConfig } from "../../utils/Utils";
import moment from "moment";
import Moment from "react-moment";

import Image01 from "@/assets/user-36-05.jpg";
import Image02 from "@/assets/user-36-06.jpg";
import Image03 from "@/assets/user-36-07.jpg";
import Image04 from "@/assets/user-36-08.jpg";
import Image05 from "@/assets/user-36-09.jpg";
import Image from "next/image";
import { Fragment } from "react";

import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const data = [
  { name: "Cardiology", value: 30, text: "30%" },
  { name: "Surgery", value: 21, text: "21%" },
  { name: "Malaria", value: 10, text: "10%" },
  { name: "Others", value: 5, text: "5%" },
];

export default function AllAppointments() {
  const APPTCOLOR = {
    EXAMIN: "examin",
    CONSULT: "consult",
    CHECKUP: "checkup",
    VISIT: "visit",
    EMMERG: "emmerg",
  };

  const palettes = [
    tailwindConfig().theme.colors.red[600],
    tailwindConfig().theme.colors.blue[700],
    tailwindConfig().theme.colors.yellow[400],
    tailwindConfig().theme.colors.indigo[600],
  ];
  const chartData = {
    series: [
      {
        name: "EMERGENCY",
        data: [23, 23, 20, 8, 13, 27],
      },
      {
        name: "EXAMINATION",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "CONSULTATION",
        data: [14, 25, 41, 47, 12, 43],
      },
      {
        name: "ROUTINE CHECKUP",
        data: [21, 7, 25, 13, 22, 26],
      },
      {
        name: "SICK VISIT",
        data: [28, 71, 10, 23, 12, 16],
      },
    ],
    options: {
      chart: {
        height: "300px",
        // width: "200px",
        type: "bar",
        stacked: true,
        toolbar: { show: false },
      },
      grid: { show: false },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "25%",
          borderRadius: 5,
          barHeight: "100%",
        },
      },
      fill: {
        colors: ["#2798F7", "#763CEF", "#FECA57", "#F80D38", "#039E72"],
      },
      dataLabels: {
        enabled: false,
        show: false,
      },
      xaxis: {
        type: "datetime",
        categories: [
          moment("2021/02/01", "YYYY/MM/DD").format("MM"),
          moment("2021/01/03", "YYYY/MM/DD").format("MM"),
          moment("2021/03/12", "YYYY/MM/DD").format("MM"),
          moment("2021/04/30", "YYYY/MM/DD").format("MM"),
          moment("2021/05/15", "YYYY/MM/DD").format("MM"),
          moment("2021/06/05", "YYYY/MM/DD").format("MM"),
        ],
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      legend: {
        show: true,
        position: "bottom",
        fontSize: "8px",
        horizontalAlign: "left",
        markers: {
          width: 6,
          height: 6,
        },
      },
    },
  };

  const upcoming = [
    {
      name: "Ibrahim Yekeni",
      type: "emergency",
      date: "2022/01/10",
      color: APPTCOLOR.EMMERG,
      avatar: Image01,
    },
    {
      name: "Sidonie Ariane",
      type: "examination",
      date: "2022/11/15",
      color: APPTCOLOR.EXAMIN,
      avatar: Image02,
    },
    {
      name: "Melanie A.",
      type: "consultation",
      date: "2022/03/10",
      color: APPTCOLOR.CONSULT,
      avatar: Image03,
    },
    {
      name: "John Doe",
      type: "checkup",
      date: "2022/10/30",
      color: APPTCOLOR.CHECKUP,
      avatar: Image04,
    },
    {
      name: "Jean Christoph",
      type: "emergency",
      date: "2022/11/21",
      color: APPTCOLOR.EMMERG,
      avatar: Image05,
    },
    {
      name: "Jane Doe",
      type: "visit",
      date: "2022/10/24",
      color: APPTCOLOR.VISIT,
      avatar: Image04,
    },
  ];

  const tabs = ["Day", "Week", "Month"];

  return (
    <div className="grid grid-cols-1 divide-y-2 bg-white w-full border-slate-300 rounded-lg shadow-md">
      <div className="">
        <h2 className="font-bold text-slate-800 text-xs uppercase px-5 pt-3">
          Overall Appointments
        </h2>

        <div className="mr-4">
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            legend={chartData.legend}
            type="bar"
            height={265}
          />
        </div>
      </div>

      <div className="p-3">
        <div className="pb-2">
          <h2 className="font-bold text-slate-800 text-xs uppercase">
            Upcomming Appointments
          </h2>
        </div>

        <ul className="h-[300px] pr-3 my-2 -mr-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300">
          {upcoming.map((appt, index) => (
            <li className={index !== upcoming.length - 1 && "mb-2"}>
              <div className="rounded-lg shadow-sm border border-gray-300 py-3 px-2 relative ">
                <div className="right-2 absolute">
                  <HiDotsHorizontal className="cursor-pointer text-gray-400" />
                </div>
                <div
                  className="flex justify-between items-end"
                  title={appt.name}
                >
                  {/* name and type */}
                  <div className="flex justify-left">
                    <div className="mr-2">
                      <Image
                        className=" p-5 rounded-full "
                        src={appt.avatar}
                        width="40"
                        height="40"
                        alt={appt.name}
                      />
                    </div>
                    <div>
                      <h2 className="text-md line-clamp-1">{appt.name}</h2>
                      <p
                        className={`text-[0.70rem] font-bold uppercase text-${appt.color}`}
                      >
                        {appt.type}
                      </p>
                    </div>
                  </div>
                  {/* Date */}
                  <div className="mt-">
                    <Moment format="ll" className="text-[0.65rem]">
                      {appt.date}
                    </Moment>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3">
        <h2 className="font-bold text-slate-800 text-xs uppercase">
          Previous Appointments
        </h2>

        <Tab.Group as="div" className="my-3 border-gray-200">
          <Tab.List className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200">
            {tabs.map((tab, index) => (
              <Tab key={tab + "-" + index} as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <button
                    className={classNames(
                      selected
                        ? "bg-indigo-500 text-white "
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                      "group relative min-w-0 flex-1 overflow-hidden bg-white py-2 border border-gray-200 px-4 text-sm font-medium text-center focus:z-10 outline-none uppercase"
                    )}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {[...Array(3)].map((index) => (
              <Tab.Panel key={"tappanel-" + index}>
                <ul className=" pr- my-2">
                  {upcoming
                    .slice(0, Math.floor(Math.random() * 4 + 1))
                    .map((appt, index) => (
                      <li className={index !== upcoming.length - 1 && "mb-2"}>
                        <div className="rounded-lg shadow-sm border border-gray-300 py-3 px-2 relative ">
                          <div className="right-2 absolute">
                            <HiDotsHorizontal className="cursor-pointer text-gray-400" />
                          </div>
                          <div
                            className="flex justify-between items-end"
                            title={appt.name}
                          >
                            {/* name and type */}
                            <div className="flex justify-left">
                              <div className="mr-2">
                                <Image
                                  className=" p-5 rounded-full "
                                  src={appt.avatar}
                                  width="40"
                                  height="40"
                                  alt={appt.name}
                                />
                              </div>
                              <div>
                                <h2 className="text-md line-clamp-1">
                                  {appt.name}
                                </h2>
                                <p
                                  className={`text-[0.70rem] font-bold uppercase text-${appt.color}`}
                                >
                                  {appt.type}
                                </p>
                              </div>
                            </div>
                            {/* Date */}
                            <div className="mt-">
                              <Moment format="ll" className="text-[0.65rem]">
                                {appt.date}
                              </Moment>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
