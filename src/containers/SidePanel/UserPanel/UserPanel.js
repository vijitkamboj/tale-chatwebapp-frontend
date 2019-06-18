import React,{ Component } from 'react';
import firebase from "../../../firebase"
import logo from "../logo.png"
import "./UserPanel.css";
import {Dropdown , Image} from "semantic-ui-react"
import {connect} from "react-redux"
import {setUser} from "../../../actions/index"


class UserPanel extends Component {

    handleSignOut = () => {
        this.props.setUser(this.props.currentUser,null)
        firebase.auth().signOut()
    }
    dropDownOptions =()=>{
    
      return(
        [
            {   
                key:"user",
                text:<span>Signed in as <strong>{this.props.currentUser.displayName}</strong></span>,
                disabled:true
            },
            {
                key:"avatar",
                text:<span id="dropdown-btn-change_avatar">Change Avatar</span>,
                disabled:false
            },
            {
                key:"signout",
                text:<span  onClick={this.handleSignOut}>Sign Out</span>,
                disabled:false
            }
        ]
      )
    }

    componentDidMount(){
        document.getElementsByClassName("item")[2].addEventListener('click',this.handleSignOut)
    }// adding eventListener over the whole block

    render(){
        return(
            <div id="user-panel">
                <div id="user-panel-header">
                    <img src={logo} alt="logo" style={{height: "40px" , width:"auto" , margin:"10px"}}/>
                    Tale
                </div>
                <Dropdown 
                id="user-panel-dropdown" 
                trigger={
                    <span>
                        <Image src={this.props.currentUser.photoURL} spaced="right" avatar/>
                        {this.props.currentUser.displayName}
                    </span>
                } 
                options={this.dropDownOptions()}
                pointing
                />
            </div>
            
        )
        
    }
}

export default connect(null,{setUser})(UserPanel);