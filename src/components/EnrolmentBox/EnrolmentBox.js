import React from "react";
import "./EnrolmentBox.css";
import ListBox from "../ListBox/ListBox";

export default function EnrolmentBox({ title }) {
  /*
    EnrolmentBox
    1. Write the title.
    2. Fetch database and apply.
  */
  return (
    <div>
      <h2>{title}</h2>
      <ListBox />
    </div>
  );
}
