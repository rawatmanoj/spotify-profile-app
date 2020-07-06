import React from "react";
import "./Spinner.scss";
import { RadarSpinner } from "react-epic-spinners";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <RadarSpinner className="spinner" size={100} color="#eb4e7a" />
    </div>
  );
};

export default Spinner;
