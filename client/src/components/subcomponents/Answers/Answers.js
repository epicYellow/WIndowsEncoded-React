import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeArea from "../CodeArea/CodeArea";
import ImagePreview from "../ImagePreview/ImagePreview";
import VotingSystem from "../VotingSystem/VotingSystem";
import Style from "./Answers.module.scss";

const Answer = (props) => {
  const [ShowPreview, setShowPreview] = useState(false);

  let data = props.allData;
  console.log(props.allData);

  return (
    <>
      <ImagePreview
        IMG={`/QuestionImages/${data.image}`}
        setShowPreview={setShowPreview}
        ShowPreview={ShowPreview}
      />

      <div className={Style.Answer}>
        <VotingSystem className={Style.left} />
        <div
          onClick={() => {
            props.setShowPreview(!props.ShowPreview);
            props.setImageUrl(`/QuestionImages/${data.image}`);
          }}
          style={{
            backgroundImage: `url(${`/QuestionImages/${data.image}`})`,
          }}
          className={Style.QuesImage}
        ></div>
        <div>
          <p className={Style.answerText}>
            <strong className={Style.username}>{data.username}:</strong>
            {data.answerDescription}
          </p>
          <div className={Style.CodeContainer}>
            <CodeArea language={data.language.toLowerCase()}>
              {data.codeSnippet}
            </CodeArea>
            <p>({data.language.toLowerCase()})</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Answer;
