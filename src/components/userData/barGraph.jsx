import React from "react";
import { Bar } from "react-chartjs-2";
import Colors from "../../colorScheme/index.jsx";

const Data = (props) => {
  return (
    <>
      <Bar
        data={{
          // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          labels: props.xAxis,
          responsive: false,

          datasets: [
            {
              label: "No. of Problems",
              // data: [100, 200, 300, 400, 500, 600],
              data: props.yAxis,
              backgroundColor: Colors.graph,
              // barThickness: 40,
              // borderWidth: 6,
              borderColor: "black",
            },
            // {
            //   label: "Store 2",
            //   data: [321, 212, 344, 332, 223, 566],
            //   backgroundColor: "green",
            //   barThickness: 12,
            // },
            // {
            //   label: "Store 3",
            //   data: [123, 200, 232, 400, 232, 23],
            //   backgroundColor: "orange",
            //   barThickness: 12,
            // },
            // {
            //   label: "Store 4",
            //   data: [100, 500, 300, 343, 43, 343],
            //   backgroundColor: "purple",
            //   barThickness: 12,
            // },
          ],
        }}
        options={{
          layout: {
            padding: {
              left: 0,
              right: 0,
              bottom: 40,
              top: 40,
            },
          },
          tooltips: {
            callbacks: {
              label: function (toolTipItem) {
                return "$" + toolTipItem.value;
              },
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "cyan",
                },
                scaleLabel: {
                  labelString: "x-axis",
                  display: true,
                  fontColor: "blue",
                  fontSize: "8rem",
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: "cyan",
                },

                scaleLabel: {
                  labelString: "y-axis",
                  display: true,
                  fontColor: "blue",
                  fontSize: "8rem",
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: "red",
                  fontSize: "6rem",
                },
              },
            ],
          },
        }}
      ></Bar>
    </>
  );
};

export default Data;
