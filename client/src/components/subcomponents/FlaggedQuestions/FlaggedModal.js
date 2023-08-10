import axios from "axios";
import React from "react";
import Button from "../Buttons/Button";
import Style from "./FlaggedModal.module.scss";

const FlaggedModal = (props) => {
  console.log(props);

  const noThanks = () => {
    props.rerender();
  };

  const deleteQuestion = () => {
    axios
      .delete("/api/deleteQuestion/" + props.questionId)
      .then((res) => {
        // props.rerender();
        // window.confirm("Are you sure you want to delete this question ?")
        alert("Your Question has been Deleted");
        props.rerender();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className={Style.BackgroundBlur}>
      <div className={Style.DeleteModal}>
        <div className={Style.Warning}></div>

        <h2>Are you sure you want to delete this question?</h2>
        <Button type="Primary" onClick={noThanks}>
          No, thanks
        </Button>
        <button className={Style.WarningButton} onClick={deleteQuestion}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FlaggedModal;
