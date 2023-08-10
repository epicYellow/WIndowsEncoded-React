import React, { useState } from "react";
import Style from "./Badges.module.scss";

const FirstQuestionBadge = () => {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={Style.Box}
      >
        <div className={Style.FirstQuestionBadge}></div>
        
        <div className={hide ? "hide" : Style.Popup}>
          <h4>Asked 1st Question </h4>
        </div>
      </div>
    </>
  );
};

export default FirstQuestionBadge;
