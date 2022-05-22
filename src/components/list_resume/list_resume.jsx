import React, { useState , useContext, createContext} from "react";
import './lisr_resume.css'
import Select from "../public/select_address/select";
import axiosInstance from "../public/axios/axios";

export default function ListResume(props) {
    const data = props.unitad;

    const [peopleList, setpeopleList] = useState([]);
    const [tinh, setTinh] = useState();
    const [huyen, setHuyen] = useState();
    const [xa, setXa] = useState();

    const callbackFunction = (Stinh, Shuyen, Sxa) => {
        setTinh(Stinh);
        setHuyen(Shuyen);
        setXa(Sxa); 
    };

    const showResume = () => {
        axiosInstance.get(`/show?tinh=${tinh}&huyen=${huyen}&xa=${xa}&role=${data.role}`).then((response) => {
            setpeopleList(response.data)
        })
            .catch(err => console.log(err)) ;
        console.log(data)
    }
    
    return (
        <div className="listResume">
            <div id="head_listResume">
                <Select parentCallback={callbackFunction} check={data}/>
                <button 
                className="clickList" 
                onClick={showResume}
                style={{marginTop: '1vh'}}
                >
                Xem danh sách</button>
            </div>

            <table id="list_people">
                <thead>
                    <tr>
                        <th className="ppname">Họ tên</th>
                        <th className="ppcccd">CCCD</th>
                        <th className="ppdate">Ngày sinh</th>
                        <th className="ppgender">Giới tính</th>
                        <th className="ppaddress ">Địa chỉ</th>
                        <th className="ppreligion">Dân tộc</th>
                        <th className="ppjob">Nghề nghiệp</th>
                    </tr>
                </thead>

                <tbody>
                    {peopleList.map((val, key) => {
                        return (
                            <tr key={val.CCCD} className="showPeople">
                                <td className="ppname">{val.fullname}</td>
                                <td className="ppcccd">{val.CCCD}</td>
                                <td className="ppdate">{val.datebirth}</td>
                                <td className="ppgender">{val.gender}</td>
                                <td className="ppaddress ">{val.address}</td>
                                <td className="ppreligion">{val.religion}</td>
                                <td className="ppjob">{val.job}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}