import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal/DeleleModal";
import EditQuestion from "../EditQuestion/EditQuestion";
import QuestionTag from "../QuestionTag/QuestionTag";
import Style from "./ProfileQuestion.module.scss";

const ProfileQuestion = (props) => {
  let QuesData = props.alldata;

  const [deleteModal, setDeleteModal] = useState();
  const [editModal, setEditModal] = useState();

  const [tagDisp, setTagDisp] = useState();

  const deleteAltert = () => {
    setDeleteModal(
      <DeleteModal rerender={setDeleteModal} questionId={QuesData._id} />
    );
  };

  const editQuestion = () => {
    setEditModal(
      <EditQuestion rerender={setEditModal} allQuestionData={QuesData} />
    );
  };

  useEffect(() => {
    let tags = QuesData.tags.map((data) => (
      <div className={Style.tag}>{data}</div>
    ));
    console.log(tags);
    setTagDisp(tags);
  }, []);

  return (
    <>
      {deleteModal}
      {editModal}
      <div className={Style.ProfQ}>
        <h1 className={Style.Qtitle}>{QuesData.questionTitle}</h1>

        <div className={Style.TagSection}>{tagDisp}</div>

        <div className={Style.DeleteButton} onClick={deleteAltert}></div>
        <div className={Style.EditButton} onClick={editQuestion}></div>
      </div>
    </>
  );
};

export default ProfileQuestion;
