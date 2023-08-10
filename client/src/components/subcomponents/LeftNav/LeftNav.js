import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "../Buttons/Button";
import CheckBox from "../CheckBox/CheckBox";
import Style from "./LeftNav.module.scss";

const LeftNav = (props) => {
  const [logOut, setlogOut] = useState("Log In");
  const hideNav = useLocation();
  const JavaScript = useRef();
  // const [profile, setProfile] = useState(Logo);
  let seshStorage = JSON.parse(sessionStorage.getItem("UserData"));

  useEffect(() => {
    if (
      seshStorage === "undefined" ||
      seshStorage === null ||
      seshStorage === ""
    ) {
    } else {
      setlogOut("Log Out");
    }
  }, [seshStorage]);

  return (
    <div className={props.show ? Style.Bounds : "hide"}>
      <div className={Style.leftNav}>
        <br />
        <NavLink to="/" className={Style.Home} activeClassName={Style.active}>
          <div className={Style.IconSpot1}></div>
          <h3 className={Style.homeText}>Home</h3>
        </NavLink>
        <br />

        <NavLink to="/Questions" className={Style.Questions}>
          <div className={Style.IconSpot2}></div>
          <h3 className={Style.text}>Questions</h3>
        </NavLink>
        <div className={Style.Spacer}></div>

        <NavLink to="/LogNReg">
          <div className={Style.Logout}>
            <div className={Style.LogImg}></div>
            <h3
              onClick={() => {
                sessionStorage.removeItem("UserData");
              }}
              className={Style.LogoutText}
            >
              {logOut}
            </h3>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default LeftNav;
