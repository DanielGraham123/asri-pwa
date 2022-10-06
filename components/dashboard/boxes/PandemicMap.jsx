import React, { useEffect, useState } from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// import ApexCharts from "apexcharts";
// import ApexCharts from "react-apexcharts";

import dynamic from "next/dynamic";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { cameroon } from "@/camr";
import { gabon } from "@/gabon";
import { nigeria } from "@/nigeria";
import { rdc } from "@/rdc";

import {
  MapsComponent,
  LayersDirective,
  LayerDirective,
  MapsTooltip,
  MarkersDirective,
  MarkerDirective,
  Marker,
  Legend,
  Inject,
} from "@syncfusion/ej2-react-maps";

import { world_map } from "@/world_map";
import { covid_data } from "@/covid";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

const data = [
  { name: "Cardiology", value: 30, text: "30%" },
  { name: "Surgery", value: 21, text: "21%" },
  { name: "Malaria", value: 10, text: "10%" },
  { name: "Others", value: 5, text: "5%" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PatientOverview() {
  const palettes = [
    tailwindConfig().theme.colors.red[600],
    tailwindConfig().theme.colors.blue[700],
    tailwindConfig().theme.colors.yellow[400],
    tailwindConfig().theme.colors.indigo[600],
  ];

  console.log("world_map: ", world_map);

  const tabs = ["All", "Cameroon", "Nigeria", "RDC", "Gabon"];

  const [covidWorld, setCovidWorld] = useState([]);
  const [affectedZones, setAffectedZones] = useState([]);
  const [recoveredZones, setRecoveredZones] = useState([]);
  const [dangerZones, setDangerZones] = useState([]);
  const [safeZones, setSafeZones] = useState([]);
  const [neutralZones, setNeutralZones] = useState([]);

  let affected;
  let recovered;
  let dangered;
  let safe;
  let neutral;

  useState(() => {
    covid_data?.features.forEach((feature) => {
      setCovidWorld((data) => [...data, feature.properties]);
    });

    affected = covid_data?.features?.filter(
      (area) => area.properties.confirmed > 300
    );

    recovered = covid_data?.features?.filter(
      (area) => area.properties.recovered > 300
    );

    dangered = covid_data?.features?.filter(
      (area) => area.properties.deaths > 1000
    );

    safe = covid_data?.features?.filter(
      (area) =>
        area.properties.confirmed > 30 && area.properties.confirmed < 100
    );

    neutral = covid_data?.features?.filter(
      (area) =>
        parseInt(area.properties.confirmed) === 0 &&
        parseInt(area.properties.deaths) === 0 &&
        parseInt(area.properties.active) === 0
    );

    affected?.forEach((zone) => {
      setAffectedZones((zones) => [...zones, zone.properties]);
    });

    recovered?.forEach((zone) => {
      setRecoveredZones((zones) => [...zones, zone.properties]);
    });

    dangered?.forEach((zone) => {
      setDangerZones((zones) => [...zones, zone.properties]);
    });

    safe?.forEach((zone) => {
      setSafeZones((zones) => [...zones, zone.properties]);
    });

    neutral?.forEach((zone) => {
      setNeutralZones((zones) => [...zones, zone.properties]);
    });
  }, []);

  console.log("affected: ", neutralZones);

  console.log("covid features: ", covidWorld);

  return (
    <div className="grid grid-cols-3 divide-x-2 gap- bg-white  border-slate-200 rounded-lg shadow-md">
      <div className="flex flex-col  col-span-2 w-full  pb-1">
        <h2 className="font-semibold text-slate-800 px-5 pt-3">
          COVID-19 Pandemic
        </h2>

        <Tab.Group>
          <Tab.Panels>
            {/* all */}
            <Tab.Panel>
              <MapsComponent>
                <Inject services={[MapsTooltip, Marker]} />
                <LayersDirective>
                  <LayerDirective
                    shapeData={world_map}
                    shapeDataPath="name"
                    shapeSettings={{
                      fill: "#C8D7EC",
                    }}
                  >
                    <MarkersDirective>
                      <MarkerDirective
                        visible={true}
                        height={20}
                        animationDuration={0}
                        shape="Circle"
                        opacity={0.6}
                        width={5}
                        fill="#DB6784"
                        dataSource={affectedZones}
                        tooltipSettings={{
                          visible: true,
                          valuePath: "name",
                          fill: "#B06A9C",
                        }}
                      ></MarkerDirective>
                      <MarkerDirective
                        visible={true}
                        height={20}
                        animationDuration={0}
                        shape="Circle"
                        opacity={0.6}
                        width={5}
                        fill="#403DC1"
                        dataSource={recoveredZones}
                        tooltipSettings={{
                          visible: true,
                          valuePath: "name",
                          fill: "#403dc1",
                        }}
                      ></MarkerDirective>
                      <MarkerDirective
                        visible={true}
                        height={20}
                        animationDuration={0}
                        shape="Circle"
                        opacity={0.8}
                        width={5}
                        fill="#F93E5F"
                        dataSource={dangerZones}
                        tooltipSettings={{
                          visible: true,
                          valuePath: "deaths",
                          fill: "#F93E5F",
                          format: "${deaths} deaths",
                        }}
                      ></MarkerDirective>
                      <MarkerDirective
                        visible={true}
                        height={20}
                        animationDuration={0}
                        shape="Circle"
                        opacity={0.8}
                        width={5}
                        fill="#02B352"
                        dataSource={safeZones}
                        tooltipSettings={{
                          visible: true,
                          valuePath: "confirmed",
                          fill: "#02B352",
                          format: "${name}: ${confirmed} cases",
                        }}
                      ></MarkerDirective>
                      <MarkerDirective
                        visible={true}
                        height={20}
                        animationDuration={0}
                        shape="Circle"
                        opacity={0.8}
                        width={5}
                        fill="#FECC54"
                        dataSource={neutralZones}
                        tooltipSettings={{
                          visible: true,
                          valuePath: "name",
                          fill: "#FECC54",
                        }}
                      ></MarkerDirective>
                    </MarkersDirective>
                  </LayerDirective>
                </LayersDirective>
              </MapsComponent>
            </Tab.Panel>
            {/* cameroon */}
            <Tab.Panel>
              <MapsComponent>
                <Inject services={[MapsTooltip, Marker]} />
                <LayersDirective>
                  <LayerDirective
                    shapeData={cameroon}
                    tooltipSettings={{
                      visible: true,
                      valuePath: "name",
                    }}
                    shapeSettings={{
                      fill: "#C8D7EC",
                    }}
                  >
                    <MarkersDirective>
                      <MarkerDirective
                        visible={true}
                        height={20}
                        animationDuration={0}
                        shape="Circle"
                        opacity={0.6}
                        width={5}
                        colorValuePath={"color"}
                        dataSource={[
                          {
                            latitude: 4.0511,
                            longitude: 9.7679,
                            city: "Littoral",
                            color: "red",
                          },
                          {
                            latitude: 4.156,
                            longitude: 9.2632,
                            city: "South-west",
                            color: "yellow",
                          },
                          {
                            latitude: 3.848,
                            longitude: 11.5021,
                            city: "Centre",
                            color: "green",
                          },
                          {
                            latitude: 10.6316,
                            longitude: 14.6588,
                            name: "Far North",
                            color: "pink",
                          },
                        ]}
                      ></MarkerDirective>
                    </MarkersDirective>
                  </LayerDirective>
                </LayersDirective>
              </MapsComponent>
            </Tab.Panel>
            {/* nigeria */}
            <Tab.Panel>
              <MapsComponent>
                <Inject services={[MapsTooltip, Marker]} />
                <LayersDirective>
                  <LayerDirective
                    shapeData={nigeria}
                    shapeSettings={{
                      fill: "#C8D7EC",
                    }}
                  >
                    <MarkersDirective>
                      <MarkerDirective
                        tooltipSettings={{
                          visible: true,
                          valuePath: "city",
                        }}
                        visible={true}
                        height={20}
                        animationDuration={0}
                        shape="Circle"
                        opacity={0.6}
                        width={5}
                        colorValuePath={"color"}
                        dataSource={[
                          {
                            latitude: 4.0511,
                            longitude: 9.7679,
                            city: "Littoral",
                            color: "red",
                          },
                          {
                            latitude: 4.156,
                            longitude: 9.2632,
                            city: "South-west",
                            color: "yellow",
                          },
                          {
                            latitude: 3.848,
                            longitude: 11.5021,
                            city: "Centre",
                            color: "green",
                          },
                          {
                            latitude: 10.6316,
                            longitude: 14.6588,
                            name: "Far North",
                            color: "pink",
                          },
                        ]}
                      ></MarkerDirective>
                    </MarkersDirective>
                  </LayerDirective>
                </LayersDirective>
              </MapsComponent>
            </Tab.Panel>
            {/* rdc */}
            <Tab.Panel>
              <MapsComponent>
                <Inject services={[MapsTooltip, Marker]} />
                <LayersDirective>
                  <LayerDirective
                    shapeData={rdc}
                    tooltipSettings={{
                      visible: true,
                      valuePath: "name",
                    }}
                    shapeSettings={{
                      fill: "#C8D7EC",
                    }}
                  >
                    <MarkersDirective>
                      <MarkerDirective
                        visible={true}
                        height={20}
                        animationDuration={0}
                        shape="Circle"
                        opacity={0.6}
                        width={5}
                        colorValuePath={"color"}
                        dataSource={[
                          {
                            latitude: 4.0511,
                            longitude: 9.7679,
                            city: "Littoral",
                            color: "red",
                          },
                          {
                            latitude: 4.156,
                            longitude: 9.2632,
                            city: "South-west",
                            color: "yellow",
                          },
                          {
                            latitude: 3.848,
                            longitude: 11.5021,
                            city: "Centre",
                            color: "green",
                          },
                          {
                            latitude: 10.6316,
                            longitude: 14.6588,
                            name: "Far North",
                            color: "pink",
                          },
                        ]}
                      ></MarkerDirective>
                    </MarkersDirective>
                  </LayerDirective>
                </LayersDirective>
              </MapsComponent>
            </Tab.Panel>

            {/* gabon */}
            <Tab.Panel>
              <MapsComponent>
                <Inject services={[MapsTooltip, Marker]} />
                <LayersDirective>
                  <LayerDirective
                    shapeData={gabon}
                    tooltipSettings={{
                      visible: true,
                      valuePath: "name",
                    }}
                    shapeSettings={{
                      fill: "#C8D7EC",
                    }}
                  >
                    <MarkersDirective>
                      <MarkerDirective
                        visible={true}
                        height={20}
                        animationDuration={0}
                        shape="Circle"
                        opacity={0.6}
                        width={5}
                        colorValuePath={"color"}
                        dataSource={[
                          {
                            latitude: 4.0511,
                            longitude: 9.7679,
                            city: "Littoral",
                            color: "red",
                          },
                          {
                            latitude: 4.156,
                            longitude: 9.2632,
                            city: "South-west",
                            color: "yellow",
                          },
                          {
                            latitude: 3.848,
                            longitude: 11.5021,
                            city: "Centre",
                            color: "green",
                          },
                          {
                            latitude: 10.6316,
                            longitude: 14.6588,
                            name: "Far North",
                            color: "pink",
                          },
                        ]}
                      ></MarkerDirective>
                    </MarkersDirective>
                  </LayerDirective>
                </LayersDirective>
              </MapsComponent>
            </Tab.Panel>
          </Tab.Panels>

          <div className="flex justify-between items-center border-t-2 border-gray-100 pl-5 ">
            <div className="text-indigo-600 font-semibold">
              Select the countries
            </div>
            <Tab.List className="-mt-1 pr-3">
              {tabs.map((tab, index) => (
                <Tab key={tab + "-pan-" + index} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={classNames(
                        selected
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "whitespace-nowrap py-3 px-2 border-t-4 font-medium text-sm outline-none"
                      )}
                    >
                      {tab}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>
        </Tab.Group>
      </div>

      <div className="p-5">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </div>
    </div>
  );
}
