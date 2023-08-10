import React from "react";
import Button from "../Buttons/Button";
import { useNavigate } from 'react-router-dom';
import Style from "./LoginAlert.module.scss";

const LoginAlert = (props) => {

  let navigate = useNavigate();

  const viewQuestion = () => {
    navigate('/LogNReg');
  }

  const closeModal = () => {
    props.rerender();
  };

  return (
    <div className={Style.BackgroundBlur}>
      <div className={Style.loginAlert}>
        <div className={Style.closeButton} onClick={closeModal}>
          <div>x</div>
        </div>

        <h2>Please Login first.</h2>
        <Button type="Primary" onClick={viewQuestion}>Login</Button>
      </div>
    </div>
  );
};

export default LoginAlert;
