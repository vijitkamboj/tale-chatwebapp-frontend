import "./SidePanel.css"
import React, { Component } from 'react';
import logo from "./logo.png"
import { auth } from "firebase";

class SidePanel extends Component{
    render(){
        return(
            <div id="side-panel">
                <img src={logo} alt="logo" style={{height: "40px" , width:"auto" , margin:"10px"}}/>
            </div>
        )
    }
}

export default SidePanel;