import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionCard from "../../Cards/QuestionCard/QuestionCard";
import SearchCard from "./SearchCard";
import Style from "./SearchResult.module.scss";

const SearchResult = (props) => {
  const [Card, setCard] = useState();
  const [Count, setCount] = useState(0);

  var search = props.ResultData;
  let firstLetterUpper = search.slice(0, 1).toUpperCase();

  let Result = firstLetterUpper + search.slice(1, search.length).toLowerCase();

  useEffect(() => {
    axios.get("/api/allQuestions").then((res) => {
      let data = res.data;

      console.log(props.Loaded);

      let searchCard = data
        .filter((val) => {
          if (search === "") {
            return val;
          } else if (
            val.questionTitle.toLowerCase().includes(search.toLowerCase()) ||
            val.questionDescription.toLowerCase().includes(search.toLowerCase())
          ) {
            setCount(val.length);
            return val;
          }
        })
        .map((item) => (
          <div onClick={() => props.setResultsModal(false)}>
            <QuestionCard
              key={item._id}
              userId={item.userId}
              username={item.username}
              questionId={item._id}
              questionTitle={item.questionTitle}
              questionDescription={item.questionDescription}
              codeSnippet={item.codeSnippet}
              language={item.language}
              image={URL + item.image}
              allData={item}
            />
          </div>
        ));

      setCard(searchCard);
      console.log(searchCard.length);

      if (searchCard.length === 1) {
        setCount(searchCard.length + " Result");
      } else if (searchCard.length > 1) {
        setCount(searchCard.length + " Results");
      } else if (searchCard.length < 1) {
        setCount(searchCard.length + " Results");
      }
      props.setLoaded("NotLoading");
    });
  }, [props, props.ResultData, search]);

  return (
    <div
      className={props.ResultsModal ? Style.Container : Style.ContainerClosed}
    >
      <h3>
        Showing Results For: <u className={Style.Underline}>{Result}</u>
      </h3>
      <p>{Count}</p>
      <div
        className={props.Loaded === "NotLoading" ? null : Style.Loading}
      ></div>
      <hr></hr>

      <div className={Style.ResultContainer}>{Card}</div>
    </div>
  );
};

export default SearchResult;
