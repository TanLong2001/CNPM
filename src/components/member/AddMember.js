import react from "react";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import styte from "./Member.css";
import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./AddMember.css";
import axiosInstance from "../public/axios/axios";
import { Theme } from "../../App";
import { useContext } from "react";
import sha256 from "crypto-js/sha256";
import { useNavigate } from "react-router";
export default function AddMember() {
  const navigate = useNavigate()
  const [state, setState] = useState({
    name: "",
    user: "",
    password: "",
    passwordAgain: "",
  });

  const dataUser = useContext(Theme).dataUser;

  const role = dataUser.role;
  var roleDown;
  var levelUnit;
  if (role === "A1") {
    roleDown = "A2";
    levelUnit = "Tỉnh/TP";
  } else if (role === "A2") {
    roleDown = "A3";
    levelUnit = "Huyện/Quận";
  } else if (role === "A3") {
    roleDown = "B1";
    levelUnit = "Xã/Thị Trấn";
  } else if (role === "B1") {
    roleDown = "B2";
    levelUnit = "Thôn/Bản";
  }
  // console.log(state);
  const [alertUp, setAlertUp] = useState(false);
  const checkEmpty = () => {

    if (state.user && state.password && state.passwordAgain && state.name) {
      return true;
    }
    return false;
  };
  const checkPassWordAgain = () => {
    if (state.password == state.passwordAgain) {
      setAlertUp(false);
      return true;
    } else {
      setAlertUp(true);
      return false;
    }
  };
  // const t = checkPassWordAgain()
  const [error, setError] = useState(false)
  const sendAPI = () => {

    if (checkEmpty() && checkPassWordAgain()) {
      const data = {
        name: state.name,
        user: state.user,
        password: sha256(state.password).toString(),
        role: roleDown,
        parent_user: dataUser.user
      }
      axiosInstance.post("/member/add", data).then((res) => {
        if (res.data === "ok") {
          navigate('/Trangchu/Success')
        } else if (res.data === "no") {
          setError(true)
        }
      });
    }
  };

  return (
    <div>
      <br />
      <br />
      <h1>Tạo tài khoản cho {roleDown}</h1>
      <br />
      <br />

      <div className="containerr ">
        <div className="form-group row name">
          <label htmlFor="staticName" className="col-sm-4 col-form-label">
            {levelUnit}
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="staticName"
              required
              placeholder="name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
            Tài khoản
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="staticEmail"
              required
              placeholder="id"
              onChange={(e) => setState({ ...state, user: e.target.value })}
            />
          </div>
        </div>
        <br></br>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-4 col-form-label">
            Mật khẩu
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              className="form-control"
              required
              id="inputPassword"
              placeholder="Password"
              onChange={(e) => setState({ ...state, password: (e.target.value) })}
            />
          </div>
        </div>
        <br />
        <div className="form-group row">
          <label
            htmlFor="inputPasswordAgain"
            className="col-sm-4 col-form-label"
          >
            Nhập lại
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              className="form-control"
              required
              id="inputPasswordAgain"
              placeholder="Enter Password again"
              onChange={(e) =>
                setState({ ...state, passwordAgain: (e.target.value) })
              }
            />
            <span className="alertt"  >{alertUp ? '*Mật khẩu không khớp' : ' '}</span>
            <span className="alertt" >{error ? '*tài khoản đã tồn tại' : ' '}</span>
          </div>
        </div>
        <br />

        <button class="btn btn-primary " onClick={sendAPI}>
          Xác nhận
        </button>
      </div>
    </div>
  );
}