import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchItems } from "../util/fetchItems";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const Analyze = () => {
  const [seachedItems, setSeachedItems] = useState<Item[]>();

  useEffect(() => {
    fetchItems().then((seachedItem) => setSeachedItems(seachedItem));
  }, []);

  const label = seachedItems?.map((seachedItem) => {
    return seachedItem.name;
  });

  const clicked = seachedItems?.map((seachedItem) => {
    return seachedItem.clicked;
  });

  const data = {
    labels: label,
    type: "bar",
    datasets: [
      {
        label: "動物",
        data: clicked,
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    type: "bar",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="m-10 ">
      <h1 className="font-bold text-xl">クリック数</h1>
      {/* {seachedItems?.map((seachedItem) => (
        <div className="flex items-center">
          <h1>・</h1>
          <h1 className="w-20">{seachedItem.name}</h1>
          <div className="relative h-20 w-20 z-0">
            <Image
              src={seachedItem.url}
              alt={seachedItem.name}
              fill
              className="object-contain "
            />
          </div>
          <h1>{seachedItem.clicked}</h1>
        </div>
      ))} */}
      <Bar data={data} width={100} height={50} options={options} />
    </div>
  );
};

export default Analyze;
