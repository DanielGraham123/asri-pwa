import React, { useEffect } from "react";

import DashboardLayout, { useHeaderContext } from "@/layouts/dashboardLayout";
import Head from "next/head";

import { FcAbout, FcBusinessman, FcCamera, FcFullTrash } from "react-icons/fc";

import {
  Diagnostics,
  PatientOverview,
  HealthIndex,
  AllAppointments,
  PandemicMap,
  Datepicker,
  FilterButton,
  GreetingsArea,
  PatientsTable,
  TelegramFAB,
} from "@/components/index";
export default function Index() {
  const { title, setTitle } = useHeaderContext();

  useEffect(() => {
    setTitle("Dashboard");
    console.log("title: ", title);
  }, []);

  const actions = [
    { label: "About", icon: <FcAbout />, onClick: console.log },
    { label: "Profile", icon: <FcBusinessman />, onClick: console.log },
    { label: "Picture", icon: <FcCamera />, onClick: console.log },
    { label: "Trash", icon: <FcFullTrash />, onClick: console.log },
  ];

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
              <PandemicMap />
            </div>
            {/* Patients table */}
            <div className="col-span-3">
              <PatientsTable />
            </div>
          </div>
        </div>

        {/* side section */}
        <div className="col-span-3">
          <AllAppointments />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6"></div>

      {/* Telegram FAB */}
      <TelegramFAB actions={actions}/>
    </>
  );
}

Index.Layout = DashboardLayout;
