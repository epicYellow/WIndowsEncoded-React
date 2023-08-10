import React from "react";
import Style from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      type={props.ButtType}
      onClick={props.onClick}
      className={`${props.className ? props.classname : ""} ${
        props.type === "Primary"
        ? Style.primary
        : props.type === "Secondary"
        ? Style.secondary
        : Style.tertiary
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
