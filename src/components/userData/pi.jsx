import React from "react";
import { Pie } from "react-chartjs-2";
import Colors from "../../colorScheme/index.jsx";

const Data = (props) => {
  return (
    <Pie
      data={{
        // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        labels: props.xAxis,
        datasets: [
          {
            data: props.yAxis,
            backgroundColor: Colors.pie.slice(0, props.xAxis.length + 1),
            borderColor: "black",
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
