import React, { useState } from "react";
import { api } from "../../api";
import "./TimeSettingBox.css";

export default function TimeSettingBox() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  async function setTime() {
    try {
      var info = {
        start: document.getElementsByClassName("starttime")[0].value,
        end: document.getElementsByClassName("endtime")[0].value,
      };

      console.log(info);

      // post start, end datetime to server
      const res = await api.put("/time", info);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <p>수강신청 시간 설정</p>
      <p>
        시작 :<input className="starttime" type="time"></input>
      </p>
      <p>
        종료 :<input className="endtime" type="time"></input>
      </p>
      <button className="setTime" onClick={setTime}>
        설정하기
      </button>
    </div>
  );
}
