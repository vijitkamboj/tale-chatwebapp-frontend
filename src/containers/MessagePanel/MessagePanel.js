import "./MessagePanel.css"
import React, { Component } from 'react';
import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm"
import {Segment,Comment} from "semantic-ui-react";
import firebase from "../../firebase"

class MessagePanel extends Component{

    state = {
        messagesRef :firebase.database().ref("messages")
    }

    render(){
        return(
            <div id="message-panel" className="panels" >
                <MessagesHeader />

                <Segment style={{flex:"1", width:"95%" , margin:"10px auto 110px auto" , overflowY:"scroll"}}>
                    <Comment.Group>

                    </Comment.Group>
                </Segment>

                <MessagesForm 
                    firebase = {firebase} 
                    messagesRef={this.state.messagesRef} 
                    currentUser={this.props.currentUser} 
                    currentChannel = {this.props.currentChannel}

                />
            </div>
        )
    }
}

export default MessagePanel;