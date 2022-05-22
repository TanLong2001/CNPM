import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import { useLocation } from "react-router";
export default function Menu(props) {
  const location = useLocation().pathname;

  const role = props.value.role;
  const chucnangA = "hidechucnang";
  const [index, setIndex] = useState(location);
  console.log(index);
  const color = "rgb(9, 95, 165)";
  const colorFront = 'white'
  return (
    <div>
      <div className="menu1" className={role === "B2" ? chucnangA : "huy"}>
        <Link to="./Tiendo">
          <button
            className="active"
            style={{
              backgroundColor: index == "/Trangchu/Tiendo" ? color : "",
              color: index == "/Trangchu/Tiendo" ? colorFront : ""
            }}
            onClick={(e) => setIndex("/Trangchu/Tiendo")}
          >
            Tiến độ điều tra
          </button>
        </Link>
      </div>
      <div className="menu1" className={role === "B2" ? chucnangA : "huy"}>
        <Link to="./Phantich">
          <button
            className="active"
            style={{
              backgroundColor: index == "/Trangchu/Phantich" ? color : "",
              color: index == "/Trangchu/Phantich" ? colorFront : ""
            }}
            onClick={(e) => setIndex("/Trangchu/Phantich")}
          >
            Phân tích số liệu
          </button>
        </Link>
      </div>
      <div className="menu1" className={role === "B2" ? chucnangA : "huy"}>
        <Link to="Danhsach">
          <button
            className="active"
            style={{
              backgroundColor: index == "/Trangchu/Danhsach" ? color : "",
              color: index == "/Trangchu/Danhsach" ? colorFront : ""
            }}
            onClick={(e) => setIndex("/Trangchu/Danhsach")}
          >
            Danh sách dân số
          </button>
        </Link>
      </div>
      <div className="menu1" className={role === "B2" ? chucnangA : "huy"}>
        <Link to="./Tracuu">
          <button
            className="active"
            style={{
              backgroundColor: index == "/Trangchu/Tracuu" ? color : "",
              color: index == "/Trangchu/Tracuu" ? colorFront : ""
            }}
            onClick={(e) => setIndex("/Trangchu/Tracuu")}
          >
            Tra cứu thông tin
          </button>
        </Link>
      </div>
      <div className="menu1" className={role === "B2" ? chucnangA : "huy"}>
        <Link to="./addMember">
          <button
            className="active"
            style={{
              backgroundColor: index == "/Trangchu/addMember" ? color : "",
              color: index == "/Trangchu/addMember" ? colorFront : ""
            }}
            onClick={(e) => setIndex("/Trangchu/addMember")}
          >
            Cấp tài khoản
          </button>
        </Link>
      </div>
      <div className="menu1" className={role === "B2" ? chucnangA : "huy"}>
        <Link to="./Member">
          <button
            className="active"
            style={{
              backgroundColor: index == "/Trangchu/Member" ? color : "",
              color: index == "/Trangchu/Member" ? colorFront : ""
            }}
            onClick={(e) => setIndex("/Trangchu/Member")}
          >
            Quản lí tài khoản
          </button>
        </Link>
      </div>
      <div
        className="menu1"
        className={
          role === "A1" || role === "A2" || role === "A3" ? chucnangA : "huy"
        }
      >
        <Link to="./Nhaplieu">
          <button
            className="active"
            style={{
              backgroundColor: index == "/Trangchu/Nhaplieu" ? color : "",
              color: index == "/Trangchu/Nhaplieu" ? colorFront : ""
            }}
            onClick={(e) => setIndex("/Trangchu/Nhaplieu")}
          >
            Nhập liệu
          </button>
        </Link>
      </div>
    </div>
  );
}
