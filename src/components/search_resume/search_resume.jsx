import React, { useState, useEffect } from "react";
import './search_resume.css'
import axiosInstance from "../public/axios/axios";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Search(props) {
    const data = props.unitad;
    const [listProvince, setlistProvince] = useState([]);
    const [listTown, setlistTown] = useState([]);
    const [listVillage, setlistVillage] = useState([]);
    const [province, setProvince] = useState('1');
    const [town, setTown] = useState('all_province');
    const [village, setVillage] = useState('all_town');
    const [fullname, setFullname] = useState('');
    const [cccd, setCccd] = useState('');
    const [hometown, sethometown] = useState('');
    const [job, setJob] = useState('');
    const [religion, setReligion] = useState('');
    const [danhsach, setDanhsach] = useState([]);
    const [che, setChe] = useState(true);
    const [accept, setAccept] = useState(true)

    useEffect(()=>{
        axiosInstance.get(`/Nhaplieu/check?user=${data.user}`).then((res) => {
          if(res.data === "no"){  
            setAccept(false);
        }
        else setAccept(true);
        
      });
      },[data])

    useEffect(() => {
        axiosInstance.get(`/select?role=${data.role}&user=${data.user}`).then((res) => {
            setlistProvince(res.data);
        })
    }, [data.role, data.user]);

    useEffect(() => {
        setTown('all_province');
        axiosInstance.get(`/select/town?province=${province}&role=${data.role}&user=${data.user}`).then((res) => {
            setlistTown(res.data);
        })
    }, [data.role, data.user, province]);

    useEffect(() => {
        axiosInstance.get(`/select/village?province=${province}&town=${town}&role=${data.role}&user=${data.user}`).then((res) => {
            setlistVillage(res.data);
        })
        if (province === "1") {
            setTown('all_province')
        }
        if (town === 'all_province') {
            setVillage('all_town')
        }

        if(town == 'all_province') {
            setVillage('all_town')
        }
        setVillage('all_town')
    }, [data.role, data.user, province, town]);

    useEffect(() => {
        axiosInstance.get(`/search?province=${province}&town=${town}&village=${village}&fullname=${fullname}&cccd=${cccd}&hometown=${hometown}&job=${job}&religion=${religion}&role=${data.role}&user=${data.user}`).then((res) => {
            setDanhsach(res.data);
        })
    }, [province, town, village, fullname, cccd, hometown, job, religion, data.role, data.user, che]);

    //Xoa dong du lieu
    const clickXoa = (deletecccd) => {
        if (accept == true) {
            const check = window.confirm("B???n c?? mu???n x??a b???n ghi n??y?");
            let ok;
            if (check == true) {
                axiosInstance.get(`/search/delete?cccd=${deletecccd}`).then((res) => {
                    ok = res.data;
                    if (ok == 'ok') {
                        setChe(!che)
                        window.alert('???? x??a th??nh c??ng ng?????i c?? CCCD ' + deletecccd)
                    }
                })
            }
            else {
            }
        }
        else {
            window.alert("B???n kh??ng c?? quy???n");
        }
    }

    return (
        <div className="se">
            <h1>Tra c???u th??ng tin</h1>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ width: '8vw' }}>H??? v?? t??n</th>
                        <th style={{ width: '7vw' }}>CMND</th>
                        <th style={{ width: '5vw' }}>Gi???i t??nh</th>
                        <th className=".datebirth">Ng??y sinh</th>
                        <th style={{ width: '8vw' }}>Qu?? qu??n</th>
                        <th style={{ width: '6vw' }}>Ngh??? nghi???p</th>
                        <th style={{ width: '4vw' }}>D??n t???c</th>
                        <th style={{ width: '7vw' }}>X??/ Ph?????ng</th>
                        <th style={{ width: '7vw' }}>Qu???n/ Huy???n</th>
                        <th style={{ width: '8vw' }}>T???nh/ Th??nh ph???</th>
                        <th>X??a</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="se_name" style={{ width: '8vw' }}>
                            <input
                                name="fullname"
                                style={{ width: '8vw' }}
                                type="text"
                                onBlur={e => setFullname(e.target.value)}

                            />
                        </td>
                        <td style={{ width: '7vw' }}>
                            <input
                                name="cmnd"
                                style={{ width: '7vw' }}
                                type="text"
                                onBlur={e => setCccd(e.target.value)}
                            />
                        </td>
                        <td style={{ width: '5vw' }}>
                        </td>
                        <td className=".datebirth">
                        </td>
                        <td style={{ width: '8vw' }}>
                            <input
                                name="quequan"
                                style={{ width: '8vw' }}
                                type="text"
                                onBlur={e => sethometown(e.target.value)}
                            />
                        </td>
                        <td style={{ width: '6vw' }}>
                            <input
                                style={{ width: '6vw' }}
                                type="text"
                                onBlur={e => setJob(e.target.value)}
                            />
                        </td>
                        <td style={{ width: '4vw' }}>
                            <input
                                style={{ width: '4vw' }}
                                type="text"
                                onBlur={e => setReligion(e.target.value)}
                            />
                        </td>
                        <td style={{ width: '7vw' }}>
                            <select
                                style={{ width: '7vw' }}
                                onChange={e => setVillage(e.target.value)}
                            >
                                <option value={'all_town'}>Ch???n x??</option>
                                {listVillage.map((val, key) => {
                                    return (
                                        <option key={val.village_name} value={val.village_name}>
                                            {val.village_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </td>
                        <td style={{ width: '7vw' }}>
                            <select
                                style={{ width: '7vw' }}
                                onChange={e => setTown(e.target.value)}>
                                <option value={'all_province'}>Ch???n huy???n</option>
                                {listTown.map((val, key) => {
                                    return (
                                        <option key={val.town_name} value={val.town_name}>
                                            {val.town_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </td>
                        <td style={{ width: '8vw' }}>
                            <select
                                style={{ width: '8vw' }}
                                onChange={e => setProvince(e.target.value)}
                            >
                                <option value={'1'}>Ch???n t???nh</option>
                                {listProvince.map((val, key) => {
                                    return (
                                        <option key={val.province} value={val.province}>
                                            {val.province}
                                        </option>
                                    )
                                })}
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {danhsach.map((val, key) => {
                        return (
                            <tr key={val.CCCD}>
                                <td style={{ width: '8vw' }}>{val.fullname}</td>
                                <td style={{ width: '7vw' }}>{val.CCCD}</td>
                                <td style={{ width: '5vw' }}>{val.gender}</td>
                                <td className=".datebirth">{val.datebirth}</td>
                                <td style={{ width: '8vw' }}>{val.hometown}</td>
                                <td style={{ width: '6vw' }}>{val.job}</td>
                                <td style={{ width: '4vw' }}>{val.religion}</td>
                                <td style={{ width: '7vw' }}>{val.village}</td>
                                <td style={{ width: '7vw' }}>{val.town}</td>
                                <td style={{ width: '8vw' }}>{val.province}</td>
                                <td><button id="nutxoa" onClick={() => clickXoa(val.CCCD)}><DeleteIcon></DeleteIcon></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}