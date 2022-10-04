import React, { useRef, useEffect, useState } from "react";

import {
  Chart,
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-moment";
import { Doughnut } from "react-chartjs-2";

// Import utilities
import { tailwindConfig } from "../utils/Utils";

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip, Legend);

function DoughnutChart({ data, width, height }) {
  const canvas = useRef(null);
  const legend = useRef(null);

  const [charData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  const [percentages, setPercentages] = useState([]);
  const [htmlLegendPlugin, setHtmlLegendPlugin] = useState([]);

  useEffect(() => {
    // const ctx = canvas.current;
    console.log("data: ", data.datasets[0].data);
    // console.log("chart: ", Chart.controllers.doughnut);

    setPercentages(data.datasets[0].data);

    setChartData(data);

    setHtmlLegendPlugin({
      id: "htmlLegend",
      afterUpdate(chart, args, options) {
        const ul = document.getElementById("#legend");
        console.log("ul:", ul);
        if (!ul) return;
        // Remove old legend items
        while (ul.firstChild) {
          ul.firstChild.remove();
        }
        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);
        items.forEach((item, index) => {
          const li = document.createElement("li");
          li.style.margin = tailwindConfig().theme.margin[1];
          // Button element
          const p = document.createElement("p");
          p.classList.add("text-xs");
          p.classList.add("flex");
          p.classList.add("items-center");
          p.classList.add("justify-between");
          p.style.color = tailwindConfig().theme.colors.slate[500];
          console.log("item: ", item);
          console.log("percents: ", percentages[index]);

          // enclosing span 1
          const span1 = document.createElement("span");
          span1.classList.add("flex");
          span1.classList.add("items-center");

          // Color box
          const box = document.createElement("span");
          box.style.display = "block";
          box.style.width = tailwindConfig().theme.width[2];
          box.style.height = tailwindConfig().theme.height[2];
          box.style.backgroundColor = item.fillStyle;
          box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
          box.style.marginRight = tailwindConfig().theme.margin[1];
          box.style.pointerEvents = "none";
          // Label
          const label = document.createElement("span");
          label.classList.add("line-clamp-1");
          const labelText = document.createTextNode(item.text);
          label.appendChild(labelText);

          span1.appendChild(box);
          span1.appendChild(label);

          // enclosing span 2
          const span2 = document.createElement("span");
          span2.classList.add("flex");
          span2.classList.add("items-center");
          span2.classList.add("justify-start");

          // HRule
          const hr = document.createElement("hr");
          hr.classList.add("border-slate-200");
          hr.classList.add("border-0.5");
          hr.classList.add("w-full");
          hr.classList.add("ml-2");

          // percentage
          const percent = document.createElement("span");
          percent.classList.add("text-slate-800");
          const percentText = document.createTextNode(percentages[index] + "%");
          percent.appendChild(percentText);

          span2.appendChild(percent);

          li.appendChild(p);
          p.appendChild(span1);
          p.appendChild(hr);
          p.appendChild(span2);
          ul.appendChild(li);
        });
      },
    });

    setChartOptions({
      // type: "doughnut",
      // data: data,
      cutout: "55%",
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 15,
          bottom: 15,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          align: "start",
          generateLabels(chart) {
            const ul = legend.current;
            console.log("ul:", ul);
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator
            const items = Chart.controllers.doughnut;
            console.log("labels:", items);
            items.forEach((item, index) => {
              const li = document.createElement("li");
              li.style.margin = tailwindConfig().theme.margin[1];
              // Button element
              const p = document.createElement("p");
              p.classList.add("text-xs");
              p.classList.add("flex");
              p.classList.add("items-center");
              p.classList.add("justify-between");
              p.style.color = tailwindConfig().theme.colors.slate[500];
              console.log("item: ", item);
              console.log("percents: ", percentages[index]);

              // enclosing span 1
              const span1 = document.createElement("span");
              span1.classList.add("flex");
              span1.classList.add("items-center");

              // Color box
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[2];
              box.style.height = tailwindConfig().theme.height[2];
              box.style.backgroundColor = item.fillStyle;
              box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
              box.style.marginRight = tailwindConfig().theme.margin[1];
              box.style.pointerEvents = "none";
              // Label
              const label = document.createElement("span");
              label.classList.add("line-clamp-1");
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);

              span1.appendChild(box);
              span1.appendChild(label);

              // enclosing span 2
              const span2 = document.createElement("span");
              span2.classList.add("flex");
              span2.classList.add("items-center");
              span2.classList.add("justify-start");

              // HRule
              const hr = document.createElement("hr");
              hr.classList.add("border-slate-200");
              hr.classList.add("border-0.5");
              hr.classList.add("w-full");
              hr.classList.add("ml-2");

              // percentage
              const percent = document.createElement("span");
              percent.classList.add("text-slate-800");
              const percentText = document.createTextNode(
                percentages[index] + "%"
              );
              percent.appendChild(percentText);

              span2.appendChild(percent);

              li.appendChild(p);
              p.appendChild(span1);
              p.appendChild(hr);
              p.appendChild(span2);
              ul.appendChild(li);
            });
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "nearest",
      },
      animation: {
        duration: 500,
      },
      elements: {
        arc: {
          borderJoinStyle: "miter",
        },
      },
      maintainAspectRatio: false,
      resizeDelay: 200,
      responsive: true,
    });

    // return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grow  flex flex-col justify-center">
      <div>
        {/* <canvas ref={canvas} width={width} height={height}></canvas> */}
        <Doughnut
          plugins={[htmlLegendPlugin]}
          options={chartOptions}
          data={charData}
          width={width}
          height={height}
        />
      </div>
      <div className="px-8 pt-2 pb-6">
        <ul id="legend" className="-m-1"></ul>
      </div>
    </div>
  );
}

export default DoughnutChart;
