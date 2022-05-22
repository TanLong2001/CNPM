import React, {useContext} from "react";
import './Navbar.css'
import Cookies from 'universal-cookie';
import { Theme } from "../../../App";
const cookies = new Cookies();

export default function Navbar(props) {
    const handleLogout = () => {
        cookies.remove('token', { path: '/' });
    }

    const ten = useContext(Theme).dataUser;

    return (
        <div className="tieude">
            <div className="logo_danso">
                <img src="https://data.gov.vn/o/govTheme/images/gov/logo_cong.svg" />
            </div>
            <div className="khungphai">
                <div style={{fontWeight: "bold"}}>{ten.role} : {ten.name_unit}</div>

                <a href="/" onClick={handleLogout} style={{ textDecoration: "none" }}>|| Đăng xuất</a>
            </div>
        </div>
    )
}