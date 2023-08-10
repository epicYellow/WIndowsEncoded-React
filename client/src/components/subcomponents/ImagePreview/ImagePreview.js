import React from "react";
import Button from "../Buttons/Button";
import Style from "./ImagePreview.module.scss";

const ImagePreview = (props) => {
  return (
    <div className={props.ShowPreview ? Style.ContainerImage : "hide"}>
      <div
        className={Style.Image}
        style={{
          backgroundImage: `url(${props.IMG})`,
        }}
      ></div>
      <Button
        onClick={() => props.setShowPreview(!props.ShowPreview)}
        type="Primary"
      >
        Close
      </Button>
    </div>
  );
};

export default ImagePreview;
