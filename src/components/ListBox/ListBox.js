import React, { useEffect, useState } from "react";
import { api } from "../../api";
import "./ListBox.css";

// Lecture : Make 1 row for 1 lecture.
// mode : 0 -> all lectures, 1 -> my lectures, 2 -> root
function Lecture(
  {
    department,
    grade,
    credit,
    title,
    lecture_id,
    class_no,
    professor,
    quota,
    attendance,
  },
  mode
) {
  // makeJSON : e -> JSON
  // post modified data to Server.
  const makeJSON = (e) => {
    let dataList =
      e.target.parentElement.parentElement.getElementsByTagName("td");
    let changeData = prompt("변경할 제목 입력");

    if (!changeData) return;

    e.target.innerText = changeData;

    let JSON = {
      department: dataList[0].innerText,
      grade: dataList[1].innerText,
      credit: dataList[2].innerText,
      title: dataList[3].innerText,
      lecture_id: dataList[4].innerText,
      class_no: dataList[5].innerText,
      professor: dataList[6].innerText,
      quota: dataList[7].innerText,
      attendance: dataList[8].innerText,
    };

    // post data to api
    console.log(JSON);
  };

  return mode < 2 ? (
    <tr>
      <td>{department}</td>
      <td>{grade}</td>
      <td>{credit}</td>
      <td>{title}</td>
      <td>{lecture_id}</td>
      <td>{class_no}</td>
      <td>{professor}</td>
      <td>{quota}</td>
      <td>{attendance}</td>
      <td>
        {mode === 0 ? (
          <button
            onClick={() => {
              alert("신청 완료");
            }}
          >
            신청하기
          </button>
        ) : (
          <button
            onClick={() => {
              alert("취소 완료");
            }}
          >
            취소하기
          </button>
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
        <td>{lecture_id}</td>
        <td>{class_no}</td>
        <td>
          <a onClick={makeJSON}>{professor}</a>
        </td>
        <td>
          <a onClick={makeJSON}>{quota}</a>
        </td>
        <td>{attendance}</td>
        <td>
          <button>삭제하기</button>
        </td>
      </tr>
    </>
  );
}

export default function ListBox({ mode }) {
  // 0 : all-list, 1 : user, 2 : root
  const [lectures, setLectures] = useState([]);

  async function getLectures() {
    try {
      // const res = await api.get("/lecture");

      var res = {
        error: null,
        data: [
          {
            department: "Computer Science",
            grade: 4,
            credit: 3,
            title: "test",
            lecture_id: "123456781234",
            class_no: "00",
            professor: "kim",
            quota: 20,
            attendance: 0,
          },
        ],
      };
      setLectures(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserLectures() {
    try {
      // get user lecture data
      // return;
      // const res = await api.get("/lecture");

      var res = {
        error: null,
        data: [
          {
            department: "Computer Science",
            grade: 4,
            credit: 3,
            title: "test",
            lecture_id: "123456781234",
            class_no: "00",
            professor: "kim",
            quota: 20,
            attendance: 0,
          },
          {
            department: "Computer Science",
            grade: 4,
            credit: 3,
            title: "test",
            lecture_id: "123456781234",
            class_no: "00",
            professor: "kim",
            quota: 20,
            attendance: 0,
          },
        ],
      };
      setLectures(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function searchLectures() {
    let option = document.getElementsByClassName("options")[0].value;
    let value = document.getElementsByClassName("value")[0].value;

    try {
      // get user lecture data
      // return;
      // const res = await api.get("/lecture");

      var res = {
        error: null,
        data: [
          {
            department: "Computer Science",
            grade: 4,
            credit: 3,
            title: "test",
            lecture_id: "123456781234",
            class_no: "00",
            professor: "kim",
            quota: 20,
            attendance: 0,
          },
          {
            department: "Computer Science",
            grade: 4,
            credit: 3,
            title: "test",
            lecture_id: "123456781234",
            class_no: "00",
            professor: "kim",
            quota: 20,
            attendance: 0,
          },
        ],
      };
      setLectures(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (mode !== 1) getLectures();
    else if (mode === 1) getUserLectures();
  }, []);

  return (
    <div>
      {mode === 0 ? (
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
            {lectures.map((lecture) => {
              return Lecture(lecture, mode);
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
