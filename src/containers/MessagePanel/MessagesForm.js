import React, { Component } from 'react';
import {Segment,Button,Input} from "semantic-ui-react"
import firebase from "../../firebase"
import FileModal from "./FileModal"

class MessagesForm extends Component{

    state={
        message:"",
        isInputEmpty : true,
        modal:false
    }

    handleChange = event => {
        if(event.target.value === ""){
            this.setState({isInputEmpty:true})
        }else{
            this.setState({isInputEmpty:false})
        }
        this.setState({
            [event.target.name]: event.target.value,

        })

    }

    createMessage = () => {
        const message = {
            content: this.state.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.props.currentUser.uid,
                name: this.props.currentUser.displayName,
                avatar: this.props.currentUser.photoURL
            }
        }
        return message
    }

    sendMessage = () => {
        const {messagesRef} = this.props
        this.setState({isInputEmpty:true});
        messagesRef
            .child(this.props.currentChannel.id)
            .push()
            .set(
                this.createMessage()
            )
            .then(
                this.setState({
                    isInputEmpty: true,
                    message: ""
                })
            )
    }

    handleEnter = (event) => {
        if(event.keyCode === 13 && this.state.isInputEmpty === false){
            this.sendMessage()
        }
    }

    openModal = () => {
        this.setState({modal:true})
    }

    closeModal = () => {
        this.setState({modal:false})
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
                    style={{border: "1px solid rgba(0,0,0,0.2)", borderRadius:"5px"}}
                    onKeyDown = {this.handleEnter}
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
                        onClick={this.openModal}
                    />
                </Button.Group>
                
                <FileModal 
                    modal={this.state.modal}
                    closeModal = {this.closeModal}
                />


            </Segment>
        )
    }
}

export default MessagesForm