import React from "react";
import Style from "../ProfileCard.module.scss";

const ProfileImg = (props) => {
  let Name = props.data.imageName;
  Name = Name.slice(0, -4);
  return (
    <div
      onClick={() => {
        props.setProfileSelection(Name);
        props.setProfileID(props.data.imageLocation);
        props.setPreviewImage(props.IMG);
        // props.setShowModal(!props.showModal);
        props.setRender((prev) => !prev);
      }}
      className={Style.PfBlock}
      style={{
        backgroundImage: `url(${props.IMG})`
      }}
    >
      {/* {props.data} */}
    </div>
  );
};

export default ProfileImg;