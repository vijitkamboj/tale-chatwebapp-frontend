import React, { Component } from 'react';
import {Comment} from "semantic-ui-react";
import moment from "moment"


class Message extends Component{

    timeFromNow = timestamp => moment(timestamp).fromNow()

    render(){
        const {message,currentUser} = this.props
        console.log(this.props);
        return(
            <Comment>
                <Comment.Avatar src={message.user.avatar} />
                <Comment.Content className={currentUser.uid === message.user.id ? "message__self" : "" }>
                    <Comment.Author as="a">{message.user.name}</Comment.Author>
                    <Comment.Metadata>{this.timeFromNow(message.timestamp)}</Comment.Metadata>
                    <Comment.Text>{message.content}</Comment.Text>
                </Comment.Content>

            </Comment>
        )
    }
}

export default Message