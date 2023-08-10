import React, { useState } from "react";
import Style from "./Badges.module.scss";

const OneAswered = () => {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={Style.Box}
      >
        <div className={Style.OneAnsweredBadge}></div>
        
        <div className={hide ? "hide" : Style.Popup}>1st Question Answered</div>
      </div>
    </>
  );
};

export default OneAswered;
