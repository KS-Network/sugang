import React, { useState } from "react";
import "./Root.css";

import LoginBox from "../../components/LoginBox/LoginBox";
import EnrolmentBox from "../../components/EnrolmentBox/EnrolmentBox";
import TimeSettingBox from "../../components/TimeSettingBox/TimeSettingBox";

export default function Root() {
  const [rootLogin, setRootLogin] = useState(false);
  const [root, setRoot] = useState("");

  const loginRoot = (name) => {
    setRoot(name);
    setRootLogin(1);
  };

  return (
    <div className="main">
      <div>
        <h1> 충남대학교 수강신청 관리자페이지</h1>
        <LoginBox func={loginRoot} user={root} loginInfo={rootLogin} mode={1} />
        <hr />
        <TimeSettingBox />
        <EnrolmentBox title={"강의 데이터 수정"} mode={2} />
      </div>
    </div>
  );
}
