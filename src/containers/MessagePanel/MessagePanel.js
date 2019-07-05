import "./MessagePanel.css"
import React, { Component } from 'react';

import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm";
import Message from "./Message"
import {Segment,Comment} from "semantic-ui-react";
import firebase from "../../firebase"


class MessagePanel extends Component{

    state = {
        messagesRef: firebase.database().ref("messages"),
        messages: [],
        messagesLoading: true
    }

    componentDidMount() {
        setTimeout(() => {
            const {
                currentChannel,
                currentUser
            } = this.props;

    
            if (currentChannel && currentUser) {
                this.addListeners(currentChannel.id)
            }
        }, 1500)
    }

    addListeners = (channelId) => {
        this.addMessageListener(channelId)
    }

    addMessageListener = (channelId) => {
        let loadedMessages = []
        this.setState({messagesLoading:false})
        this.state.messagesRef.child(channelId).on("child_added", snap => {
                console.log(1);
                loadedMessages.push(snap.val())
                this.setState({
                    messages: loadedMessages,
                })
            })

    }

    displayMessages = (messages) => {
        messages.length > 0 && messages.map (message => (
            <Message 
                key = {message.timestamp}
                message = {message}
                user = {this.props.currentChannel}
            /> 
        ))
    }

    render(){
        const {messagesRef,messages,messagesLoading} = this.state;
        const{currentChannel,currentUser} = this.props
        return(
            <div id="message-panel" className="panels" >
                <MessagesHeader 
                    currentChannel = {this.props.currentChannel }
                />

                <Segment 
                loading={messagesLoading}
                style={{flex:"1", width:"95%" , margin:"10px auto 110px auto" , overflowY:"scroll"}}>
                    <Comment.Group>
                        {this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>

                <MessagesForm 
                    firebase = {firebase} 
                    messagesRef={messagesRef} 
                    currentUser={currentUser} 
                    currentChannel = {currentChannel}

                />
            </div>
        )
    }
}



export default MessagePanel;