/* eslint-disable no-template-curly-in-string */
import React from "react";
import Style from "./ProfilePic.module.scss";

const ProfilePic = (props) => {
  return (
    <div className={Style.ProfileContainer}>
      <div
        className={Style.Picture}
        style={{
          backgroundImage: `url(${props.ProfilePic})`,
        }}
      >
        <div
          className={Style.Icon}
          style={{
            backgroundImage: `url(${props.ProfileIcon})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProfilePic;
