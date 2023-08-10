import React, { useState } from "react";
import Style from "./Badges.module.scss";

const FiveAswered = () => {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={Style.Box}
      >
        <div className={Style.FiveAnsweredBadge}></div>
        
        <div className={hide ? "hide" : Style.Popup}>Five Questions Answered</div>
      </div>
    </>
  );
};

export default FiveAswered;
