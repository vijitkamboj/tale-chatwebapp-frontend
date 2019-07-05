import "./MessagePanel.css"
import React, { Component } from 'react';

import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm";
import {Segment,Comment} from "semantic-ui-react";
import firebase from "../../firebase";
import moment from "moment"

class MessagePanel extends Component{

    state = {
        messagesRef: firebase.database().ref("messages"),
        messages: [],
        messagesLoading: true
    }

    componentWillUnmount(){
        this.state.messagesRef.off("child_added")
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
            this.setState({messagesLoading:false})
        }, 1400)
    }

    addListeners = (channelId) => {
        this.addMessageListener(channelId)
    }

    addMessageListener = (channelId) => {
        let loadedMessages = []
        
        this.state.messagesRef.child(channelId).on("child_added", snap => {
                loadedMessages.push(snap.val())
                this.setState({
                    messages: loadedMessages,
                })
                Segment.scrollTop = Segment.scrollHeight;
            })
            

    }

    displayMessages = (messages,currentUser) => {
        if(messages.length>0){
            return(
                <React.Fragment>
                    {messages.map (message => 
                        {
                            return(
                                <Comment key={message.timestamp} >
                                    <Comment.Avatar src={message.user.avatar}  />
                                    <Comment.Content  className={currentUser.uid === message.user.id ? "message_self" : ""}>
                                        <Comment.Author as="a">{message.user.name}</Comment.Author>
                                        <Comment.Metadata>{this.timeFromNow(message.timestamp)}</Comment.Metadata>
                                        <Comment.Text>{message.content}</Comment.Text>
                                    </Comment.Content>

                                </Comment>
                            )
                        }
                    )}
                </React.Fragment>
            )
        }
    }

    timeFromNow = timestamp => moment(timestamp).fromNow()

    render(){
        const {messagesRef,messages,messagesLoading} = this.state;
        const{currentChannel,currentUser} = this.props
        return(
            <div id="message-panel" className="panels" >
                <MessagesHeader 
                    currentChannel = {this.props.currentChannel }
                />

                <Segment 
                    id ="message-panel-segment"
                    loading={messagesLoading}
                    style={{flex:"1", width:"95%" , margin:"10px auto 110px auto" , overflowY:"scroll"}}
                >
                    <Comment.Group>
                        {this.displayMessages(messages,currentUser)}
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