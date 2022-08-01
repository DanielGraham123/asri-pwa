import React, { useEffect } from "react";
import {
  DashboardCard01,
  DashboardCard02,
  DashboardCard03,
  DashboardCard06,
  DashboardCard10,
  Datepicker,
  FilterButton,
  WelcomeBanner,
} from "../../components";
import DashboardLayout, {
  useHeaderContext,
} from "../../layouts/dashboardLayout";
import Head from "next/head";

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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* Welcome banner */}
      <WelcomeBanner />
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Add view button */}
        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          <svg
            className="w-4 h-4 fill-current opacity-50 shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden xs:block ml-2">Add New Patient</span>
        </button>{" "}
        {/* should redirect to the patient record system*/}
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          <FilterButton />
          {/* Datepicker built with flatpickr */}
          <Datepicker />
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Line chart (Consultations) */}
        <DashboardCard01 />
        {/* Line chart (Appointments) */}
        <DashboardCard02 />
        {/* Line chart (Patients) */}
        <DashboardCard03 />

        {/* Doughnut chart (Treatments) */}
        <DashboardCard06 />
        {/* Card (Recent Patients) */}
        <DashboardCard10 />

        {/* Card (Reasons for Refunds) */}
        {/* <DashboardCard11 /> */}
        {/* Card (Recent Activity) */}
        {/* <DashboardCard12 /> */}
        {/* Card (Income/Expenses) */}
        {/* <DashboardCard13 /> */}
      </div>
    </>
  );
}

Index.Layout = DashboardLayout;
