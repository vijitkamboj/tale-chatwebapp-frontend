import React from 'react';
import logo from "../logo.png"
import "./UserPanel.css";
import {Dropdown} from "semantic-ui-react"


const UserPanel = (props) => {
    return(
        <div id="user-panel">
            <div id="user-panel-header">
                <img src={logo} alt="logo" style={{height: "40px" , width:"auto" , margin:"10px"}}/>
                Tale
            </div>
            <Dropdown 
            id="user-panel-dropdown" 
            trigger={<span>My Account</span>} 
            options={props.dropDownOptions()}
            />
        </div>
        
    )
}

export default UserPanel;