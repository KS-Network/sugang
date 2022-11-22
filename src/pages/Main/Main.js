import React from "react";
import { api } from "../../api";
import "./Main.css";

import LoginBox from "../../components/LoginBox/LoginBox";
import EnrolmentBox from "../../components/EnrolmentBox/EnrolmentBox";

export default function Main() {
  return (
    <div className="main">
      <div>
        <h1> 충남대학교 수강신청 </h1>
        <LoginBox />
        <hr />
        <EnrolmentBox title={"신청 가능 강의"} mode={0} />
        <EnrolmentBox title={"신청한 강의"} mode={1} />
      </div>
    </div>
  );
}
