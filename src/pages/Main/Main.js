import React, { useEffect, useState } from "react";
import { api } from "../../api";
import "./Main.css";

import LoginBox from "../../components/LoginBox/LoginBox";
import EnrolmentBox from "../../components/EnrolmentBox/EnrolmentBox";
import { getCookie } from "../../Cookie";

export default function Main() {
  const [loginInfo, setLoginInfo] = useState(0);
  const [user, setUser] = useState("");
  const [toggle, setToggle] = useState(false);

  const loginUser = (name) => {
    setUser(name);
    setLoginInfo(1);
  };

  const changeState = () => {
    console.log(toggle);
    setToggle(!toggle);
  };

  const setLogin = (state) => {
    setLoginInfo(state);
  };

  function init() {
    setUser(getCookie("student_id"));
    if (user == null || user == "") setLoginInfo(0);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="main">
      <div>
        <h1> 충남대학교 수강신청 </h1>
        <LoginBox func={loginUser} user={user} loginInfo={loginInfo} mode={0} />
        <hr />
        <EnrolmentBox
          title={"신청 가능 강의"}
          mode={0}
          toggle={toggle}
          loginInfo={loginInfo}
          changestate={changeState}
          setLoginInfo={setLogin}
        />
        <EnrolmentBox
          title={"신청한 강의"}
          mode={1}
          login={loginInfo}
          toggle={toggle}
          loginInfo={loginInfo}
          changestate={changeState}
          setLoginInfo={setLogin}
        />
      </div>
    </div>
  );
}
