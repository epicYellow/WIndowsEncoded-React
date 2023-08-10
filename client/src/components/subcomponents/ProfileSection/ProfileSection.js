import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import Logo from "../../../Icons/Profile.svg";

import { useNavigate } from "react-router-dom";
import EditProfile from "../Edit Profile/EditProfile";
import ProfileQuestion from "../ProfileQuestion/ProfileQuestion";
import ProgressBar from "../ProgressBar/ProgressBar";
import Style from "./ProfileSection.module.scss";

//badges
import bronze from "../../../Img/Badges/Bronze.png";
import gold from "../../../Img/Badges/Gold.png";
import ScoreOne from "../../../Img/Badges/ScoreOne.png";
import ScoreThree from "../../../Img/Badges/ScoreThree.png";
import ScoreTwo from "../../../Img/Badges/ScoreTwo.png";
import silver from "../../../Img/Badges/Silver.png";

const ProfileSection = (props) => {
  const [EditProfileModal, setEditProfileModal] = useState();
  const [displayText, setDisplayText] = useState();
  const [editModal, setEditModal] = useState();
  const [profile, setProfile] = useState(Logo);
  const [userData, setuserData] = useState();
  const [userName, setUserName] = useState("No User");
  const [QuestionCount, setQuestionCount] = useState();
  const [AnswerCount, setAnswerCount] = useState();
  const [profileBadge, setprofileBadge] = useState();

  const Navigate = useNavigate();

  let seshStorage = JSON.parse(sessionStorage.getItem("UserData"));
  console.log(seshStorage);

  let ReliabilityScore = seshStorage.score;

  const edit = () => {
    setEditModal(
      <EditProfile
        close={setEditModal}
        rerender={setEditModal}
        username={seshStorage.username}
        email={seshStorage.email}
        password={seshStorage.password}
        profile={seshStorage.profile}
        updateRender={props.updateRender}
        setUpdateRender={props.setUpdateRender}
      />
    );
  };

  useEffect(() => {
    const badges = {
      ScoreOne: ScoreOne,
      ScoreTwo: ScoreTwo,
      ScoreThree: ScoreThree,
    };

    let score = seshStorage.score;

    console.log(score);

    if (score >= 1) {
      setprofileBadge(badges.ScoreOne);
    }
    if (score >= 15) {
      setprofileBadge(badges.ScoreTwo);
    }

    if (score >= 20) {
      setprofileBadge(badges.ScoreThree);
    }
  });

  useEffect(() => {
    if (
      seshStorage === "" ||
      seshStorage === null ||
      seshStorage === undefined ||
      seshStorage === false
    ) {
      Navigate("/");
    } else if (!seshStorage) {
      Navigate("/");
    }
  }, []);

  useEffect(() => {
    if (
      seshStorage === "undefined" ||
      seshStorage === null ||
      seshStorage === ""
    ) {
      Navigate("/");
    } else {
      setProfile(`/ProfileImages/${seshStorage.profile}`);
      setuserData(seshStorage);
      setUserName(seshStorage.username);
      console.log(seshStorage);
      let temp = {
        admin: true,
      };

      if (seshStorage.score >= 100) {
        axios.patch("/api/admin/" + seshStorage._id, temp);
      }
    }
  }, []);

  useEffect(() => {
    axios.get("/api/allQuestions").then((res) => {
      let data = res.data;
      let render = data.filter(
        (filterData) => seshStorage._id === filterData.userId
      );
      setQuestionCount(render.length);
      console.log(render);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/allAnswers").then((res) => {
      let data = res.data;
      console.log(data);
      let AnswerRender = data.filter(
        (filterData) => seshStorage._id === filterData.userId
      );
      setAnswerCount(AnswerRender.length);
      console.log(AnswerRender);
    });
  }, []);

  return (
    <>
      {editModal}

      <div className={Style.MainProfileSection}>
        <div className={Style.EditButton} onClick={edit}></div>

        <div className={Style.ProfileImages}>
          <div
            className={Style.ProfileImage}
            style={{
              backgroundImage: `url(${profile})`,
              backgroundColor: `white`,
              backgroundSize: `cover`,
              backgroundPosition: `center`,
            }}
          ></div>
          <div className={Style.ProfileDisplayBadge}>
            <img className={Style.badgee} src={profileBadge} />
          </div>
        </div>

        <h2 className={Style.Username}>{userName}</h2>
        {/* <Line percent={10} strokeWidth={4} strokeColor="#D3D3D3" /> */}
        <ProgressBar />
        <h3 className={Style.MemberLength}>Member for 1 year, 2 months</h3>

        <div className={Style.TotalAsked}>
          <h2 className={Style.Scores}>{QuestionCount}</h2>
          <h3 className={Style.ScoreText}>Questions Asked</h3>
        </div>

        <div className={Style.TotalAnswered}>
          <h2 className={Style.Scores}>{AnswerCount}</h2>
          <h3 className={Style.ScoreText}>Questions Answered</h3>
        </div>

        <div className={Style.ReliabilityScore}>
          <h2 className={Style.Scores}>{ReliabilityScore}</h2>
          <h3 className={Style.ScoreText}>Reliability Score</h3>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
