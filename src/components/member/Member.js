import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";
import axiosInstance from "../public/axios/axios";
import './Member.css';
import { useContext } from "react";
import { Theme } from "../../App";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import AutoFixOffIcon from "@mui/icons-material/AutoFixOff";
import moment from "moment";

export default function Member() {

  const tmm = useContext(Theme);
  const inforUser = tmm.dataUser

  const [listUser, setListUser] = useState([]);
  const [timeOpen, setTimeOpen] = useState();
  const [timeClose, setTimeClose] = useState();
  const setOpen = (data, index) => {
    axiosInstance
      .get(`/member/timeOpen?user=${listUser[index].user}&data=${data}`)
      .then((res) => {
        if (res.data === "set Time Open Done") {
          console.log(res.data);
        }
      });
  };
  const setClose = (data, index) => {
    axiosInstance
      .get(`/member/timeClose?user=${listUser[index].user}&data=${data}`)
      .then((res) => {
        if (res.data === "set Time Close Done") {
          console.log(res.data);
        }
      });
  };
  const [vaPer, setVaPer] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`./member/user?role=${inforUser.role}&user=${inforUser.user}`, {})
      .then((res) => {
        setListUser(res.data);
      });
  }, [inforUser, vaPer]);

  console.log(vaPer);
  const setPerDeclare = (status, index) => {
    setVaPer(!vaPer);

    const newPer = status == "yes" ? "no" : "yes";
    const user = listUser[index].user;
    axiosInstance
      .get(`/member/setPer?per=${newPer}&user=${user}`)
      .then((res) => {
        if (res.data === "set Per Done") {
        }
      });
  };
  const t = moment("2021-12-09T16:36:00.000Z").format("DD-MM-YYYY hh mm");

  return (
    <>
      <h1>Quản lí tài khoản </h1>
      <br />
      <br />
      
      <div className="se">
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ width: "10vw" }}>Tài khoản</th>
              <th style={{ width: "12vw" }}>Tên đơn vị</th>
              <th style={{ width: "11vw" }}>Quyền</th>
              <th style={{ width: "12vw" }}>Thời gian mở khai báo</th>
              <th style={{ width: "12vw" }}>Thời gian đóng khai báo</th>
              <th style={{ width: "12vw" }}>Trạng thái khai báo</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((val, index) => {
              return (
                <tr key={val.user}>
                  <td style={{ width: "10vw" }}>{val.user}</td>

                  <td>{val.name_unit}</td>
                  <td>{val.role}</td>
                  <td>
                    <span>
                      {moment(val.time_open).format("DD-MM-YYYY hh:mm")}
                      {}
                      <input
                        name="DOB"
                        className="center"
                        type="datetime-local"
                        id="abc"
                        onBlur={(e) => setOpen(e.target.value, index)}
                      />
                    </span>
                  </td>
                  <span>
                    {moment(val.time_close).format("DD-MM-YYYY hh:mm")}
                    <input
                      name="DOB"
                      className="center"
                      type="datetime-local"
                      def
                      onBlur={(e) => setClose(e.target.value, index)}
                    />
                  </span>

                  <td>
                    <button
                      style={{ borderStyle: "none" }}
                      onClick={(e) => setPerDeclare(val.per_declare, index)}
                    >
                      {/* {val.per_declare == 'yes'?setVaPer(true):setVaPer(false)} */}
                      {console.log(val.per_declare)}
                      {val.per_declare == "no" ? (
                        <AutoFixOffIcon />
                      ) : (
                        <AutoFixNormalIcon color="primary" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
