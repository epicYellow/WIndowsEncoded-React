import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProfileTemp from "../../../Img/LogInIllustration.jpg";
import Button from "../../subcomponents/Buttons/Button";
import Style from "./ProfileCard.module.scss";
import ProfileImg from "./ProfileSelect/ProfileImg";

const ProfilesCard = (props) => {
  const [ProfileSelection, setProfileSelection] = useState("No image selected");
  const [display, setDisplay] = useState("One");
  const [render, setRender] = useState("lol");
  const [Images, setImages] = useState();
  let tempData = ["One", "Two", "Three", "Four"];

  //   console.log(ProfileSelection);
  useEffect(() => {
    console.log(ProfileSelection);
    props.setImageName(ProfileSelection);
    props.setPreviewText(ProfileSelection);
    console.log("this one ran");
    // props.setShowProfileModal(!props.ShowProfileModal);
  }, [render]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/allProfiles/")
      .then((res) => {
        let data = res.data;

        let URL = `http://localhost:2000/ProfileImages/`;

        let images = data.map((item) => (
          <ProfileImg
            setRender={setRender}
            setProfileID={props.setProfileID}
            data={item}
            setPreviewImage={props.setPreviewImage}
            setProfileSelection={setProfileSelection}
            IMG={URL + item.imageLocation}
            setShowModal={props.setShowProfileModal}
            showModal={props.ShowProfileModal}
          />
        ));

        setImages(images);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div
        onClick={() => {
          props.setShowProfileModal(!props.ShowProfileModal);
        }}
        className={props.ShowProfileModal ? Style.Modal : "hide"}
      ></div>
      <div className={props.ShowProfileModal ? Style.SelectModal : "hide"}>
        <h1>Select Profile Picture</h1>
        <div className={Style.Container}>{Images}</div>
        <br></br>
        <br></br>
        <br></br>
        <Button
          onClick={() => {
            props.setShowProfileModal(!props.ShowProfileModal);
          }}
          type="Secondary"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default ProfilesCard;
