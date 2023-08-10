import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddAnswer from "../../subcomponents/AddAnswer/AddAnswer";
import Answer from "../../subcomponents/Answers/Answers";
import Button from "../../subcomponents/Buttons/Button";
import CodeArea from "../../subcomponents/CodeArea/CodeArea";
import ImagePreview from "../../subcomponents/ImagePreview/ImagePreview";
import LoginAlert from "../../subcomponents/LoginModal/LoginAlert";
import ProfilePic from "../../subcomponents/ProfilePicture/ProfilePic";
import VotingSystem from "../../subcomponents/VotingSystem/VotingSystem";
import Style from "./IndividualQuestion.module.scss";

const IndividualQuestion = () => {
  let location = useLocation();
  let Navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState();
  const [imagePrev, setImagePrev] = useState();
  const [answerModal, setAnswerModal] = useState();
  const [loginAlert, setLoginAlert] = useState();
  const [Answers, setAnswers] = useState();
  const [ShowPreview, setShowPreview] = useState(false);

  let userData = sessionStorage.getItem("UserData");
  let user = JSON.parse(userData);

  const Upvote = useRef();
  const DownVote = useRef();

  const [TotalUpVotes, setTotalUpVotes] = useState(
    location.state.allData.upvotes
  );
  const [TotalDownVotes, setTotalDownVotes] = useState(
    location.state.allData.downvotes
  );
  const [Total, setTotal] = useState(location.state.allData.score);

  const [DownPerc, setDownPerc] = useState();
  const [UpPerc, setUpPerc] = useState();

  const [upvoteColor, setUpvoteColor] = useState(`rgba(0, 200, 145, 1)`);
  const [downolor, setDownColor] = useState(`rgba(253, 30, 74, 1)`);

  const [AlVoted, setAlVoted] = useState(false);

  useEffect(() => {
    let URL =
      "http://localhost:2000/QuestionImages/" + location.state.allData.image;
    setImageUrl(URL);
    setImagePrev(URL);
  }, [location.state.allData.image]);

  useEffect(() => {
    //default
    let downPercentage = 0;
    let upPercentage = 0;

    let TotalSum = TotalDownVotes + TotalUpVotes;

    //voting is the total downvotes and upvotes summed
    //total is the upvotes minus the downvotes
    downPercentage = (TotalDownVotes / TotalSum) * 100;

    upPercentage = (TotalUpVotes / TotalSum) * 100;

    //make sure green or red never disappears
    if (downPercentage === 0) {
      downPercentage = downPercentage + 10;
      upPercentage = upPercentage - 10;
    } else if (upPercentage === 0) {
      downPercentage = downPercentage - 10;
      upPercentage = upPercentage + 10;
    }

    setDownPerc(Math.round(downPercentage));
    setUpPerc(Math.round(upPercentage));

    setTotal(TotalUpVotes - TotalDownVotes);
  }, [TotalUpVotes, TotalDownVotes]);

  //all answers
  useEffect(() => {
    axios.get("http://localhost:2000/api/allAnswers").then((res) => {
      let questionData = res.data;

      let ChildId = location.state.allData._id;

      let renderAnswers = questionData
        .filter((data) => data.ParentQuestionId === ChildId)
        .map((item) => (
          <Answer
            setImageUrl={setImageUrl}
            ShowPreview={ShowPreview}
            setShowPreview={setShowPreview}
            allData={item}
          />
        ));

      setAnswers(renderAnswers);
    });
  }, [answerModal]);

  function updateVote(e) {
    let user = sessionStorage.getItem("UserData");
    let userData = JSON.parse(user);

    if (user === "" || user === null) {
      setLoginAlert(<LoginAlert rerender={setLoginAlert} />);
    } else {
      let data = location.state.allData;
      let quesId = data._id;
      let userId = userData._id;

      axios
        .get("/api/singleUser/" + location.state.allData.userId)
        .then((res) => {
          let updateScore = {
            score: res.data.score,
          };
          axios.get("/api/singleQuestion/" + quesId).then((res) => {
            let data = res.data;

            const found = data.upvoted.find((e) => e === userId);

            if (found) {
              setUpvoteColor(`#46C8A4`);
              setDownColor(`#FD6583`);
              setAlVoted(true);
            } else {
              if (e === "Upvote") {
                setTotalUpVotes(TotalUpVotes + 1);
              } else if (e === "Downvote") {
                setTotalDownVotes(TotalDownVotes + 1);
              }

              //update user score
              if (e === "Upvote") {
                updateScore = {
                  score: res.data.score + TotalUpVotes + 1 - TotalDownVotes,
                  upvotes: +TotalUpVotes + 1,
                  downvotes: +TotalDownVotes,
                };
              } else if (e === "Downvote") {
                updateScore = {
                  score: res.data.score + TotalUpVotes - TotalDownVotes - 1,
                  upvotes: +TotalUpVotes,
                  downvotes: +TotalDownVotes - 1,
                };
              }

              setUpvoteColor(`#46C8A4`);
              setDownColor(`#FD6583`);

              axios.patch(
                "/api/updateUserScore/" + location.state.allData.userId,
                updateScore
              );

              // update Score
              let template = {
                score: +TotalUpVotes - +TotalDownVotes,
                upvotes: +TotalUpVotes,
                downvotes: +TotalDownVotes,
              };

              if (e === "Upvote") {
                template = {
                  score: +TotalUpVotes + 1 - +TotalDownVotes,
                  upvotes: +TotalUpVotes + 1,
                  downvotes: +TotalDownVotes,
                  userId: userData._id,
                };
              } else if (e === "Downvote") {
                template = {
                  score: +TotalUpVotes - +TotalDownVotes + 1,
                  upvotes: +TotalUpVotes,
                  downvotes: +TotalDownVotes + 1,
                  userId: userData._id,
                };
              }

              axios.patch("/api/updateVotes/" + quesId, template);
            }
          });
        });
    }
  }

  const reply = () => {
    if (user === "" || user === null) {
      setLoginAlert(<LoginAlert rerender={setLoginAlert} />);
    } else {
      setAnswerModal(
        <AddAnswer allData={location.state.allData} rerender={setAnswerModal} />
      );
    }
  };

  return (
    <div className={Style.questionBlock}>
      <div onClick={() => Navigate(-1)} className={Style.closeButton}>
        <div className={Style.White}>x</div>
      </div>

      <ImagePreview
        IMG={imageUrl}
        setShowPreview={setShowPreview}
        ShowPreview={ShowPreview}
      />

      {loginAlert}
      {answerModal}

      <div className={Style.questionIntro}>
        <div className={Style.profileImg}>
          <ProfilePic
            ProfilePic={`/ProfileImages/${location.state.allData.userProfileImg}`}
            ProfileIcon={""}
          />
        </div>
        <p className={Style.username}>{location.state.allData.username}</p>
        <br />
        <h2 className={Style.headingQuestion}>
          {location.state.allData.questionTitle}
        </h2>
      </div>

      <div className={Style.questionDetails}>
        <div className={Style.ImageNUp}>
          <div className={Style.Container}>
            <div
              onClick={() => {
                updateVote("Upvote");
              }}
              style={{
                height: `${UpPerc}%`,
                backgroundColor: `${upvoteColor}`,
              }}
              className={Style.GradientUp}
            >
              <div
                ref={Upvote}
                style={{ color: "#5067EB" }}
                className={Style.totalUpNDown}
              >
                {TotalUpVotes}
              </div>
            </div>
            <div className={Style.Middle}>
              {Total}
              <div className={Style.AlreadyUpCon}>
                <div className={AlVoted ? Style.AlreadyUp : "hide"}>
                  Already Voted!
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                updateVote("Downvote");
              }}
              style={{
                height: `${DownPerc}%`,
                backgroundColor: `${downolor}`,
              }}
              className={Style.GradientDown}
            >
              {" "}
              <div
                ref={DownVote}
                style={{ color: "red" }}
                className={Style.totalUpNDown}
              >
                {TotalDownVotes < 0
                  ? `${TotalDownVotes}`
                  : `-${TotalDownVotes}`}
              </div>
            </div>
          </div>
          <div
            onClick={() => setShowPreview(!ShowPreview)}
            className={Style.questionImage}
            style={{ backgroundImage: `url(${imagePrev})` }}
          ></div>
        </div>

        <p className={Style.questionDescription}>
          {location.state.allData.questionDescription}
        </p>

        <br />
        <br />
        <br />

        {location.state.allData.language.toLowerCase()}

        <br />

        <p></p>
        <CodeArea language={location.state.allData.language.toLowerCase()}>
          {location.state.allData.codeSnippet}
        </CodeArea>

        <br />
        <div className={Style.answerSection}>
          <p className={Style.votes}>
            <strong>Upvotes: </strong>
            <b>{location.state.allData.upvotes}</b>
          </p>
          <p className={Style.votes}>
            <strong>Downvotes: </strong>
            <b>{location.state.allData.downvotes}</b>
          </p>

          <Button type="Primary" onClick={reply}>
            Reply
          </Button>
        </div>

        <hr />
        <br />
        <br />

        <br />
        <h2 className={Style.heading}>Answers</h2>
        {Answers}
      </div>
    </div>
  );
};

export default IndividualQuestion;
