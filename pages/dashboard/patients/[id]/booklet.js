import DashboardLayout, { useHeaderContext } from "@/layouts/dashboardLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Chrono } from "react-chrono";

import patientHistory from "@/patient-history";
import { tailwindConfig } from "@/components/utils/Utils";

import { Tab } from "@headlessui/react";

const tabs = [
  { name: "General", href: "#", count: "52", current: false },
  { name: "Illnesses", href: "#", count: "6", current: false },
  { name: "Medications", href: "#", count: "6", current: false },
  { name: "Current Medications", href: "#", count: "4", current: true },
  { name: "Treatments", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Booklet() {
  const { title, setTitle } = useHeaderContext();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const patient = router.query;

  console.log("patient record: ", patient);
  console.log("record query: ", router.query);

  useEffect(() => {
    setTitle(patient.name);
    console.log("title: ", title);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
          <Tab.Panel>
            <Chrono
              className="overflow-auto"
              items={patientHistory}
              mode="VERTICAL_ALTERNATING"
              slideShow
              focusActiveItemOnLoad={true}
              scrollable
              theme={{
                primary: tailwindConfig().theme.colors.indigo[400],
                secondary: tailwindConfig().theme.colors.indigo[700],
                // cardBgColor: "yellow",
                // cardForeColor: "violet",
                // titleColor: "black",
                // titleColorActive: "red",
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Chrono
              className="overflow-auto"
              items={patientHistory}
              mode="VERTICAL_ALTERNATING"
              slideShow
              focusActiveItemOnLoad={true}
              scrollable
              theme={{
                primary: tailwindConfig().theme.colors.indigo[400],
                secondary: tailwindConfig().theme.colors.indigo[700],
                // cardBgColor: "yellow",
                // cardForeColor: "violet",
                // titleColor: "black",
                // titleColorActive: "red",
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Chrono
              className="overflow-auto"
              items={patientHistory}
              mode="VERTICAL_ALTERNATING"
              slideShow
              focusActiveItemOnLoad={true}
              scrollable
              theme={{
                primary: tailwindConfig().theme.colors.indigo[400],
                secondary: tailwindConfig().theme.colors.indigo[700],
                // cardBgColor: "yellow",
                // cardForeColor: "violet",
                // titleColor: "black",
                // titleColorActive: "red",
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Chrono
              className="overflow-auto"
              items={patientHistory}
              mode="VERTICAL_ALTERNATING"
              slideShow
              focusActiveItemOnLoad={true}
              scrollable
              theme={{
                primary: tailwindConfig().theme.colors.indigo[400],
                secondary: tailwindConfig().theme.colors.indigo[700],
                // cardBgColor: "yellow",
                // cardForeColor: "violet",
                // titleColor: "black",
                // titleColorActive: "red",
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Chrono
              className="overflow-auto"
              items={patientHistory}
              mode="VERTICAL_ALTERNATING"
              slideShow
              focusActiveItemOnLoad={true}
              scrollable
              theme={{
                primary: tailwindConfig().theme.colors.indigo[400],
                secondary: tailwindConfig().theme.colors.indigo[700],
                // cardBgColor: "yellow",
                // cardForeColor: "violet",
                // titleColor: "black",
                // titleColorActive: "red",
              }}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div></div>
    </>
  );
}

Booklet.Layout = DashboardLayout;
