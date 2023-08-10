import { default as axios, default as Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BadgeThree from "../../subcomponents/Badges/BadgeThree";
import BadgeTwo from "../../subcomponents/Badges/BadgeTwo";
import BagdeOne from "../../subcomponents/Badges/BagdeOne";

import FiftyAnswered from "../../subcomponents/Badges/FiftyAnswered";
import FiftyAsked from "../../subcomponents/Badges/FiftyAsked";
import FirstQuestionBadge from "../../subcomponents/Badges/FirstQuestionBadge";
import FiveAswered from "../../subcomponents/Badges/FiveAswered";
import FiveQuestionsBadge from "../../subcomponents/Badges/FiveQuestionsBadge";
import OneAswered from "../../subcomponents/Badges/OneAswered";
import TenAswered from "../../subcomponents/Badges/TenAswered";
import TenQuestionsBadge from "../../subcomponents/Badges/TenQuestionsBadge";
import ProfileQuestion from "../../subcomponents/ProfileQuestion/ProfileQuestion";
import ProfileSection from "../../subcomponents/ProfileSection/ProfileSection";
import Style from "./Profile.module.scss";

const Profile = (props) => {
  const [ProfileData, setProfileData] = useState();
  const [ProfileQuestions, setProfileQuestions] = useState();
  const [updateRender, setUpdateRender] = useState(false);

  const [AskedQuestions, setAskedQuestions] = useState();
  const [AnsweredQeusitons, setAnsweredQeusitons] = useState();

  const Navigate = useNavigate();
  const [Busy, setBusy] = useState(true);

  useEffect(() => {
    const USER = sessionStorage.getItem("UserData");
    let user = JSON.parse(USER);
    if (USER === "" || USER === null || USER === undefined || USER === false) {
      Navigate("/LogNReg");
    } else if (USER) {
      // Navigate("/");
      setBusy(false);
      let UserId = user._id;

      axios.get("/api/allQuestions").then((res) => {
        let data = res.data;
        setProfileQuestions(
          data
            .filter((filterData) => UserId === filterData.userId)
            // TODO: Rerender after editing
            .map((Ques) => (
              <ProfileQuestion
                key={Ques._id}
                alldata={Ques}
                updateRender={updateRender}
                setUpdateRender={setUpdateRender}
              />
            ))
        );
        let Qasked = data.filter(
          (filterData) => seshStorage._id === filterData.userId
        );
        setAskedQuestions(Qasked.length);
      });
    }
  }, [updateRender]);

  useEffect(() => {
    axios.get("/api/allAnswers").then((res) => {
      let data = res.data;
      let Qanswered = data.filter(
        (filterData) => seshStorage._id === filterData.userId
      );
      setAnsweredQeusitons(Qanswered.length);
    });
  }, []);

  let seshStorage = JSON.parse(sessionStorage.getItem("UserData"));
  let score = 0;

  useEffect(() => {
    if (
      seshStorage === "" ||
      seshStorage === null ||
      seshStorage === undefined ||
      seshStorage === false
    ) {
    } else {
      score = seshStorage.score;
    }
  }, []);

  let badgeOne = <BagdeOne />;
  let badgeoneCheck = false;

  let badgeTwo = <BadgeTwo />;
  let badgeTwoCheck = false;

  let badgeThree = <BadgeThree />;
  let badgeThreeCheck = false;

  let OneQuestionAsked = <FirstQuestionBadge />;
  let OneQuestionAskedCheck = false;

  let fiveQuestionsBadge = <FiveQuestionsBadge />;
  let fiveQuestionsBadgeCheck = false;

  let TenQuestionBadge = <TenQuestionsBadge />;
  let TenQuestionBadgeCheck = false;

  let FiftyQuestionBadge = <FiftyAsked />;
  let FiftyQuestionBadgeCheck = false;

  let OneAnswerBadge = <OneAswered />;
  let OneAnswerBadgeCheck = false;

  let FiveAnswerBadge = <FiveAswered />;
  let FiveAnswerBadgeCheck = false;

  let TenAnswerBadge = <TenAswered />;
  let TenAnswerBadgeCheck = false;

  let FiftyAnswerbadge = <FiftyAnswered />;
  let FiftyAnswerbadgeCheck = false;

  //ANSWERED QUEATIONS BADGES
  if (AnsweredQeusitons >= 1) {
    OneAnswerBadgeCheck = true;
    FiveAnswerBadgeCheck = false;
    TenAnswerBadgeCheck = false;
    FiftyAnswerbadgeCheck = false;
  }
  if (AnsweredQeusitons >= 5) {
    OneAnswerBadgeCheck = true;
    FiveAnswerBadgeCheck = true;
    TenAnswerBadgeCheck = false;
    FiftyAnswerbadgeCheck = false;
  }
  if (AnsweredQeusitons >= 10) {
    OneAnswerBadgeCheck = true;
    FiveAnswerBadgeCheck = true;
    TenAnswerBadgeCheck = true;
    FiftyAnswerbadgeCheck = false;
  }
  if (AnsweredQeusitons >= 50) {
    OneAnswerBadgeCheck = true;
    FiveAnswerBadgeCheck = true;
    TenAnswerBadgeCheck = true;
    FiftyAnswerbadgeCheck = true;
  }

  //ASKED QUEATIONS BADGES
  if (AskedQuestions >= 1) {
    OneQuestionAskedCheck = true;
    fiveQuestionsBadgeCheck = false;
    TenQuestionBadgeCheck = false;
    FiftyQuestionBadgeCheck = false;
  }

  if (AskedQuestions >= 5) {
    OneQuestionAskedCheck = true;
    fiveQuestionsBadgeCheck = true;
    TenQuestionBadgeCheck = false;
    FiftyQuestionBadgeCheck = false;
  }
  if (AskedQuestions >= 10) {
    OneQuestionAskedCheck = true;
    fiveQuestionsBadgeCheck = true;
    TenQuestionBadgeCheck = true;
    FiftyQuestionBadgeCheck = false;
  }
  if (AskedQuestions >= 50) {
    OneQuestionAskedCheck = true;
    fiveQuestionsBadgeCheck = true;
    TenQuestionBadgeCheck = true;
    FiftyQuestionBadgeCheck = true;
  }

  if (score >= 5) {
    badgeoneCheck = true;
    badgeTwoCheck = false;
    badgeThreeCheck = false;
  }
  if (score >= 15) {
    badgeoneCheck = true;
    badgeTwoCheck = true;
    badgeThreeCheck = false;
  }
  if (score >= 50) {
    badgeoneCheck = true;
    badgeTwoCheck = true;
    badgeThreeCheck = true;
  }

  return Busy ? null : (
    <div className={Style.body}>
      <h1>Badges to achive</h1>
      <div className={Style.BadgeSection}>
        {badgeoneCheck === true ? badgeOne : ""}
        {badgeTwoCheck === true ? badgeTwo : ""}
        {badgeThreeCheck === true ? badgeThree : ""}
        {OneQuestionAskedCheck === true ? OneQuestionAsked : ""}
        {fiveQuestionsBadgeCheck === true ? fiveQuestionsBadge : ""}
        {TenQuestionBadgeCheck === true ? TenQuestionBadge : ""}
        {FiftyQuestionBadgeCheck === true ? FiftyQuestionBadge : ""}
        {OneAnswerBadgeCheck === true ? OneAnswerBadge : ""}
        {FiveAnswerBadgeCheck === true ? FiveAnswerBadge : ""}
        {TenAnswerBadgeCheck === true ? TenAnswerBadge : ""}
        {/* {FiveAnswerBadgeCheck === true ? FiveAnswerBadge : ""} */}
      </div>
      <br></br>
      <h1>YOUR ACTIVITY</h1>
      <div className={Style.QuestionSection}>{ProfileQuestions}</div>
      <div className={Style.ProfileSection}>
        <ProfileSection />
      </div>
    </div>
  );
};

export default Profile;
