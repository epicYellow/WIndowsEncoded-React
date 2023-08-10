import React from "react";
import Style from "./SearchResult.module.scss";

const SearchCard = (props) => {
  console.log(props.allData.questionTitle);
  return <div className={Style.ResultCard}>{props.allData.questionTitle}</div>;
};

export default SearchCard;
