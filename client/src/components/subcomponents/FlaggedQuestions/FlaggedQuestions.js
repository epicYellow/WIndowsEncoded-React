import axios from 'axios';
import React, { useState } from 'react';
import FlaggedModal from './FlaggedModal';
import Style from "./FlaggedQuestions.module.scss";


const FlaggedQuestions = (props) => {
    // console.log(props);

    const [FlagDeleteModal, setFlagDeleteModal] = useState();

    // console.log(props.alldata);
    // AllData = props.alldata;
    let flaggedData = props.alldata;
    // console.log(flaggedData.questionTitle);

    let QuestionId = props.QuesId;
    // console.log(QuestionId);
    const deleteAltert = () => {
        setFlagDeleteModal(<FlaggedModal rerender={setFlagDeleteModal} questionId={QuestionId}/>);
    }

   

    return (
        <div className={Style.FlaggedQuestionAdmin}>
            
            <h5 className={Style.Username}>{flaggedData.username}</h5>
            <h1 className={Style.Title}>{flaggedData.questionTitle}</h1>   
            {/* <div className={Style.flaggedTag}>{flaggedData.language}</div>  */}
            <div className={Style.deleteButton} onClick={deleteAltert}></div>

            {/* <div className={Style.Delete}>delete</div> */}
            {FlagDeleteModal}
            
            
        </div>
    );
};

export default FlaggedQuestions;