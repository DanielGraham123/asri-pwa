import React, { useEffect } from "react";

import DashboardLayout, { useHeaderContext } from "@/layouts/dashboardLayout";
import Head from "next/head";
import {
  Diagnostics,
  PatientOverview,
  HealthIndex,
  AllAppointments,
  HeatMap,
  Datepicker,
  FilterButton,
  GreetingsArea,
  WelcomeBanner,
} from "@/components/index";
export default function Index() {
  const { title, setTitle } = useHeaderContext();

  useEffect(() => {
    setTitle("Dashboard");
    console.log("title: ", title);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* Welcome banner */}
      <GreetingsArea />
      {/* Dashboard actions */}
      <div className="mt-3 grid grid-cols-12 gap-2 sm:justify-between sm:items-start mb-8">
        {/* statistics boxes */}
        <div className="col-span-9">
          <div className="grid grid-cols-3 gap-2">
            {/* Diagnostics */}
            <Diagnostics />
            {/* Patients */}
            <PatientOverview />
            {/* Health Index */}
            <HealthIndex />
            {/* pandemic area */}
            <div className="col-span-3">
              <HeatMap />
            </div>
            {/* growth */}
            <div className=""></div>
            {/* Patients table */}
            {/* <div className="col-span-2"></div> */}
          </div>
        </div>

        {/* side section */}
        <div className="col-span-3">
          <AllAppointments />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6"></div>
    </>
  );
}

Index.Layout = DashboardLayout;
