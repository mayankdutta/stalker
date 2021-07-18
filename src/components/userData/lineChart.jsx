import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => (
  <>
    <Line
      data={{
        layout: {
          padding: {
            left: 0,
            right: 0,
            bottom: 40,
            top: 40,
          },
        },
        labels: props.xAxis,
        datasets: [
          {
            label: "Rating",
            data: props.yAxis,
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      }}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }}
    />
  </>
);

export default LineChart;
