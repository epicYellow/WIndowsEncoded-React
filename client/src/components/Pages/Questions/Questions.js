import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import QuestionCard from "../../Cards/QuestionCard/QuestionCard";
import AddQuestion from "../../subcomponents/AddQuestion/AddQuestion";
import Button from "../../subcomponents/Buttons/Button";
import LoginAlert from "../../subcomponents/LoginModal/LoginAlert";
import Style from "./Questions.module.scss";

const Questions = (props) => {
  const [addQuestionModal, setAddQuestionModal] = useState();
  const [questions, setQuestions] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [renderQuestions, setRenderQuestions] = useState(false);
  const [Filter, setFilter] = useState([]);
  const [loginAlert, setLoginAlert] = useState();
  const [updateRender, setUpdateRender] = useState(false);
  const [Updated, setUpdated] = useState("Not Updated");
  const [rerender, setRerender] = useState();

  const SortBy = useRef();
  const FormValues = useRef();

  const addQuestion = () => {
    let user = sessionStorage.getItem("UserData");

    if (user === "" || user === null) {
      setLoginAlert(<LoginAlert rerender={setLoginAlert} />);
    } else {
      setAddQuestionModal(
        <AddQuestion
          updateRender={updateRender}
          setUpdateRender={setUpdateRender}
          rerender={setAddQuestionModal}
        />
      );
    }
  };

  useEffect(() => {
    axios
      .get("/api/allQuestions")
      .then((res) => {
        let questionData = res.data.reverse();
        let Sort = SortBy.current.value;
        let sortData = res.data.reverse();

        setUpdated("Not Updated");

        if (Sort === "Most recent") {
          sortData = res.data.reverse();
        } else if (Sort === "By highest score") {
          sortData = questionData.sort((x, y) => y.score - x.score);
        } else if (Sort === "By lowest score") {
          sortData = questionData.sort((x, y) => x.score - y.score);
        } else if (Sort === "By lowest upvotes") {
          sortData = questionData.sort((x, y) => x.upvotes - y.upvotes);
        } else if (Sort === "By highest upvotes") {
          sortData = questionData.sort((x, y) => y.upvotes - x.upvotes);
        } else if (Sort === "By lowest downvotes") {
          sortData = questionData.sort((x, y) => x.downvotes - y.downvotes);
        } else if (Sort === "By highest downvotes") {
          sortData = questionData.sort((x, y) => y.downvotes - x.downvotes);
        }

        let FilterBy = [];

        Array.from(FormValues.current.elements).forEach((element) => {
          if (element.checked) {
            FilterBy.push(element.value);
          }
        });

        let FiteredData = questionData;

        //Vian is boyfriend
        if (FilterBy.length === 0) {
          FiteredData = FiteredData;
        } else {
          FiteredData = questionData.filter((x) =>
            FilterBy.some((filter) => x.tags.includes(filter))
          );
        }

        let renderQuestions = FiteredData.map((item) => (
          <QuestionCard
            key={item._id}
            userId={item.userId}
            username={item.username}
            questionId={item._id}
            questionTitle={item.questionTitle}
            questionDescription={item.questionDescription}
            codeSnippet={item.codeSnippet}
            language={item.language}
            image={URL + item.image}
            editRender={setRenderQuestions}
            allData={item}
          />
        ));

        setQuestions(renderQuestions);
        setRenderQuestions(false);
      })
      .catch((err) => console.log(err));
  }, [updateRender, addQuestionModal, Filter, SortBy, rerender]);

  return (
    <div className={Style.body}>
      {loginAlert}
      {addQuestionModal}

      <div className={Style.addNFilter}>
        <div className={Style.Add}>
          <h2 className={Style.heading}>ASK A QUESTION</h2>

          <div className={Style.addButton} onClick={addQuestion}>
            +
          </div>
        </div>

        <div
          className={
            questions === "" ||
            questions === "null" ||
            questions === undefined ||
            Updated === "Updated"
              ? Style.Loading
              : null
          }
        ></div>

        <div className={Style.Dropdown}>
          <h2 className={Style.headingTwo}>Sort by</h2>
          <select
            onChange={() => {
              setFilter(SortBy.current.value);
              setUpdated("Updated");
            }}
            ref={SortBy}
          >
            <option>Most recent</option>
            <option>By highest score</option>
            <option>By lowest score</option>
            <option>By highest upvotes</option>
            <option>By lowest upvotes</option>
            <option>By highest downvotes</option>
            <option>By lowest downvotes</option>
          </select>
        </div>
      </div>
      <div className={Style.Questions}>{questions}</div>
      <div className={Style.filterSec}>
        <h2>Filter By</h2>
        <form ref={FormValues}>
          <ul class={Style.ks_cboxtags}>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxOne" value="JavaScript" />
              <label for="checkboxOne">Javascript</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxTwo" value="React" />
              <label for="checkboxTwo">React</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxThree" value="Css" />
              <label for="checkboxThree">Css</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxFour" value="jQuery" />
              <label for="checkboxFour">jQuery</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxFive" value="Html" />
              <label for="checkboxFive">Html</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxSix" value="Swift" />
              <label for="checkboxSix">Swift</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxSeven" value="Kotlin" />
              <label for="checkboxSeven">Kotlin</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxEight" value="Android" />
              <label for="checkboxEight">Android</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxNine" value="First Year" />
              <label for="checkboxNine">First Year</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxTen" value="Second Year" />
              <label for="checkboxTen">Second Year</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxEleven" value="Third Year" />
              <label for="checkboxEleven">Third Year</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxTwelve" value="jQuery" />
              <label for="checkboxTwelve">Third Year</label>
            </li>
            <li onClick={() => setRerender(!rerender)}>
              <input type="checkbox" id="checkboxThirteen" value="PHP" />
              <label for="checkboxThirteen">PHP</label>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Questions;
