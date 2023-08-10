import React from "react";
import Style from "./ProgressBar.module.scss";

const ProgressBar = () => {
  let seshStorage = JSON.parse(sessionStorage.getItem("UserData"));

  const value = seshStorage.score;
  const max = 100;



  return (
    <>
      <span>{(value / max) * 100}% Towards Becoming a pro ! </span>
      <progress value={value} max={max} className={Style.bar} />
    </>
  );
};

export default ProgressBar;
