import React, { forwardRef, useState } from "react";
import Style from "./CheckBox.module.scss";

const CheckBox = forwardRef(({ ...props }, ref) => {
  const [Checked, setChecked] = useState(false);

  const setFilter = () => {
    let Array = [];

    let filter = sessionStorage.getItem("FilteredContent");

    if (filter === "" || filter === null) {
      if (Checked) {
        Array.push(props.text);
        sessionStorage.setItem("FilteredContent", JSON.stringify(Array));
      }
    } else {
      let parse = JSON.parse(filter);

      if (Checked) {
        console.log(parse);
        parse.push(props.text);
        sessionStorage.setItem("FilteredContent", JSON.stringify(Array));
      }
    }
  };

  return (
    <div data-value={Checked} className={Style.CheckContainer}>
      <div
        ref={ref}
        onClick={() => {
          setChecked(!Checked);
          setFilter();
        }}
        className={Checked ? Style.Checked : Style.Unchecked}
      ></div>
      <h4 className={Style.Text}>{props.text}</h4>
    </div>
  );
});

export default CheckBox;
