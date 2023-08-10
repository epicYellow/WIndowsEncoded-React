import React, { useState } from "react";
import Style from "./Badges.module.scss";

const BadgeThree = () => {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={Style.Box}
      >
        <div className={Style.badgeThree}></div>
        
        <div className={hide ? "hide" : Style.Popup}>Gold</div>
      </div>
    </>
  );
};

export default BadgeThree;
