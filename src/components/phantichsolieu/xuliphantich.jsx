import React, { useEffect, useState } from "react";
import './phantichsolieu.css';
import { VictoryPie } from "victory-pie"
import './Chart_phan_tich.css';
import { Bar } from "react-chartjs-2";
import Select from "../public/select_address/select";
import axiosInstance from "../public/axios/axios";
import { VictoryChart } from "victory";
import Chart from 'chart.js/auto';

export default function PhanTich(props) {
    const data = props.id;
    const [province, setProvince] = useState('');
    const [town, setTown] = useState("all_province");
    const [village, setVillage] = useState("all_town");

    //giới tính
    const [male, setMale] = useState('')
    const [female, setFemale] = useState('')

    //tuổi trưởng thành
    const [teenager, setTeenager] = useState('')
    const [older, setOlder] = useState('')

    //dân tộc
    const [religion, setReligion] = useState('')
    const [religion2, setReligion2] = useState('')
    const [religion3, setReligion3] = useState('')
    const [religion4, setReligion4] = useState('')
    const [religion5, setReligion5] = useState('')

    //số người mỗi dân tộc
    const [eachReligion, setEachReligion] = useState('')
    const [eachReligion2, setEachReligion2] = useState('')
    const [eachReligion3, setEachReligion3] = useState('')
    const [eachReligion4, setEachReligion4] = useState('')
    const [eachReligion5, setEachReligion5] = useState('')




    // giới tính 
    useEffect(() => {
        axiosInstance.get(`/phantich/namnu?province=${province}&town=${town}&village=${village}&role=${data.role}`).then((res) => {
            if (res.data.length > 1) {
                setMale(res.data[0].nam)
                setFemale(res.data[1].nu)
            }
            else {
                setMale(0)
                setFemale(0)
            }
        })
    }, [province, town, village, data.role]);


    // trên 18 tuổi
    useEffect(() => {
        axiosInstance.get(`/phantich/truongthanh?province=${province}&town=${town}&village=${village}&role=${data.role}`).then((res) => {
            if (res.data.length > 1) {
                setTeenager(res.data[0].u18)
                setOlder(res.data[1].over18)
            }
            else {
                setTeenager(0)
                setOlder(0)
            }
        })
    }, [province, town, village, data.role]);

    //thống kê dân tộc
    useEffect(() => {
        axiosInstance.get(`/phantich/dantoc?province=${province}&town=${town}&village=${village}&role=${data.role}`).then((res) => {
            if (res.data.length === 0) {
                setReligion('No data')
                setReligion2('No data')
                setReligion3('No data')
                setReligion4('No data')
                setReligion5('No data')

                setEachReligion(0)
                setEachReligion2(0)
                setEachReligion3(0)
                setEachReligion4(0)
                setEachReligion5(0)
            }
            else {
                setReligion(res.data[0].religion)
                setReligion2(res.data[1].religion)
                setReligion3(res.data[2].religion)
                setReligion4(res.data[3].religion)
                setReligion5(res.data[4].religion)

                setEachReligion(res.data[0].mount)
                setEachReligion2(res.data[1].mount)
                setEachReligion3(res.data[2].mount)
                setEachReligion4(res.data[3].mount)
                setEachReligion5(res.data[4].mount)
            }
        })
    }, [province, town, village]);

    var percent_male
    var percent_female
    if (male === 0) {
        percent_male = 0
        percent_female = 100
    } else {
        percent_male = male
        percent_female = female
    }

    var tilenam = Math.round((percent_male * 100) / (percent_male + percent_female))
    var tilenu = Math.round((percent_female * 100) / (percent_male + percent_female))

    var percent_teenager
    var percent_older
    if (older === 0) {
        percent_teenager = 0
        percent_older = 100
    }
    else {
        percent_teenager = teenager
        percent_older = older
    }
    var tileu18 = Math.round((percent_teenager * 100) / (percent_teenager + percent_older))
    var tileok = Math.round((percent_older * 100) / (percent_teenager + percent_older))

    const myData_gender = [
        { x: "(" + tilenu + "%" + ")", y: percent_female },
        { x: "(" + tilenam + "%" + ")", y: percent_male },
    ];

    const myData_u18 = [
        { x: "(" + tileok + "%" + ")", y: percent_older },
        { x: "(" + tileu18 + "%" + ")", y: percent_teenager },
    ];

    var r1 = religion
    var r2 = religion2
    var r3 = religion3
    var r4 = religion4
    var r5 = religion5

    var m1 = eachReligion
    var m2 = eachReligion2
    var m3 = eachReligion3
    var m4 = eachReligion4
    var m5 = eachReligion5

    const callbackFunction = (Stinh, Shuyen, Sxa) => {
        setProvince(Stinh);
        setTown(Shuyen);
        setVillage(Sxa);
    };

    return (
        <div style={{ marginTop: "10px" }}>

            <Select parentCallback={callbackFunction} check={data} />

            <div className="Chart_phan_tich" id="chu_thich1">
                <VictoryPie
                    data={myData_gender}
                    colorScale={"heatmap"}
                    radius={150}
                    animate={{
                        duration: 1000
                    }}
                />
                <ul className="legend_phan_tich" >
                    <li><span className="legend_1"></span> Nam</li>
                    <li><span className="legend_2"></span> Nữ</li>
                </ul>
            </div>

            <div className="Chart_phan_tich_2" id="chu_thich2">
                <VictoryPie
                    data={myData_u18}
                    colorScale={"red"}
                    radius={150}
                    animate={{
                        duration: 1000
                    }}
                />
                <ul className="legend_phan_tich" >
                    <li><span className="legend_3"></span> Dưới 18 tuổi</li>
                    <li><span className="legend_4"></span> Trên 18 tuổi</li>
                </ul>
            </div>



            <div className="chart_dan_toc">
                <Bar
                    data={{
                        labels: [r1, r2, r3, r4, r5],
                        datasets: [
                            {
                                label: 'Sô dân của 5 dân tộc nhiều nhất(đơn vị: người)',
                                data: [m1, m2, m3, m4, m5],
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 206, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(153, 102, 255)'

                                ],
                            }
                        ]
                    }}
                    
                    options={{
                        maintainAspectRation: false,
                    }}
                    height={100}
                />
            </div>
        </div>


    )
}