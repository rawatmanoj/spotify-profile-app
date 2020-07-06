import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Context } from "../../../store/store";

import "./Chart.scss";

const Chart = () => {
  const [state] = useContext(Context);

  function prepareChartData(dataset) {
    // console.log(dataset);
    // const chartdata = Object.values(state.audioFeatures);
    if (state.audioFeatures) {
      const {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        speechiness,
        valence,
      } = state.audioFeatures;

      const chartdata = Object.values({
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        speechiness,
        valence,
      });
      return chartdata;
    }
  }

  const chartData = prepareChartData(state.audioFeatures);
  console.log(chartData);

  const data = {
    labels: [
      "acousticness",
      "danceability",
      "energy",
      "instrumentalness",
      "liveness",
      "speechiness",
      "valence",
    ],
    title: {
      display: true,
      text: `Audio Features`,
      fontSize: 18,
      // fontFamily: `${fonts.primary}`,
      fontColor: "#ffffff",
      padding: 30,
    },
    datasets: [
      {
        scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] },
        label: "stats",
        fillColor: "white",
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(104, 132, 245, 0.3)",
          "rgba(153, 102, 255, 0.3)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(104, 132, 245, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        gridLines: { color: "white" },
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: chartData,
      },
    ],
  };

  return (
    <div className="chart-container">
      <div>
        {state.audioFeatures ? (
          <Bar
            data={data}
            width={700}
            height={600}
            options={{
              maintainAspectRatio: false,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Chart;
