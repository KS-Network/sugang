import React, { useState } from "react";
import axios from "axios";
import "./Main.css";

import ListBox from "../../components/ListBox/ListBox";
import LoginBox from "../../components/LoginBox/LoginBox";
import EnrolmentBox from "../../components/EnrolmentBox/EnrolmentBox";

export default function Main() {
  const [likeList, setLikeList] = useState([]);
  const [dislikeList, setDislikeList] = useState([]);

  const setLike = (name, type) => {
    // 0이면 추가, 1이면 삭제
    if (type === 0) setLikeList([...likeList, name]);
    else setLikeList(likeList.filter((v) => v !== name));
  };

  const setDislike = (name, type) => {
    if (type === 0) setDislikeList([...dislikeList, name]);
    else setDislikeList(dislikeList.filter((v) => v !== name));
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  // check response
  async function getValue() {
    const info = {
      like: likeList,
      dislike: dislikeList,
      info: false,
    };

    await axios
      .post("http://localhost:5050/getFood", info)
      .then((res) => {
        let choice = getRandomInt(0, res.data.length);
        window.location.href = `/result:${res.data[choice].name}`;
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="main">
      <div>
        <h1> 충남대학교 수강신청 </h1>
        <LoginBox />
        <hr />
        <EnrolmentBox title={"신청 가능 강의"} />
        <EnrolmentBox title={"신청한 강의"} />
      </div>
    </div>
  );
}
