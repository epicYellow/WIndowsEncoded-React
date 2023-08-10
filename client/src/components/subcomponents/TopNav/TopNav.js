import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import DefaultIcon from "../../../Icons/Profile.svg";
import Admin from "../Admin/Admin";
import Input from "../Inputs/Input";
import SearchResult from "../SearchResult/SearchResult";
import Style from "./TopNav.module.scss";

const TopNav = (props) => {
  const Result = useRef();
  const [userName, setuserName] = useState("Please Log In");
  const [profile, setProfile] = useState(DefaultIcon);
  const [Navigate, setNavigate] = useState("/");
  const [ResultsModal, setResultsModal] = useState(false);
  const [ResultData, setResultData] = useState("");
  const [Loaded, setLoaded] = useState("NotLoading");

  const [AdminModal, setAdminModal] = useState(true);
  const [AdminLogo, setAdminLogo] = useState(false);

  let seshStorage = JSON.parse(sessionStorage.getItem("UserData"));

  useEffect(() => {
    if (
      seshStorage === "" ||
      seshStorage === null ||
      seshStorage === undefined ||
      seshStorage === false
    ) {
    } else {
      if (seshStorage.admin) {
        setAdminLogo(seshStorage.admin);
      } else {
        setAdminLogo(seshStorage.admin);
      }
    }
  }, []);

  const Search = () => {
    if (Result.current.value === "") {
      setResultsModal(false);
    } else {
      setResultsModal(true);
      setResultData(Result.current.value);
    }
  };

  const clearInput = useLocation();

  useEffect(() => {
    if (clearInput.pathname === "/IndividualQuestion") {
      setResultsModal(false);
    }
  }, []);

  useEffect(() => {
    if (
      seshStorage === "undefined" ||
      seshStorage === null ||
      seshStorage === ""
    ) {
      setNavigate("/");
    } else {
      setNavigate("/Profile");
      setProfile(`/ProfileImages/${seshStorage.profile}`);
      setuserName(seshStorage.username);
    }
  }, []);

  const openModal = () => {
    setAdminModal(false);
  };

  return (
    <div className={props.show ? Style.Bounds : "hide"}>
      <div className={props.show ? Style.topNav : "hide"}>
        <div className={Style.LOGO}></div>
        <div className={Style.Results}>
          <SearchResult
            ResultsModal={ResultsModal}
            setResultsModal={setResultsModal}
            ResultData={ResultData}
            setLoaded={setLoaded}
            Loaded={Loaded}
          />
        </div>
        <Input
          onChange={() => {
            Search();
            setLoaded("Loading");
          }}
          ref={Result}
          className="Search"
          Intype="Search"
        />
        <h4 className={Style.Heading}>{userName}</h4>
        <div
          className={AdminLogo ? Style.Admin : "hide"}
          onClick={openModal}
        ></div>
        <Link to="/Profile">
          <div
            className={Style.ProfileImage}
            style={{ backgroundImage: `url(${profile})` }}
          ></div>
        </Link>
      </div>
      <Admin setAdminModal={setAdminModal} AdminModal={AdminModal} />
    </div>
  );
};

export default TopNav;
