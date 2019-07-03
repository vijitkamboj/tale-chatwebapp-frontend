import "./MessagePanel.css"
import React, { Component } from 'react';
import MessagesHeader from "./MessagesHeader";
import MessagesForm from "./MessagesForm"
import {Segment,Comment} from "semantic-ui-react"

class MessagePanel extends Component{
    render(){
        return(
            <div id="message-panel" className="panels" >
                <MessagesHeader />

                <Segment>
                    <Comment.Group>

                    </Comment.Group>
                </Segment>

                <MessagesForm />
            </div>
        )
    }
}

export default MessagePanel;