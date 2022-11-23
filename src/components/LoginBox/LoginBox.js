import React, { useState } from "react";
import { api } from "../../api";
import "./LoginBox.css";
import { setCookie, getCookie, deleteCookie } from "../../Cookie";

export default function LoginBox({ func, user, loginInfo, mode }) {
  async function login() {
    var info = {
      student_id: document.getElementsByClassName("userid")[0].value,
      password: document.getElementsByClassName("userpw")[0].value,
    };

    try {
      // console.log(info);
      const res = await api.post("/sign-in", info);

      console.log(res.data);
      if (res.data.success === true) {
        func(info.student_id);
        setCookie("studentToken", res.data.studentToken);
        setCookie("student_id", info.student_id);
      } else {
        alert("ID, PW 확인요망");
        // func("");
      }
    } catch (error) {
      alert(`로그인 실패 : ${error}`);
    }
  }

  async function logout() {
    deleteCookie("studentToken");
    deleteCookie("student_id");
  }

  async function rootLogin() {
    var info = {
      email: document.getElementsByClassName("userid")[0].value,
      password: document.getElementsByClassName("userpw")[0].value,
    };

    try {
      // console.log(info);
      const res = await api.post("/sign-in-admin", info);

      console.log(res.data);
      if (res.data.success === true) {
        func(info.email);
        setCookie("adminToken", res.data.adminToken);
        setCookie("admin_id", info.student_id);
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      alert(`로그인 실패 : ${error}`);
    }
  }

  async function rootLogout() {
    deleteCookie("adminToken");
    deleteCookie("admin_id");
  }

  return (
    <div>
      {mode !== 1 ? (
        loginInfo ? (
          <div>
            환영합니다 <p className="user">{user}</p>님!
            <button className="logoutbtn" onClick={logout}>
              로그아웃
            </button>
          </div>
        ) : (
          <div>
            ID : <input className="userid" type="text"></input>
            PW : <input className="userpw" type="password"></input>
            <button className="loginbtn" onClick={login}>
              로그인
            </button>
          </div>
        )
      ) : loginInfo ? (
        <div>
          환영합니다 <p className="user">{user}</p>님!
          <button className="logoutbtn" onClick={rootLogout}>
            로그아웃
          </button>
        </div>
      ) : (
        <div>
          ID : <input className="userid" type="text"></input>
          PW : <input className="userpw" type="password"></input>
          <button className="loginbtn" onClick={rootLogin}>
            로그인
          </button>
        </div>
      )}
    </div>
  );
}
