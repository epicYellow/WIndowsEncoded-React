import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import LoginAlert from "../../subcomponents/LoginModal/LoginAlert";
import ProfilePic from "../../subcomponents/ProfilePicture/ProfilePic";
import Style from "./QuestionCard.module.scss";

const QuestionCard = (props) => {
  let navigate = useNavigate();

  const Upvote = useRef();
  const DownVote = useRef();

  const [TotalUpVotes, setTotalUpVotes] = useState(props.allData.upvotes);
  const [TotalDownVotes, setTotalDownVotes] = useState(props.allData.downvotes);
  const [Total, setTotal] = useState(10);
  const [Reported, setReported] = useState(false);
  const [TagDisp, setTagDisp] = useState();

  const [loginAlert, setLoginAlert] = useState();

  const [DownPerc, setDownPerc] = useState();
  const [UpPerc, setUpPerc] = useState();

  const [upvoteColor, setUpvoteColor] = useState(`rgba(0, 200, 145, 1)`);
  const [downolor, setDownColor] = useState(`rgba(253, 30, 74, 1)`);

  const [AlVoted, setAlVoted] = useState(false);

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

  useEffect(() => {
    let tags = props.allData.tags.map((data) => (
      <div className={Style.tag}>{data}</div>
    ));
    setTagDisp(tags);
  }, []);

  function updateVote(e) {
    let user = sessionStorage.getItem("UserData");
    let userData = JSON.parse(user);

    if (user === "" || user === null) {
      setLoginAlert(<LoginAlert rerender={setLoginAlert} />);
    } else {
      let data = props.allData;
      let quesId = data._id;
      let userId = userData._id;

      axios.get("/api/singleUser/" + props.userId).then((res) => {
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
                upvotes: +res.data + 1,
                downvotes: +TotalDownVotes,
              };
            } else if (e === "Downvote") {
              updateScore = {
                score: res.data.score + TotalUpVotes - TotalDownVotes - 1,
                upvotes: +TotalUpVotes,
                downvotes: +TotalDownVotes + 1,
              };
            }

            setUpvoteColor(`#46C8A4`);
            setDownColor(`#FD6583`);

            axios.patch(
              "/api/updateUserScore/" + props.allData.userId,
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

  const viewQuestion = () => {
    sessionStorage.setItem("questionId", props.productId);
    navigate("/IndividualQuestion", { state: { allData: props.allData } });
  };

  return (
    <div className={Style.QuestionCard}>
      {loginAlert}

      <div onClick={viewQuestion} className={Style.Left}>
        <div className={Style.profileImg}>
          <ProfilePic
            ProfilePic={`/ProfileImages/${props.allData.userProfileImg}`}
            ProfileIcon={""}
          />
        </div>
        <p className={Style.username}>{props.username}</p>

        <br />

        <h2 className={Style.heading}>{props.questionTitle}</h2>

        <p className={Style.questionDescription}>{props.questionDescription}</p>

        {/* <div className={Style.tag}>JavaScript</div> */}

        {TagDisp}
      </div>
      <div className={Style.Right}>
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
              <div
                onClick={() => setAlVoted(false)}
                className={AlVoted ? Style.AlreadyUp : "hide"}
              >
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
              {TotalDownVotes < 0 ? `${TotalDownVotes}` : `-${TotalDownVotes}`}
            </div>
          </div>
        </div>
      </div>
      <div
        className={Style.Report}
        onClick={() => {
          axios
            .patch("/api/report/" + props.allData._id)
            .then((res) => {
              setReported(true);
            })
            .catch((err) => {});
        }}
      ></div>
      <div className={Style.AlreadyUpCon}>
        <div
          onClick={() => setReported(false)}
          className={Reported ? Style.Reported : "hide"}
        >
          Reported
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
