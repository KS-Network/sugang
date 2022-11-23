import React, { useEffect, useState } from "react";
import { api } from "../../api";
import "./ListBox.css";
import { setCookie, getCookie, deleteCookie } from "../../Cookie";

// Lecture : Make 1 row for 1 lecture.
// mode : 0 -> all lectures, 1 -> my lectures, 2 -> root
function Lecture(
  {
    department,
    grade,
    credit,
    title,
    lecture_id,
    professor,
    quota,
    attendance,
  },
  mode,
  changestate
) {
  // makeJSON : e -> JSON
  // post modified data to Server.
  async function makeJSON(e) {
    let dataList =
      e.target.parentElement.parentElement.getElementsByTagName("td");
    let changeData = prompt("변경할 제목 입력");

    if (!changeData) return;

    e.target.innerText = changeData;

    let data = {
      department: dataList[0].innerText,
      grade: dataList[1].innerText,
      credit: dataList[2].innerText,
      title: dataList[3].innerText,
      lecture_id: dataList[4].innerText + "-" + dataList[5].innerText,
      professor: dataList[6].innerText,
      quota: dataList[7].innerText,
    };

    // post data to api
    console.log(data);

    try {
      const res = await api.put("/lecture", data);
      alert("수정완료");
      // window.location.href = "/";
      // needs email functions.
    } catch (res) {
      alert(JSON.stringify(res.response.data.error));
    }
  }

  async function application(e) {
    let dataList =
      e.target.parentElement.parentElement.getElementsByTagName("td");
    var info = {
      lecture_id: dataList[4].innerText + "-" + dataList[5].innerText,
      student_id: await getCookie("student_id"),
    };
    console.log(JSON.stringify(info));

    try {
      const res = await api.post("/attendance", JSON.stringify(info));
      alert("신청완료");
      changestate();
      // window.location.href = "/";
    } catch (res) {
      alert(JSON.stringify(res.response.data.error));
    } finally {
    }
  }

  async function remove(e) {
    let dataList =
      e.target.parentElement.parentElement.getElementsByTagName("td");
    var info = {
      lecture_id: dataList[4].innerText + "-" + dataList[5].innerText,
    };
    console.log(info);

    try {
      const res = await api.delete(`/lecture?lecture_id=${info.lecture_id}`);
      e.target.parentElement.parentElement.remove();
      alert("삭제완료");
      changestate();
      // window.location.href = "/";
    } catch (res) {
      alert(JSON.stringify(res.response.data.error));
    } finally {
    }
  }

  async function cancel(e) {
    let dataList =
      e.target.parentElement.parentElement.getElementsByTagName("td");
    var info = {
      lecture_id: dataList[4].innerText + "-" + dataList[5].innerText,

      cookies: {
        studentToken: await getCookie("studentToken"),
      },
    };

    try {
      await api.delete(
        `/attendance?lecture_id=${lecture_id}&student_id=${await getCookie(
          "student_id"
        )}`,
        info
      );
      e.target.parentElement.parentElement.remove();
      alert("취소완료");
      changestate();
      // window.location.href = "/";
    } catch (res) {
      alert(JSON.stringify(res.response.data.error));
    }
  }

  return mode < 2 ? (
    <tr>
      <td>{department}</td>
      <td>{grade}</td>
      <td>{credit}</td>
      <td>{title}</td>
      <td>{lecture_id.substring(0, 9)}</td>
      <td>{lecture_id.substring(10)}</td>
      <td>{professor}</td>
      <td>{quota}</td>
      <td>{attendance}</td>
      <td>
        {mode === 0 ? (
          <button onClick={application}>신청하기</button>
        ) : (
          <button onClick={cancel}>취소하기</button>
        )}
      </td>
    </tr>
  ) : (
    <>
      <tr>
        <td>
          <a onClick={makeJSON}>{department}</a>
        </td>
        <td>
          <a onClick={makeJSON}>{grade}</a>
        </td>
        <td>
          <a onClick={makeJSON}>{credit}</a>
        </td>
        <td>
          <a onClick={makeJSON}>{title}</a>
        </td>
        <td>{lecture_id.substring(0, 9)}</td>
        <td>{lecture_id.substring(10)}</td>
        <td>
          <a onClick={makeJSON}>{professor}</a>
        </td>
        <td>
          <a onClick={makeJSON}>{quota}</a>
        </td>
        <td>{attendance}</td>
        <td>
          <button onClick={remove}>삭제하기</button>
        </td>
      </tr>
    </>
  );
}

// 0 : all-list, 1 : user, 2 : root
export default function ListBox({ mode, login, toggle, changestate }) {
  const [lectures, setLectures] = useState(-1);
  const [logInfo, setLogInfo] = useState(login);

  async function getLectures() {
    try {
      const res = await api.get("/lecture");

      setLectures(res.data.data);
    } catch (res) {
      alert(JSON.stringify(res.response.data.error));
    }
  }

  async function getUserLectures() {
    try {
      // get user lecture data
      // return;
      const res = await api.get(
        `/student-lecture?student_id=${await getCookie("student_id")}`
      );

      setLectures(res.data.data);
    } catch (res) {
      alert(JSON.stringify(res.response.data.error));
    }
  }

  async function searchLectures() {
    var option = document.getElementsByClassName("options")[0].value;
    var value = document.getElementsByClassName("value")[0].value;

    try {
      // post info and get searched lecture data
      const res = await api.get(`/lecture?${option}=${value}`);

      console.log(res);

      setLectures(res.data.data);
    } catch (res) {
      alert(JSON.stringify(res.response.data.error));
    }
  }

  async function applyLectures() {
    var value = document
      .getElementsByClassName("numAplDiv")[0]
      .getElementsByClassName("value")[0].value;

    var info = {
      lecture_id: value,
      student_id: await getCookie("student_id"),
    };

    console.log(info);

    api
      .post("/attendance", info)
      .then((res) => {
        alert("신청완료");
        console.log(res.data.data);

        setLectures(res.data.data);
      })
      .catch((res) => {
        alert(JSON.stringify(res.response.data.error));
      });
  }

  useEffect(() => {
    if (mode !== 1) getLectures();
    else if (mode === 1 && login) getUserLectures();
  }, [login, toggle]);

  return (
    <div>
      {mode === 0 ? (
        <>
          <div className="searchDiv">
            <p>검색</p>
            <select className="options">
              <option value={"department"}>학과</option>
              <option value={"grade"}>학년</option>
              <option value={"credit"}>학점</option>
              <option value={"title"}>과목명</option>
              <option value={"class_id"}>과목번호</option>
              <option value={"professor"}>교수명</option>
            </select>
            <input className="value"></input>
            <button className="searchBtn" onClick={searchLectures}>
              검색
            </button>
          </div>
          <div className="numAplDiv">
            {"과목번호로 신청 "}
            <input
              className="value"
              placeholder="과목번호-분반으로 검색"
            ></input>
            <button className="alnBtn" onClick={applyLectures}>
              신청
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="tableWrapper">
        <table className="ListBox">
          <thead>
            <tr>
              <th>학과</th>
              <th>학년</th>
              <th>학점</th>
              <th>과목명</th>
              <th>과목번호</th>
              <th>분반</th>
              <th>교수명</th>
              <th>정원</th>
              <th>현재신청인원</th>
              <th>
                {mode === 0 ? "신청하기" : mode === 1 ? "취소하기" : "삭제하기"}
              </th>
            </tr>
          </thead>
          <tbody>
            {mode === 0
              ? lectures !== -1
                ? lectures.map((lecture) => {
                    return Lecture(lecture, mode, changestate);
                  })
                : ""
              : logInfo
              ? lectures !== -1
                ? lectures.map((lecture) => {
                    return Lecture(lecture, mode, changestate);
                  })
                : ""
              : lectures !== -1
              ? lectures.map((lecture) => {
                  return Lecture(lecture, mode, changestate);
                })
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}
