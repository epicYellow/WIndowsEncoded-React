import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "./components/subcomponents/Buttons/Button";
import Style from "./Auth.module.scss"

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [welcome, setWelcome] = useState();
  const [message, setMessage] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .patch("http://localhost:2000/api/validate/" + searchParams.get("id"))
      .then((res) => {
        console.log(res.data);

        if (res.data.success) {
          setWelcome("Welcome " + res.data.user + "!");
          setMessage("Your account has been verified");
          sessionStorage.setItem("UserData", JSON.stringify(res.data.data));
        } else {
          setWelcome("Account not verified");
          setMessage(
            "There was a problem verifying your account, place conctact system admin"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>{welcome}</h1>
      <div className={Style.img}></div>
      <p>{message}</p>
      <Button onClick={() => Navigate("/")} type="Primary">
        Continue to site
      </Button>
    </div>
  );
};

export default Auth;
