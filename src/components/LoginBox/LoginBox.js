import React, { useState } from "react";
import { api } from "../../api";
import "./LoginBox.css";

export default function LoginBox() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("박병휘");

  async function login() {
    var info = {
      student_id: document.getElementsByClassName("userid")[0].value,
      password: document.getElementsByClassName("userpw")[0].value,
    };

    try {
      console.log(info);
      // const res = await api.post("/sign-in", info);
      // if (res.success === true) {
      setIsLogin(true);
      // }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {isLogin ? (
        <div>환영합니다 {user}님!</div>
      ) : (
        <div>
          ID : <input className="userid" type="text"></input>
          PW : <input className="userpw" type="password"></input>
          <button className="loginbtn" onClick={login}>
            로그인
          </button>
        </div>
      )}
    </div>
  );
}
