import React from "react";
import { Pie } from "react-chartjs-2";

const Data = (props) => {
  const colors = [
    "#a94064",
    "#f88379",
    "#D4AF37",
    "#eedc82",
    "#922724",
    "#6699cc",
    "#808000",
    "#228b22",
    "#77dd77",
    "#008080",
    "#89CFF0",
    "#4169e1",
    "#800020",
    "#b38b6d",
    "#daa520",
    "#e97451",
    "#8a3324",
    "#c2b280",
    "#551a8b",
    "#702963",
    "#563c5c",
    "#4B0082",
    "#9966cc",
  ];
  return (
    <Pie
      data={{
        // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        labels: props.xAxis,
        datasets: [
          {
            data: props.yAxis,
            backgroundColor: colors.slice(0, props.xAxis.length + 1),
            // backgroundColor: [
            //   "red",
            //   "green",
            //   "orange",
            //   "purple",
            //   "cyan",
            //   "blue",
            //   "white",
            //   "gray",
            //   "black",
            // ],
          },
          // {
          //   data: [20, 44, 300, 33, 500, 600],
          //   backgroundColor: [
          //     "red",
          //     "green",
          //     "orange",
          //     "purple",
          //     "cyan",
          //     "blue",
          //   ],
          // },
          // {
          //   data: [22, 200, 444, 400, 500, 30],
          //   backgroundColor: [
          //     "red",
          //     "green",
          //     "orange",
          //     "purple",
          //     "cyan",
          //     "blue",
          //   ],
          // },
        ],
      }}
    ></Pie>
  );
};

export default Data;
