import React, { useState } from "react";
import Style from "./Badges.module.scss";

const FiveQuestionsBadge = () => {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={Style.Box}
      >
        <div className={Style.FiveAnsweredBadge}></div>
        
        <div className={hide ? "hide" : Style.Popup}>Five Questions Asked</div>
      </div>
    </>
  );
};

export default FiveQuestionsBadge;
