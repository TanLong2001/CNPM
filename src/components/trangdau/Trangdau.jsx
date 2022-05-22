import "./trangdau.css";
import React, { useState, useContext } from "react";
import axiosInstance from "../public/axios/axios";
import { useNavigate } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import { Theme } from "../../App";

export default function Login() {
  const context = useContext(Theme);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [login_in, setLogin_in] = useState({
    user: "",
    password: "",
  });

  const handleLogin = () => {
    axiosInstance
      .post(`/login`, {
        credentials: "include",
        body: login_in,
      })
      .then((res) => {
        context.setDataUser(res.data);
        setError("");
        navigate("/Trangchu");
      })
      .catch(function (error) {
        if (error.response.status === 403) {
          setError("Sai thông tin đăng nhập");
        }
      });
  };

  return (
    <div className="background_login">
      <div id="loginform">
        <h2 id="headerTitle">Login</h2>

        <div className="lrow">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e) =>
              setLogin_in({ ...login_in, user: `${e.target.value}` })
            }
            autoComplete="on"
          />
        </div>
        <div className="lrow">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setLogin_in({
                ...login_in,
                password: sha256(e.target.value).toString(),
              })
            }
          />
        </div>

        <div id="button" className="lrow">
          <button onClick={handleLogin}>Login</button>
        </div>
        <span id="error">{error}</span>
      </div>
    </div>
  );
}
