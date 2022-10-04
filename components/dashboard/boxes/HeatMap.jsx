import React, { useEffect } from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// import ApexCharts from "apexcharts";
// import ApexCharts from "react-apexcharts";

import dynamic from "next/dynamic";

import {
  MapsComponent,
  LayersDirective,
  LayerDirective,
  MarkersDirective,
  MarkerDirective,
  Marker,
  Legend,
  Inject,
} from "@syncfusion/ej2-react-maps";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

const data = [
  { name: "Cardiology", value: 30, text: "30%" },
  { name: "Surgery", value: 21, text: "21%" },
  { name: "Malaria", value: 10, text: "10%" },
  { name: "Others", value: 5, text: "5%" },
];

export default function PatientOverview() {
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

  const markerDataSource = [
    {
      code: "AF",
      value: 53,
      name: "Afghanistan",
      population: 29863010,
      density: 119,
    },
    {
      code: "AL",
      value: 117,
      name: "Albania",
      population: 3195000,
      density: 111,
    },
    {
      code: "DZ",
      value: 15,
      name: "Algeria",
      population: 34895000,
      density: 15,
    },
    {
      code: "AO",
      value: 15,
      name: "Angola",
      population: 18498000,
      density: 15,
    },
    {
      code: "AR",
      value: 15,
      name: "Argentina",
      population: 40091359,
      density: 14,
    },
    {
      code: "AM",
      value: 109,
      name: "Armenia",
      population: 3230100,
      density: 108,
    },
  ];

  return (
    <div className="grid grid-cols-3 divide-x-2 gap-2 bg-white  border-slate-200 rounded-lg shadow-md">
      <div className="flex flex-col  col-span-2 w-full  pb-4">
        <h2 className="font-semibold text-slate-800 px-5 pt-3">
          COVID-19 Pandemic
        </h2>

        <div className="relative">
          <MapsComponent
            className="aboslute"
            id="maps"
            legendSettings={{
              visible: true,
              type: "Markers",
              useMarkerShape: true,
              toggleLegendSettings: {
                enable: true,
                applyShapeSettings: false,
                border: {
                  color: "green",
                  width: 2,
                },
              },
            }}
          >
            <Inject services={[Marker, Legend]} />
            <LayersDirective>
              <LayerDirective urlTemplate="https://tile.openstreetmap.org/level/tileX/tileY.png">
                <MarkersDirective>
                  <MarkerDirective
                    visible={true}
                    dataSource={markerDataSource}
                    colorValuePath="color"
                    shapeValuePath="shape"
                    legendText="country"
                  ></MarkerDirective>
                </MarkersDirective>
              </LayerDirective>
            </LayersDirective>
          </MapsComponent>
        </div>
      </div>

      <div className="p-5">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </div>
    </div>
  );
}
