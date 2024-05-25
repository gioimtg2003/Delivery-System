import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip,
  Filler,
  Legend
);

export const optionsLine = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 2,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
      pointStyle: "circle",
    },
  },
};

const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export function LineChart({ datasets }: Readonly<{ datasets: number[] }>) {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: datasets,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointBorderColor: "transparent",
      },
    ],
  };

  return <Line options={optionsLine} data={data} />;
}

export function BarChart({ datasets }: Readonly<{ datasets: number[] }>) {
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: datasets,
        backgroundColor: "rgb(143, 204, 239)",
        borderColor: "rgb(55, 164, 226)",
        borderWidth: 2,
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  return <Bar options={optionsBar} data={data} />;
}
