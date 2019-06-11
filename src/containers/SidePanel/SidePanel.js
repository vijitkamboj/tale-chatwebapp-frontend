import "./SidePanel.css"
import React, { Component } from 'react';
import firebase from "../../firebase"
import UserPanel from "./UserPanel/UserPanel"

class SidePanel extends Component{
    handleSignOut = () => {
        firebase.auth().signOut().then(console.log("signout"))
    }
    dropDownOptions =()=>{
      return(
        [
            {   
                key:"user",
                text:<span>Signed in as <strong>User</strong></span>,
                disabled:true
            },
            {
                key:"avatar",
                text:<span>Change Avatar</span>,
                disabled:false
            },
            {
                key:"signout",
                text:<span onClick={this.handleSignOut}><a href="/home">Sign Out</a></span>,
                disabled:false
            }
        ]
      )
    }
    render(){
        return(
            <div id="side-panel">
                <UserPanel dropDownOptions={this.dropDownOptions}/>
            </div>
        )
    }
}

export default SidePanel ;