import axios from "axios";
import React, { useRef, useState } from "react";
import Button from "../../subcomponents/Buttons/Button";
import LoginAlert from "../LoginModal/LoginAlert";
import Style from "./AddAnswer.module.scss";

const AddAnswer = (props) => {
  let userData = sessionStorage.getItem("UserData");
  let user = JSON.parse(userData);
  const [answer, setAnswer] = useState();
  const [answerImage, setAnswerImage] = useState();
  const [imageName, setImageName] = useState("Upload a file");
  const [Valid, setValid] = useState("");

  const Form = useRef();
  const Image = useRef();
  const Desc = useRef();
  const Code = useRef();
  const LangSelect = useRef();

  const closeModal = () => {
    props.rerender();
  };

  const answerInfo = (e) => {
    const { name, value } = e.target;
    setAnswer({ ...answer, [name]: value });
  };

  const getImage = (e) => {
    let imageFile = e.target.files[0];
    setAnswerImage(imageFile);

    let value = e.target.value;
    let imageName = value.substring(12);
    setImageName(imageName);

    let reader = new FileReader();
    reader.onload = () => {
      let output = document.getElementById("prev_img");
      output.src = reader.result;
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const addAnswer = (e) => {
    e.preventDefault();
    if (
      Form.current.value === "undefined" ||
      Image.current.value === "" ||
      Desc.current.value === "" ||
      Code.current.value === "" ||
      LangSelect.current.value === "Please Select the Language..."
    ) {
      setValid("Please make sure to fill in all the fields");
    } else {
      const payloadData = new FormData();

      let payload = {
        Answers: {
          userId: user._id,
          ParentQuestionId: props.allData._id,
          username: user.username,
          answerDescription: answer.answerDescription,
          codeSnippet: answer.codeSnippet,
          language: LangSelect.current.value,
        },
      };

      payloadData.append("information", JSON.stringify(payload));
      payloadData.append("image", answerImage);

      for (let [key, value] of payloadData) {
        console.log(`${key}: ${value}`);
      }
      setValid("");
      axios.post("/api/newAnswer", payloadData).then((res) => {
        if (res) {
          props.rerender();
        }
      });
    }
  };

  return (
    <div className={Style.BackgroundBlur}>
      <div className={Style.addAnswerCard}>
        <div className={Style.closeButton} onClick={closeModal}>
          <div>x</div>
        </div>

        <form ref={Form}>
          <h2>Add a Answer</h2>

          <div className={Style.PfBlockUp}>
            <div className={Style.upload_btn_wrapper}>
              <img id="prev_img" />
              <button className={Style.btn}>{imageName}</button>
              <input ref={Image} type="file" name="image" onChange={getImage} />
            </div>
          </div>

          <textarea
            className={Style.textBox}
            name="answerDescription"
            ref={Desc}
            onChange={answerInfo}
            placeholder="eg. Set your imported component that you wish to use in your useState"
          ></textarea>
          <p>Explain your answer in detail. Be specific.</p>

          <select ref={LangSelect} name="language">
            <option>Please Select the Language...</option>
            <option>Javascript</option>
            <option>PHP</option>
            <option>Swift</option>
            <option>Kotlin</option>
          </select>

          <textarea
            className={Style.codeBox}
            name="codeSnippet"
            ref={Code}
            onChange={answerInfo}
            placeholder="eg. setModal(<Modal/>);"
          ></textarea>
          <p>Add your code here</p>

          <Button type="Primary" onClick={addAnswer}>
            Add Answer
          </Button>
          <br />
          <br />
          <h3 className={Style.TextRed}>{Valid}</h3>
        </form>
      </div>
    </div>
  );
};

export default AddAnswer;
