import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../subcomponents/Buttons/Button";
import Style from "./LogNReg.module.scss";

const Confirmation = (props) => {
  const Navigate = useNavigate();

  return (
    <div
      ref={props.confirmDiv}
      className={
        props.showConfirm ? Style.ConfirmationStart : Style.Confirmation
      }
    >
      <h3>{props.AreSure}</h3>
      <Button
        onClick={() => {
          Navigate(
            props.AreSure ===
              "Are you sure? You wont be able to ask or answer questions."
              ? "/"
              : "/LogNReg"
          );
          props.setShowConfirm(false);
        }}
        type="Primary"
      >
        Ok
      </Button>
      {props.AreSure ===
      "Are you sure? You wont be able to ask or answer questions." ? (
        <Button
          onClick={() => {
            props.setShowConfirm(!props.showConfirm);
          }}
          type="Primary"
        >
          Cancel
        </Button>
      ) : null}
    </div>
  );
};

export default Confirmation;
