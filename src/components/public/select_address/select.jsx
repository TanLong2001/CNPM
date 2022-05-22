import axiosInstance from "../axios/axios";
import React, { useEffect, useState } from "react";
import './select.css'



export default function Select(props) {
    const data = props.check;
    const [listProvince, setlistProvince] = useState([]);
    const [listTown, setlistTown] = useState([]);
    const [listVillage, setlistVillage] = useState([]);
    const [province, setProvince] = useState('');
    const [town, setTown] = useState('all_province');
    const [village, setVillage] = useState('all_town');

    const sendData = (a, b, c) => {
        props.parentCallback(a, b, c)
    }

    useEffect(() => {
        axiosInstance.get(`/select?role=${data.role}&user=${data.user}`).then((res) => {
            setlistProvince(res.data);
        })
    }, []);

    useEffect(() => {
        setTown('all_province');
        axiosInstance.get(`/select/town?province=${province}&role=${data.role}&user=${data.user}`).then((res) => {
            setlistTown(res.data);
        })
    }, [province]);
   
    useEffect(() => {
        if(town == 'all_province') {
            setVillage('all_town')
        }
        setVillage('all_town')
        axiosInstance.get(`/select/village?province=${province}&town=${town}&role=${data.role}&user=${data.user}`).then((res) => {
            setlistVillage(res.data);
        })
        
    }, [province, town]);

    useEffect(() => {
        sendData(province, town, village)
    }, [province, town, village])



    return (
        <div  id="khungchonchung">
            <div>
                <select
                    name={1}
                    id="tinh"
                    className="luachon1"
                    onChange={e => setProvince(e.target.value)}
                >
                    <option>Tỉnh/ Thành phố</option>
                    {listProvince.map((val, key) => {
                        return (
                            <option key={val.province} value={val.province}>
                                {val.province}
                            </option>
                        )
                    })}
                </select>

                <select
                    name={2}
                    id="huyen"
                    className="luachon1"
                    onChange={e => setTown(e.target.value)}
                >
                    <option value = 'all_province'>Quận/ Huyện</option>
                    {listTown.map((val, key) => {
                        return (
                            <option key={val.town_name} value={val.town_name}>
                                {val.town_name}
                            </option>
                        )
                    })}
                </select>
                <select
                    name={3}
                    id="xa"
                    className="luachon1"
                    onChange={e => setVillage(e.target.value)}
                >
                    <option value = 'all_town'>Xã/ Phường</option>
                    {listVillage.map((val, key) => {
                        return (
                            <option key={val.village_name} value={val.village_name}>
                                {val.village_name}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}