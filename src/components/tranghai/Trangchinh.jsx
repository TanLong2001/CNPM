import React from "react";
import {Outlet} from "react-router-dom";
import Menu from "../public/Menu/menu";
import Navbar from "../public/Navbar/Navbar"
import Footer from "../public/footer/footer";
import "./tranghai.css";
import Member from "../member/Member";


export default function Tranghai(props) {

  return (
    <div>
      <div>
        <Navbar id={props.id} />
      </div>

      <div className="display">
        <Menu value = {props.value}/>
        <div className="khunglamviec">
          <div className="blur"> <Outlet></Outlet></div>
         
        </div>
      </div>

      <div className="fter">
        <Footer />
      </div>
    </div>

  );
}
