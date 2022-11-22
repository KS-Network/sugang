import React, { useState } from "react";
import { api } from "../../api";
import "./Root.css";

import LoginBox from "../../components/LoginBox/LoginBox";
import EnrolmentBox from "../../components/EnrolmentBox/EnrolmentBox";

export default function Main() {
  return (
    <div className="main">
      <div>
        <h1> 충남대학교 수강신청 관리자페이지</h1>
        <LoginBox />
        <hr />
        <EnrolmentBox title={"강의 데이터 수정"} mode={2} />
      </div>
    </div>
  );
}
