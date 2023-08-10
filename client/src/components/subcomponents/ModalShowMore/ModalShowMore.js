import React, { useEffect, useState } from "react";
//question
import askQuestion from "./images/ask.png";
import addButton from "./images/quesadd.png";
//badges
import badges from "./images/Frame_5_1.jpg";
//answers
import Answers from "./images/screencapture-localhost-3000-IndividualQuestion-2022-11-07-0147.png";
import Style from "./ModalShowMore.module.scss";

const ModalShowMore = (props) => {
  const [ModalData, setModalData] = useState({});

  useEffect(() => {
    if (props.DataType === "Questions") {
      let data = {
        title: "Ask Questions",
        description:
          "Got a question? Ask away! Add your tags so that people can find it, select your language for the code area, add your description as well as add a quick snapshot and finally post ! Now you can just sit back and wait for someone to answer and assist your question with the right solution. Windows Encoded style!",
        image: addButton,
      };

      setModalData(data);
    } else if (props.DataType === "Badges") {
      let data = {
        title: "Earn Badges",
        description:
          "Climb the ranks! When asking questions users will upvote and downvote your questions, based on that voting your profile page will update* including your reliability score, which tells other users you are trustworthy. As you ask questions you will be answered based on the amount of questions and answers you have given. *Scores will be updated on next log in.",
        image: badges,
      };

      setModalData(data);
    } else if (props.DataType === "Answer") {
      let data = {
        title: "Get answers",
        description:
          "Help out your fellow students and pop an answer if you see a question that has not been answered. Click the blue Reply button and be as descriptive as you can be!",
        image: Answers,
      };
      setModalData(data);
    }
  }, [props.DataType]);

  return (
    <div className={props.ShowModal ? Style.Container : "hide"}>
      <div
        className={Style.closeButton}
        onClick={() => props.setShowModal(false)}
      >
        <div>x</div>
      </div>

      <h1>{ModalData.title}</h1>
      <h4>{ModalData.description}</h4>
      <div
        style={{ backgroundImage: `url(${ModalData.image})` }}
        className={Style.Image}
      ></div>
    </div>
  );
};

export default ModalShowMore;
