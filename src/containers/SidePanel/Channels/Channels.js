import "./Channels.css"
import React, { Component } from 'react';
import {Icon, Modal,Input , Button} from "semantic-ui-react";
import firebase from "../../../firebase"

class Channels extends Component{

    state = {
        channels:[],
        modal:false,
        channelName:"",
        channelDetail:"",
        isFormEmpty:true,
        channelsRef : firebase.database().ref("channels"),
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.isFormEmpty){
            this.addChannel(this.state)
        }else{
            console.log(this.state.isFormEmpty);
        }
    }

    addChannel = ({channelDetail,channelName,channelsRef}) => {
        const { displayName , photoURL} = this.props.currentUser
        const key = channelsRef.push().key
        const newChannel = {
            id: key,
            name : channelName,
            detail: channelDetail,
            createdBy : {
                name : displayName,
                avatar : photoURL
            }
        }

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({
                    channelName: "",
                    channelDetail: "",
                    isFormEmpty:true 
                });
                this.closeModal();
            })
        .catch(err => alert(err))
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            isFormEmpty: this.state.channelDetail && this.state.channelName !== "" ? false : true
        })
    }

    showModal = () => {
        this.setState({modal:true})
    }

    closeModal = () => {
        this.setState({modal:false})
    }

    handleEnter = (event) => {
        if (event.keyCode === 13){
            this.handleSubmit(event)
        }
    }

    render(){
        const {channels ,modal , isFormEmpty} = this.state;
        const{showModal , closeModal} =this
        return(
            <React.Fragment>

                <div id="user-panel-channels" >
                    <Icon name="exchange" size="large" style={{marginRight:"10px"}} />
                    Channels ({channels.length})
                    <Icon name="add" size="large" className="icon" id="add" onClick={showModal}/>
                </div>

                <Modal basic dimmer={"blurring"} open={modal} closeIcon onClose={closeModal} onKeyDown={this.handleEnter}>

                    <Modal.Header 
                    icon="add" 
                    style={{border:"none",fontWeight:"lighter",color: "rgb(226, 226, 226)"}}
                    >
                        Add a channel
                    </Modal.Header>

                    <Modal.Content style={{border:"none"}}>

                        <Input 
                        fluid 
                        label="Name of the Channel"
                        name="channelName"
                        onChange={this.handleChange}
                        style={{marginBottom:"10px" , fontWeight:"lighter"}}
                        />

                        <Input 
                        fluid 
                        type="text"
                        label="About the Channel"
                        name="channelDetail"
                        onChange={this.handleChange}
                        />

                    </Modal.Content>

                    <Modal.Actions style={{border:"none"}}>
                    
                        <Button 
                        color="green" 
                        basic 
                        inverted 
                        onClick={this.handleSubmit} 
                        disabled={isFormEmpty}
                        >
                            <Icon name="checkmark"/>
                            Add
                        </Button>

                        <Button 
                        color="red" 
                        basic 
                        inverted 
                        onClick={this.closeModal}
                        >
                            <Icon name="remove" />
                            Cancel
                        </Button>

                    </Modal.Actions>
                </Modal>

            </React.Fragment>
        )
    }
}

export default Channels ;