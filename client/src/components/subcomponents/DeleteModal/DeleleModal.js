import React from "react";
import Button from "../Buttons/Button";
import Style from "./DeleteModal.module.scss";
import axios from "axios";

const DeleteModal = (props) => {
  const noThanks = () => {
    props.rerender();
  };

  const deleteQuestion = () => {
    axios
      .delete("/api/deleteQuestion/" + props.questionId)
      .then((res) => {
        props.rerender();
        alert(
          "Your Question has been Deleted! You will see changes on your next visit to the profile page!!"
        );
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

export default DeleteModal;
