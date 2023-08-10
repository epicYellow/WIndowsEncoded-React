import React, { useState } from "react";
import Style from "./Badges.module.scss";

const TenAswered = () => {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={Style.Box}
      >
        <div className={Style.TenAnsweredBadge}></div>
       
        <div className={hide ? "hide" : Style.Popup}>Ten Questions Answered</div>
      </div>
    </>
  );
};

export default TenAswered;
