import React from "react";
import "./ListBox.css";

export default function ListBox({ mode }) {
  // mode 0 : user, 1 : root
  return (
    <div className="tableWrapper">
      <table className="ListBox">
        <thead>
          <tr>
            <th>학과</th>
            <th>학년</th>
            <th>교수</th>
            <th>과목명</th>
            <th>과목번호</th>
            <th>학점</th>
            <th>분반</th>
            <th>정원</th>
            <th>현재신청인원</th>
            <th>신청하기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>컴퓨터공학과</td>
            <td>2</td>
            <td>김동일</td>
            <td>컴퓨터프로그래밍</td>
            <td>22100-00</td>
            <td>3</td>
            <td>00</td>
            <td>50</td>
            <td>37</td>
            <td>
              <button>신청하기</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
