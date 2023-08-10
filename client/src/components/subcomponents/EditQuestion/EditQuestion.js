import axios from "axios";
import React, { useState } from "react";
import Button from "../../subcomponents/Buttons/Button";
import Input from "../Inputs/Input";
import Style from "./EditQuestion.module.scss";

const EditQuestion = (props) => {
  const closeModal = () => {
    props.rerender();
  };

  let questionData = props.allQuestionData;

  let editFormValues = {
    questionTitle: questionData.questionTitle,
    questionDescription: questionData.questionDescription,
    language: questionData.language,
    codeSnippet: questionData.codeSnippet,
  };

  const [editValues, setEditValues] = useState(editFormValues);

  const updateValues = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const updateQuestion = (e) => {
    e.preventDefault();
    let questionId = questionData._id;

    axios
      .patch("/api/updateQuestion/" + questionId, editValues)
      .then((res) => {
        if (res) {
          props.rerender();
          props.setUpdateRender(!props.updateRender);

          alert(
            "Your Question has been edited! You will see changes on your next visit to the profile page!"
          );
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className={Style.BackgroundBlur}>
      <div className={Style.EditQuestionCard}>
        <div className={Style.closeButton} onClick={closeModal}>
          <div>x</div>
        </div>

        <form>
          <h2>Edit a Question</h2>

          <Input
            Intype="ModalInput"
            name="questionTitle"
            defaultValue={questionData.questionTitle}
            onChange={updateValues}
          />

          <p>Edit a brief description of your Question</p>

          <textarea
            className={Style.textBox}
            defaultValue={questionData.questionDescription}
            name="questionDescription"
            onChange={updateValues}
          ></textarea>
          <p>Explain your question in detail. Be specific.</p>

          <select name="language" onChange={updateValues}>
            <option selected={questionData.language}>
              {questionData.language}
            </option>
            <option>Javascript</option>
            <option>PHP</option>
            <option>Swift</option>
            <option>Kotlin</option>
          </select>

          <textarea
            className={Style.codeBox}
            name="codeSnippet"
            defaultValue={questionData.codeSnippet}
            onChange={updateValues}
          ></textarea>
          <p>Add your code here</p>

          {/* TODO: Edit Tags */}

          <Button
            className={Style.Auto}
            type="Primary"
            onClick={updateQuestion}
          >
            Edit Question
          </Button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
