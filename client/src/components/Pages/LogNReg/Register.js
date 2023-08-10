import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AddImageIcon from "../../../Icons/user-plus.svg";
import ProfilesCard from "../../Cards/ProfilesCard/ProfilesCard";
import Button from "../../subcomponents/Buttons/Button";
import Input from "../../subcomponents/Inputs/Input";
import Style from "./LogNReg.module.scss";

const Register = (props) => {
  //Hide and Show Password
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConType, setPasswordConType] = useState("password");

  const Image = useRef(),
    username = useRef(),
    email = useRef(),
    password = useRef(),
    passwordVal = useRef(),
    RegisterForm = useRef();

  const [PreviewImage, setPreviewImage] = useState(AddImageIcon),
    [PreviewText, setPreviewText] = useState(
      "No image selected, default image will be used."
    ),
    [ProfileID, setProfileID] = useState(""),
    [ShowProfileModal, setShowProfileModal] = useState(false),
    [UsernameValid, setUsernameValid] = useState(""),
    [emailValid, setEmailValid] = useState(""),
    [passwordValid, setPasswordValid] = useState(""),
    [passwordConValid, setpasswordConValid] = useState(""),
    [FormValid, setFormValid] = useState(""),
    [ImageName, setImageName] = useState("Female-1");

  const [UsernameText, setUsernameText] = useState(),
    [EmailText, setEmailText] = useState(),
    [PasswordText, setPasswordText] = useState(),
    [PasswordValText, setPasswordValText] = useState();

  const addUser = (e) => {
    e.preventDefault();

    if (
      UsernameValid &&
      emailValid &&
      passwordVal &&
      passwordConValid &&
      PreviewText !== "No image selected"
    ) {
      setFormValid("");

      let userCreds = {
        email: email.current.value,
        username: username.current.value,
        accStatus: false,
        password: password.current.value,
        profile: ProfileID,
        score: 50,
        admin: false,
      };

      axios
        .post("/register", userCreds)
        .then((res) => {
          if (res.data.exists) {
            setFormValid(
              <p
                onClick={() => {
                  props.setChangeCard(!props.changeCards);
                  RegisterForm.current.reset();
                }}
              >
                User already exists, click here to log in
              </p>
            );
          } else {
            RegisterForm.current.reset();
            props.setChangeCard(!props.changeCards);
            props.setShowConfirm(true);
          }
          // setRender(prev => !prev)
        })
        .catch((err) => {});

      // // props.setShow(false);
    } else {
      if (PreviewText === "No image selected") {
        setFormValid(
          "Make sure you select an image and all the fields have green circles"
        );
      } else {
        setFormValid("Make sure all the fields have green circles");
      }
    }
  };

  //Validation
  const FormValues = () => {
    // passwordVal.current.onpaste = e => e.preventDefault();
    //Username
    if (
      username.current.value.length !== 6 &&
      username.current.value.length <= 6
    ) {
      setUsernameValid(false);
      setUsernameText("Username needs to be 6 characters long");
    } else {
      setUsernameValid(true);
    }
    if (username.current.value === "") {
      setUsernameValid("");
    }

    //Email
    let Emailregex = new RegExp("[0-9]+@virtualwindow.co.za");
    if (!Emailregex.test(email.current.value)) {
      setEmailValid(false);
      setEmailText(
        "Please enter your student email (Student number + virtualwindow.co.za)"
      );
    } else {
      setEmailValid(true);
    }

    if (email.current.value === "") {
      setEmailValid("");
    }

    //Password
    let Passregex = new RegExp(
      "^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$"
    );
    if (!Passregex.test(password.current.value)) {
      setPasswordValid(false);
      setPasswordText(
        "Min 8 characters, 1 number, 1 uppercase and one special character"
      );
    } else {
      setPasswordValid(true);
    }

    if (password.current.value === "") {
      setPasswordValid("");
    }

    //Confirm Password
    if (password.current.value !== passwordVal.current.value) {
      setpasswordConValid(false);
      setPasswordValText("Passwords do not match");
    } else {
      setpasswordConValid(true);
    }

    if (passwordVal.current.value === "") {
      setpasswordConValid("");
    }
  };

  useEffect(() => {
    setShowProfileModal(false);
    // setPreviewText("");
  }, [PreviewImage]);

  return (
    <>
      <ProfilesCard
        ShowProfileModal={ShowProfileModal}
        setShowProfileModal={setShowProfileModal}
        setImageName={setImageName}
        setPreviewText={setPreviewText}
        setPreviewImage={setPreviewImage}
        setProfileID={setProfileID}
      />
      <div className={props.changeCards ? Style.SignupBack : Style.Signup}>
        <h1 className={Style.Spacing}>Register!</h1>
        <form ref={RegisterForm} onChange={FormValues} className={Style.Form}>
          <div
            onClick={() => {
              setShowProfileModal(!ShowProfileModal);
            }}
            className={Style.Preview}
            style={{ backgroundImage: `url(${PreviewImage})` }}
          ></div>
          <p>
            <b>{PreviewText}</b>
          </p>
          <Input
            ref={username}
            text={UsernameText}
            Valid={UsernameValid}
            required="true"
            placeholder="Username"
            Intype="Login"
          />
          <div className={Style.InSpacing}></div>
          <Input
            ref={email}
            text={EmailText}
            Valid={emailValid}
            required="true"
            placeholder="Email"
            Intype="Login"
          />
          <div className={Style.InSpacing}></div>
          <Input
            setPasswordType={setPasswordType}
            passwordType={passwordType}
            type={passwordType}
            ref={password}
            text={PasswordText}
            Valid={passwordValid}
            required="true"
            placeholder="Password"
            Intype="Login"
          />
          <div className={Style.InSpacing}></div>
          <Input
            setPasswordType={setPasswordConType}
            passwordType={passwordConType}
            type={passwordConType}
            ref={passwordVal}
            text={PasswordValText}
            Valid={passwordConValid}
            required="true"
            className={Style.Spacing}
            placeholder="Confirm Password"
            Intype="Login"
          />
          <div className={Style.Spacing}></div>
          <p className={Style.Red}>{FormValid}</p>
          <Button onClick={addUser} type="Primary">
            Register
          </Button>
          <br></br>
          <p
            className={Style.Cursor}
            onClick={() => {
              props.setChangeCard(!props.changeCards);
            }}
          >
            Already have an account? Login now!
          </p>
        </form>
      </div>

      <div
        className={props.changeCards ? Style.SignupTextBack : Style.SignupText}
      >
        <h2>About WindowsEncoded</h2>
        <p>Aut inventore consequuntur et rerum doloremque.</p>
        <ul>
          <li>Ask Questions</li>
          <li>Get Answers</li>
          <li>Answers Questions</li>
          <li>Profile Progression</li>
          <li>Earn badges</li>
        </ul>
        <p>Completely anonymous!</p>
        <p>Only Requirement is an OW account</p>
      </div>
    </>
  );
};

export default Register;
