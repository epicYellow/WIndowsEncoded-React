import React, { useState } from "react";
import Style from "./Badges.module.scss";

const FiftyAsked = () => {
  const [hide, setHide] = useState(true);

  return (
    <>
      <div
        onMouseEnter={() => setHide(false)}
        onMouseLeave={() => setHide(true)}
        className={Style.Box}
      >
        <div className={Style.FiftyAskedBadge}></div>
        
        <div className={hide ? "hide" : Style.Popup}>Fifty Asked</div>
      </div>
    </>
  );
};

export default FiftyAsked;
