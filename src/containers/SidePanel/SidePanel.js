import "./SidePanel.css"
import React, { Component } from 'react';
import UserPanel from "./UserPanel/UserPanel"

class SidePanel extends Component{

    render(){
        return(
            <div id="side-panel">
                <UserPanel />
            </div>
        )
    }
}

export default SidePanel ;