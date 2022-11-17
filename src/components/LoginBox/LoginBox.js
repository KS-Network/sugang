import React from "react";
import "./LoginBox.css";

export default function LoginBox() {
  return (
    <div>
      ID : <input className="userid" type="text"></input>
      PW : <input className="userpw" type="password"></input>
    </div>
  );
}
