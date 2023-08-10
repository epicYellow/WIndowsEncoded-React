import React, { useState } from "react";
import Style from "./Badges.module.scss";

const BadgeTwo = () => {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={Style.Box}
      >
        <div className={Style.badgeTwo}></div>
        
        <div className={hide ? "hide" : Style.Popup}>Silver</div>
      </div>
    </>
  );
};

export default BadgeTwo;
