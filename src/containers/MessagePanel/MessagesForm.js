import React, { Component } from 'react';
import {Segment,Button,Input} from "semantic-ui-react"
import firebase from "../../firebase"

class MessagesForm extends Component{

    state={
        message:"",
        isInputEmpty : true,
        loading: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,

        })

        this.setState({
            isInputEmpty: this.state.message.length === "" ? true : false,
        })

    }

    createMessage = () => {
        const message = {
            content: this.state.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.props.currentUser.uid,
                name: this.props.currentUser.displayName,
                avatart: this.props.currentUser.photoURL
            }
        }
        return message
    }

    sendMessage = () => {
        const {
            messagesRef
        } = this.props
        this.setState({
            loading: true
        });

        messagesRef
            .child(this.props.currentChannel.id)
            .push()
            .set(
                this.createMessage()
            )
            .then(
                this.setState({
                    loading: false,
                    isInputEmpty: true,
                    message: ""
                })
            )
    }

    render(){
        return(
            <Segment 
                id="message-form"
            >
                <Input 
                    fluid 
                    name="message" 
                    label={ <Button icon="add" style={{color:"black"}}/>} 
                    labelPosition="left" 
                    placeholder="Enter the message"
                    onChange = {this.handleChange}
                    value = {this.state.message}
                />

                <Button.Group icon widths="2" style={{marginTop:"10px"}}>
                    <Button 
                        content="Add reply"
                        icon="edit"
                        labelPosition="left"
                        color="orange"
                        onClick= {this.sendMessage}
                        disabled = {this.state.isInputEmpty}
                    />
                    <Button 
                        content="Upload Media"
                        icon="cloud upload"
                        labelPosition="right"
                        color="teal"
                    />
                </Button.Group>

            </Segment>
        )
    }
}

export default MessagesForm