import React, { useEffect } from "react";
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
import { uncountries } from "@/data";

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
                            latitude: 37.0,
                            longitude: -120.0,
                            city: "California",
                            color: "yellow",
                          },
                          {
                            latitude: 40.7127,
                            longitude: -74.0059,
                            city: "New York",
                            color: "yellow",
                          },
                          {
                            latitude: 42,
                            longitude: -93,
                            city: "Iowa",
                            color: "yellow",
                          },
                          {
                            latitude: 19.228825,
                            longitude: 72.854118,
                            name: "Mumbai",
                            color: "blue",
                          },
                          {
                            latitude: 28.610001,
                            longitude: 77.230003,
                            name: "Delhi",
                            color: "blue",
                          },
                          {
                            latitude: 13.067439,
                            longitude: 80.237617,
                            name: "Chennai",
                            color: "blue",
                          },
                        ]}
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
