import React, { useRef, useEffect, useState } from "react";

import {
  Chart,
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig } from "../utils/Utils";

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);

function DoughnutChart({ data, width, height }) {
  const canvas = useRef(null);
  const legend = useRef(null);

  const [percentages, setPercentages] = useState(data?.datasets[0].data);

  useEffect(() => {
    console.log("data: ", data.datasets[0].data);

    setPercentages(data?.datasets[0].data);

    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        cutout: "58%",
        layout: {
          padding: 0,
        },
        elements: {
          center: {
            text: "20K",
            text2: "PATIENTS",
            color: tailwindConfig().theme.colors.indigo[700], // Default is #000000
            fontStyle: "Arial", // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 25, // Default is 25 (in px), used for when text wraps
          },
        },

        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },

      plugins: [
        {
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item, index) => {
              const li = document.createElement("li");
              li.style.margin = tailwindConfig().theme.margin[0.5];
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
        {
          afterDatasetsDraw: function (chart) {
            if (chart.config.options.elements.center) {
              // Get ctx from string
              var ctx = chart.ctx;

              // Get options from the center object in options
              var centerConfig = chart.config.options.elements.center;
              var fontStyle = centerConfig.fontStyle || "Arial";
              var txt = centerConfig.text;
              var txt2 = centerConfig.text2;

              var color = centerConfig.color || "#000";

              var elementWidth = 2;

              var lineHeight = centerConfig.lineHeight || 25;

              // Set font settings to draw it correctly.
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
              var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
              ctx.font = "bold " + 20 + "px " + fontStyle;
              ctx.fillStyle = color;
              ctx.lineWidth = 5;

              var words = [txt, txt2];
              var line = "";
              var lines = [];

              // Break words up into multiple lines if necessary
              for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n];
                var metrics = ctx.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > elementWidth && n > 0) {
                  lines.push(line);
                  line = words[n];
                } else {
                  line = testLine;
                }
              }

              // Move the center up depending on line height and number of lines
              centerY -= (lines.length / 4) * lineHeight;

              for (var n = 0; n < lines.length; n++) {
                ctx.fillText(lines[n], centerX, centerY);
                ctx.font = "bold 10px Arial";
                centerY += lineHeight - 8;
              }
              //Draw text in center
              ctx.fillText(line, centerX, centerY);
            }
          },
        },
      ],
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grow flex flex-col justify-center">
      <div>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <div className="px-5 pt-2 pb-3.5">
        <ul ref={legend} className="-m-1"></ul>
      </div>
    </div>
  );
}

export default DoughnutChart;
