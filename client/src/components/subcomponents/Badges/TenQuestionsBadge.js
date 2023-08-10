import React, { useState } from "react";
import Style from "./Badges.module.scss";

const TenQuestionsBadge = () => {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={Style.Box}
      >
        <div className={Style.TenQuestionBadge}></div>
       
        <div className={hide ? "hide" : Style.Popup}>10 Questions Asked</div>
      </div>
    </>
  );
};

export default TenQuestionsBadge;
