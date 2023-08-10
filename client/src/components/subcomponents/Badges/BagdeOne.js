import React, { useState } from "react";
import Style from "./Badges.module.scss";

const BagdeOne = () => {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={Style.Box}
      >
        <div className={Style.badge}></div>
        
        <div className={hide ? "hide" : Style.Popup}>Bronze</div>
      </div>
    </>
  );
};

export default BagdeOne;
