import React, { useEffect, useState } from "react";
import './tiendodieutra.css';
import { VictoryPie } from "victory-pie"
import './ChartPie.css'
import Select from "../public/select_address/select";
import axiosInstance from "../public/axios/axios";


export default function Tiendo(props) {
  const data = props.id;
  const [province, setProvince] = useState('');
  const [town, setTown] = useState("all_province");
  const [village, setVillage] = useState("all_town");
  const [popuPro, setPopuPro] = useState('')
  const [popuReal, setPopuReal] = useState('')

  const callbackFunction = (Stinh, Shuyen, Sxa) => {
    setProvince(Stinh);
    setTown(Shuyen);
    setVillage(Sxa);
  };


  useEffect(() => {
    axiosInstance.get(`/tiendo?province=${province}&town=${town}&village=${village}&role=${data.role}`).then((res) => {
      if(res.data.length > 0) {
        console.log(res.data[0].tong);
        setPopuPro(res.data[0].tong)
        setPopuReal(res.data[0].total)
      } 
      else{
        setPopuPro(0)
        setPopuReal(0)
      }
    })
  }, [province, town, village]);

  var dakhaosat
  var tong
  if (popuPro == 0) {
    dakhaosat = 0;
    tong = 100;
  }
  else {
    dakhaosat = popuPro
    tong = popuReal
  }

  var tisokhaosat = Math.round((dakhaosat * 100) / (dakhaosat + tong))
  var tongks = Math.round((tong * 100) / (dakhaosat + tong))

  const myData = [
    { x: "(" + tongks + "%" + ")", y: tong },
    { x: "(" + tisokhaosat + "%" + ")", y: dakhaosat },
  ];

  return (
    <div style={{ marginTop: "10px" }}>
      <Select parentCallback={callbackFunction} check={data} />
      <div className="Chart_tien_do">
        <VictoryPie
          data={myData}
          colorScale={"qualitative"}
          radius={150}
          animate={{
            duration: 2000
          }}
        />
      </div>
      <ul className="legend">
        <li><span className="superawesome"></span> Chưa khảo sát</li>
        <li><span className="awesome"></span> Đã khảo sát</li>
      </ul>
    </div>
  )
}

