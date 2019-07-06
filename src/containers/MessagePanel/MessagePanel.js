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
        messagesLoading:true,
    } // initial state - message segment will be loading 

    componentDidMount() {

        setTimeout(() => {
            const {currentChannel,currentUser} = this.props;

            if (currentChannel && currentUser) {
                this.addListeners(currentChannel.id)
            }
            this.setState({messagesLoading:false})
        }, 1900)

    } // when component has mounted , adding listeners on channel but after a
     //delay of 2s so as to wait for (channel component to succefully mount so that firstChannel can be stored on global state)  

    componentWillUpdate(nextProps){
        if(nextProps.currentChannel !== this.props.currentChannel){
            this.setState({messages:""})
            this.state.messagesRef.off("child_added")
        }
    } // before component updates if previous channel is not equal to upcoming cahannel then remove previous listeners and clear messages

    componentDidUpdate(prevProps){
        this.scrollBottom() // scoling to bottum automatically
        const { currentChannel,currentUser} = this.props;
        if(prevProps.currentChannel !== currentChannel){
            
            if (currentChannel && currentUser)
            {this.addListeners(currentChannel.id)}
            
            this.setState({messagesLoading:false})
        } // if prev channel is different from new channel then adding listener on new channel
        
    } // executes just after the compopnent has finished update

    componentWillUnmount(){
        this.state.messagesRef.off("child_added")
    } // removing the listeners befire component unmounts

    addListeners = (channelId) => {
        this.addMessageListener(channelId)
    }// method to add listeners

    addMessageListener = (channelId) => {
        let loadedMessages = []
        let Segment = document.getElementById("message-panel-segment")
        this.state.messagesRef.child(channelId).on("child_added", snap => {
            loadedMessages.push(snap.val())
            this.setState({
                messages: loadedMessages,
            })
            Segment.scrollTop = Segment.scrollHeight;
        })
    }// listener method

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
    } // method to display messages

    timeFromNow = timestamp => moment(timestamp).fromNow()

    scrollBottom = () => {
        let Segment = document.getElementById("message-panel-segment")
        Segment.scrollTop = Segment.scrollHeight;

    } // method to scroll to bottom

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