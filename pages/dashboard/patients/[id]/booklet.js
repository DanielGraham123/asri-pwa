import DashboardLayout, { useHeaderContext } from "@/layouts/dashboardLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Chrono } from "react-chrono";

import patientHistory from "@/patient-history";
import { classNames, tailwindConfig } from "@/components/utils/Utils";

import { Tab } from "@headlessui/react";
import Image from "next/image";

import { CgProfile } from "react-icons/cg";
import Moment from "react-moment";

export default function Booklet() {
  const { title, setTitle } = useHeaderContext();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [illnesses, setIllnesses] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [generics] = useState([
    {
      title: "Profile",
    },
    {
      title: "Illnesses",
      cardTitle: "Diagnostics Info",
    },
    {
      title: "Treatments",
      cardTitle: "Disease Treatments",
    },
    {
      title: "Prescriptions",
      cardTitle: "Doctor Prescriptions",
    },
  ]);

  const patient = router.query;

  console.log("patient record: ", patient);
  console.log("record query: ", router.query);

  useEffect(() => {
    setTitle(patient.name);
    console.log("title: ", title);

    setIllnesses(patientHistory.illnesses);
    setPrescriptions(patientHistory.prescriptions);
    setTreatments(patientHistory.treatements);
  }, []);

  const tabs = [
    { name: "General", href: "#", current: false },
    { name: "Illnesses", href: "#", count: illnesses.length, current: false },
    {
      name: "Prescriptions",
      href: "#",
      count: prescriptions.length,
      current: false,
    },
    { name: "Treatments", href: "#", count: treatments.length, current: true },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Tab.Group
        as="div"
        className="border-b border-gray-200"
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <Tab.List className="-mb-px flex bg-indigo-100">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.name + "-" + index}
              className={({ selected }) =>
                classNames(
                  selected
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                )
              }
            >
              {tab.name}
              {tab.count ? (
                <span
                  className={classNames(
                    index === selectedIndex
                      ? "bg-indigo-400 text-white"
                      : "bg-gray-100 text-gray-900",
                    "hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                  )}
                >
                  {tab.count}
                </span>
              ) : null}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {/* Generic Panel */}
          <Tab.Panel>
            <Chrono
              className="overflow-auto"
              mode="VERTICAL"
              hideControls
              timelineCircleDimension={30}
              lineWidth={2}
              cardPositionHorizontal="BOTTOM"
              focusActiveItemOnLoad={false}
              scrollable
              items={generics}
              allowDynamicUpdate
              theme={{
                primary: tailwindConfig().theme.colors.indigo[400],
                secondary: tailwindConfig().theme.colors.indigo[700],
                cardBgColor: tailwindConfig().theme.colors.indigo[50],
                // cardForeColor: "violet",
                titleColor: "black",
                titleColorActive: "white",
              }}
              style={{ position: "absolute" }}
            >
              <div className="ext-left">
                <div className="flex items-center justify-start">
                  <Image
                    src={patientHistory.image}
                    width="50"
                    height="50"
                    className="rounded-full border-2 border-gray-500"
                  />
                  <div className="ml-3">
                    <p>{patient.name}</p>
                    <p>{patient.phone}</p>
                  </div>
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis, minus?
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis, minus?
              </div>

              <div className="chrono-icons">
                <CgProfile size={30} />
              </div>
            </Chrono>
          </Tab.Panel>

          {/* Illnesses Panel */}
          <Tab.Panel>
            <Chrono
              items={illnesses}
              mode="VERTICAL_ALTERNATING"
              slideShow
              lineWidth={2}
              focusActiveItemOnLoad={true}
              scrollable
              useReadMore
              allowDynamicUpdate
              theme={{
                primary: tailwindConfig().theme.colors.indigo[400],
                secondary: tailwindConfig().theme.colors.indigo[700],
              }}
            >
              {illnesses.map((illness) => (
                <div key={illness.id} className="tracking-wid">
                  <div className="pb-1">
                    <a className="hover:text-blue-800 text-xs hover:cursor-pointer">
                      {illness.doctor.name}
                    </a>
                    <p className="text-md font-semibold flex justify-between">
                      <span className="text-gray-600"> {illness.name}</span>
                      <span
                        className="badge-mute"
                        data-tooltip-target="tooltip-dark"
                      >
                        {illness.stage[0]}
                      </span>
                      <div
                        id="tooltip-dark"
                        role="tooltip"
                        className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                      >
                        Tooltip content
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </p>
                    <div className="flex gap-1 mt-1">
                      <span className="badge-indigo">
                        H: {illness?.bioData?.height}
                      </span>
                      <span className="badge-blue">
                        W: {illness?.bioData?.weight}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-500 py-2 line-clamp-3 hover:line-clamp-none hover:cursor-pointer transition-all duration-500  text-sm">
                    {illness.description}
                  </p>

                  <div className="text-sm mt-3 mb-2 text-gray-600">
                    <p>
                      <span className="font-semibold underline">From:</span>{" "}
                      {illness.startDate}
                    </p>
                    <p>
                      <span className="font-semibold underline">To:</span>{" "}
                      {illness.endDate}
                    </p>
                  </div>

                  <div className="mt-5">
                    <p className=" font-medium text-red-500 text-xs">
                      Self Medications
                    </p>
                    <ul className="flex justify-between mt-1">
                      {illness.medicationsTaken.map((med) => (
                        <li key={med.id} className="text-sm text-blue-800">
                          {med.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </Chrono>
          </Tab.Panel>

          {/* Prescriptions Panel */}
          <Tab.Panel>
            <Chrono
              className="overflow-auto"
              items={prescriptions}
              mode="VERTICAL_ALTERNATING"
              slideShow
              focusActiveItemOnLoad={true}
              scrollable
              useReadMore
              allowDynamicUpdate
              theme={{
                primary: tailwindConfig().theme.colors.indigo[400],
                secondary: tailwindConfig().theme.colors.indigo[700],
                // cardForeColor: "violet",
                titleColor: "black",
                titleColorActive: "white",
              }}
            >
              {prescriptions.map((presc) => (
                <div className="" key={presc.id}>
                  <div className="flex justify-between text-sm mt-3 mb-2 text-gray-600">
                    <p>
                      <span className="font-semibold underline">From:</span>{" "}
                      {presc.startDate}
                    </p>
                    <p>
                      <span className="font-semibold underline">To:</span>{" "}
                      {presc.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </Chrono>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div></div>
    </>
  );
}

Booklet.Layout = DashboardLayout;
