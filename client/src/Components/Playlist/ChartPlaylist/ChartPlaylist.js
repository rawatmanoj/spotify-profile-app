import React, { useContext } from "react";

import { Context } from "../../../store/store";
import { HorizontalBar } from "react-chartjs-2";
import "./ChartPlaylist.scss";
const ChartPlaylist = () => {
  const [state] = useContext(Context);
  // console.log(state.playlistChart);

  const options = {
    legend: {
      display: false,
      maintainAspectRatio: false,
    },
  };

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
        scales: {
          yAxes: [
            {
              gridLines: {
                color: "white",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: "white",
              },
            },
          ],
        },
        // scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] },
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
        data: state.playlistChart,
      },
    ],
  };

  return (
    <div className="chartPlaylist-container">
      <div>
        {state.playlistChart ? (
          <HorizontalBar
            legend={false}
            options={options}
            data={data}
            width={400}
            height={300}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ChartPlaylist;
