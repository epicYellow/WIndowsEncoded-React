import React, { useEffect, useState } from "react";
import ModalShowMore from "../../subcomponents/ModalShowMore/ModalShowMore";
import Style from "./Landing.module.scss";

const Landing = () => {
  const [displayText, setDisplayText] = useState();
  const [profile, setProfile] = useState();
  const [ForYou, setForYou] = useState();
  const [DataType, setDataType] = useState();
  const [ShowModal, setShowModal] = useState(false);

  useEffect(() => {
    let seshStorage = JSON.parse(sessionStorage.getItem("UserData"));
    if (
      seshStorage === "undefined" ||
      seshStorage === null ||
      seshStorage === ""
    ) {
      setForYou("About us");
      setDisplayText("User");
    } else {
      setDisplayText(seshStorage.username);
      setProfile(`http://localhost:2000/ProfileImages/${seshStorage.profile}`);
    }
  }, []);

  return (
    <div className={Style.body}>
      <ModalShowMore
        DataType={DataType}
        ShowModal={ShowModal}
        setShowModal={setShowModal}
      />
      <div className={Style.LandingArea}>
        <div
          className={Style.Block}
          style={{ backgroundImage: `url(${profile})` }}
        ></div>
        <div className={Style.LanContent}>
          <h2 className={Style.heading}>Hello, {displayText}!</h2>
          <p className={Style.Paragraph}>
            <h3>Welcome to windows Encoded</h3>
            The best online platfrom from dev students for dev students! Ask any
            and answer development related questions.
            <br />
            <br />
            Play fair, help out fellow developers, upvote and downvote, earn and
            display your badges on your profile
            <br />
            If you are top rated you may even get the status of being an admin !
          </p>
        </div>
      </div>
      <br></br>

      <hr className={Style.Line}></hr>

      <h1 className={Style.Heading}>For you</h1>

      <div className={Style.Row}>
        <div
          onClick={() => {
            setShowModal(true);
            setDataType("Questions");
          }}
          className={`${Style.Container} ${Style.ContainerImageOne}`}
        >
          <h2 className={Style.text}>Ask Questions</h2>
        </div>

        <div
          onClick={() => {
            setShowModal(true);
            setDataType("Answer");
          }}
          className={`${Style.Container} ${Style.ContainerImageTwo}`}
        >
          <h2>Answer Questions</h2>
        </div>
        <div
          onClick={() => {
            setShowModal(true);
            setDataType("Badges");
          }}
          className={`${Style.Container} ${Style.ContainerImageThree}`}
        >
          <h2>Earn Badges</h2>
          <div className={Style.badge}></div>
        </div>
      </div>
      <br></br>

      <h1 className={Style.Heading}>Learn More</h1>

      <div className={Style.Row}>
        <div className={Style.Container}>
          <a
            href="https://www.w3schools.com/html/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={Style.ImageOne}></div>
            <h2>HTML</h2>
          </a>
        </div>

        <div className={Style.Container}>
          <a
            href="https://www.w3schools.com/js/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={Style.ImageTwo}></div>
            <h2>Javascript</h2>
          </a>
        </div>

        <div className={Style.Container}>
          <a
            href="https://www.w3schools.com/REACT/DEFAULT.ASP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={Style.ImageThree}></div>
            <h2>React</h2>
          </a>
        </div>

        <div className={Style.Container}>
          <a
            href="https://www.w3schools.com/css/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={Style.ImageFour}></div>
            <h2>Css</h2>
          </a>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default Landing;
