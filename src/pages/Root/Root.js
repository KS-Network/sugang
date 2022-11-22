import React from "react";
import "./Root.css";

import LoginBox from "../../components/LoginBox/LoginBox";
import EnrolmentBox from "../../components/EnrolmentBox/EnrolmentBox";
import TimeSettingBox from "../../components/TimeSettingBox/TimeSettingBox";

export default function Root() {
  return (
    <div className="main">
      <div>
        <h1> 충남대학교 수강신청 관리자페이지</h1>
        <LoginBox />
        <hr />
        <TimeSettingBox />
        <EnrolmentBox title={"강의 데이터 수정"} mode={2} />
      </div>
    </div>
  );
}
