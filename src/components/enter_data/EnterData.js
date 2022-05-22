import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./EnterData.css";
import axiosInstance from "../public/axios/axios";
import Select from "../public/select_address/select";
import { Theme } from "../../App";
import AccessDenied from "./AccessDenied";


export default function EnterData() {
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const data = useContext(Theme).dataUser;
  const roleA1 = {
    role: 'A1',
    user: 'admin'

  }
  console.log(data.user);
  const [accept, setAccept] = useState(true)
  useEffect(()=>{
    axiosInstance.get(`/Nhaplieu/check?user=${data.user}`).then((res) => {
      if(res.data === "no"){
        
        setAccept(false);
    }
    else setAccept(true);
    
  });
  },[data])
  const [state, setState] = useState({
    CCCD: "",
    fullName: "",
    datebirth: "",
    gender: "",
    hometown: {
      province: "",
      town: "",
      village: "",
    },
    address: {
      province: "",
      town: "",
      village: "",
    },
    region: "",
    job: "",
  });
  const callBackHomeTown = (province, town, village) => {
    setState({
      ...state,
      hometown: { province: province, town: town, village: village },
    });
  };
  const callBackAdress = (province, town, village) => {
    setState({
      ...state,
      address: { province: province, town: town, village: village },
    });
  };
  const checkEmpty = () => {
    if (
      state.CCCD &&
      state.fullName &&
      state.datebirth &&
      state.gender &&
      state.hometown &&
      state.address &&
      state.region &&
      state.job 
    ) {
      setError(false)
      return true;
    }
    setError(true)
    return false;
  };
  // const history = useHistory()
  

  const sendAPI = () => {
    if (checkEmpty()) {
      axiosInstance.post("/Nhaplieu", state).then((res) => {
        if(res.data === "Ok"){
          navigate('/Trangchu/Success');
      }});
    }
  };

  return (
    <>
    {!accept?<AccessDenied/>:<div>
      <div className="container-declaration">
        <div className="title"> Nhập liệu về dân số</div>
        <div className="form-declaration">
          <div className="info ">
            <div className="inputBox ">
              <span className="details"> Họ và tên</span>
              <input
                name="name"
                type="text"
                required
                className="center"
                onChange={(e) =>
                  setState({ ...state, fullName: e.target.value })
                }
                // value={data.name}
              />
            </div>

            <div className="inputBox ">
              <span className="details"> Ngày sinh</span>
              <input
                name="DOB"
                className="center"
                type="date"
                required
                onChange={(e) =>
                  setState({ ...state, datebirth: e.target.value })
                }
              />
            </div>

            <div className="inputBox ">
              <span className="details"> Số CCCD/CMND</span>
              <input
                name="CCCD"
                type="text"
                required
                className="center"
                onChange={(e) => setState({ ...state, CCCD: e.target.value })}
                // value={data.CCCD}
              />
            </div>

            <div className="inputBox center">
              <span className="details"> Quê quán</span>
              <Select parentCallback={callBackHomeTown} check = {roleA1}></Select>
            </div>

            <div className="inputBox center">
              <span className="details"> Địa chỉ thường trú</span>
              <Select parentCallback={callBackAdress} check = {roleA1}></Select>
            </div>


            <div className="inputBox center">
              <span className="details">Nghề nghiệp</span>
              <input
                name="job"
                type="text"
                required
                className="center"
                onChange={(e) => setState({ ...state, job: e.target.value })}
              />
            </div>

            <div className="inputBox center">
              <span className="details">Dân tộc</span>
              <input
                name="religion"
                type="text"
                required
                className="center"
                onChange={(e) => setState({ ...state, region: e.target.value })}
                // value={data.religion}
              />
            </div>
          </div>

          <div className="gender-info">
            <input
              type="radio"
              name="sex"
              id="dot1"
              value="Nam"
              onChange={(e) => setState({ ...state, gender: e.target.value })}
            />
            <input
              type="radio"
              name="sex"
              id="dot2"
              value="Nữ"
              onChange={(e) => setState({ ...state, gender: e.target.value })}
            />
            <span className="title"> Giới tính</span>
            <div className="option">
              <label htmlFor="dot1">
                <span className="dot one"></span>
                <span className="gender"> Nam</span>
              </label>
              <label htmlFor="dot2">
                <span className="dot two"></span>
                <span className="gender"> Nữ</span>
              </label>
            </div>
          </div>
                <span style={{fontSize:'20px'}}>{error&&'*Chưa nhập đủ dữ liệu'}</span>
          <div className="button">
            <input type="submit" value="Nhập" onClick={sendAPI} />
          </div>

          <div id='taiphieu'>
            <a href="https://cdn.luatvietnam.vn/uploaded/Others/2021/10/01/don-xin-xac-nhan-thong-tin_0110111059.doc" className="phieudieutra">Tải phiếu điều tra</a>
          </div>
        </div>
      </div>
    </div>}
    </>
    
    
  );
}
