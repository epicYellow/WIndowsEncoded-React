import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FlaggedQuestions from '../FlaggedQuestions/FlaggedQuestions';
import Style from "./Admin.module.scss";


const Admin = (props) => {

    const [Flagged, setFlagged] = useState();
    
    useEffect(() => {
       
          axios.get("/api/allQuestions").then((res) => {
            let data = res.data;            

            const flagged = data.filter(data => data.reported)
            

           let rendeFlagged = flagged.map((item) => (
            <FlaggedQuestions
                key={item._id}
                QuesId={item._id}
                alldata={item}
            />
           ));

           setFlagged(rendeFlagged)
          });
       
      }, []);

      

    return (
        <div className={props.AdminModal ? "hide" : Style.BackgroundBlur}>
            <div className={Style.close} onClick={() => {props.setAdminModal(true)}}>X</div>
            
            <div className={Style.Modal}>
            <h1 className={Style.flaggedName}>Flagged Questions</h1>
                
                {Flagged}

            </div>
        </div>
    );
};

export default Admin;