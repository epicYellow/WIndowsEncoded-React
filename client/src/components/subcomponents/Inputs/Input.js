import React, { forwardRef, useState } from "react";
import Hover from "./Hover";
import Style from "./Input.module.scss";

const Input = forwardRef(({ ...props }, ref) => {
  const [HoverShow, setHoverShow] = useState(false);

  const togglePassword = () => {
    if (props.passwordType === "password") {
      props.setPasswordType("text");
      return;
    }
    props.setPasswordType("password");
  };

  return (
    <div className={`${Style.InputWidth} ${props.className}`}>
      <input
        name={props.name}
        ref={ref}
        onChange={props.onChange}
        required={props.required}
        type={props.type}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        className={`${props.className ? props.className : ""} ${
          props.Intype === "Search"
            ? Style.Search
            : props.Intype === "Login"
            ? Style.Login
            : props.Intype === "ModalInput"
            ? Style.ModalInput
            : ""
        }`}
      />
      <div className={props.Intype === "Search" ? Style.Icon : "hide"}></div>
      <div
        onMouseEnter={() => setHoverShow(true)}
        onMouseLeave={() => setHoverShow(false)}
        className={
          props.Valid === true
            ? Style.Valid
            : props.Valid === false
            ? Style.InValid
            : ""
        }
      >
        <Hover text={props.text} Hover={HoverShow} />
      </div>
      <div
        onClick={togglePassword}
        className={
          props.type === "password"
            ? Style.eyeClosed
            : props.type === "text"
            ? Style.eyeOpen
            : "hide"
        }
      >
        {" "}
      </div>
    </div>
  );
});

export default Input;
