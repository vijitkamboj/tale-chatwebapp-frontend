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
    } // defining local state for channel compoenent


    componentDidMount(){
        this.addListeners()
    }  // adding database listeners when component mounts

    addListeners = () => {
        let loadedChannels = [];
        this.state.channelsRef.on("child_added", snap => {
            loadedChannels.push(snap.val())
            this.setState({channels:loadedChannels})
        })

    }// whenever a child is added it returns dataSnapshot of all children and also executes first time when child_added event hasn't happened.

    displayChannels = (channels) => {
        return(
            <React.Fragment>
                {channels.length>0 && channels.map((channel,i)=> {
                    return(    
                        <li key={channel.id} id="user-panel-channels-item" style={{marginTop: "10px"}}>
                        <span
                            name = {channel.name}
                            style={{
                                marginLeft:"5px",

                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                fontWeight:"lighter",
                                fontSize: "16px",
                                color:"white"

                            }}
                            onClick={()=>{console.log(channel)}}>
                            {channel.name}
                        </span>
                        </li>
                    )
                })
                }
            </React.Fragment>  // wrapping multiple list items inside react.fragment 
        )

    } // methods that generates list elements of channel name

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.isFormEmpty){   
            this.addChannel(this.state)
        }
    } // method to handle submit event

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
        this.closeModal();

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({
                    channelName: "",
                    channelDetail: "",
                    isFormEmpty:true 
                });
                
            })
        .catch(err => alert(err))
    } // method used to store channel into the database

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            isFormEmpty: this.state.channelDetail !== "" && this.state.channelName !== "" ? false : true
        })
    } // method to handle changes in the input field and constantle updating isFormEmpty state

    showModal = () => {
        this.setState({modal:true})
    } // method to show modal
 
    closeModal = () => {
        this.setState({modal:false})
    } // methos to close the modal

    handleEnter = (event) => {
        if (event.keyCode === 13){
            this.handleSubmit(event)
        }
    } // method to check if enter is pressed

    render(){
        const {channels ,modal , isFormEmpty} = this.state;
        const{showModal , closeModal} =this
        return(
            <React.Fragment>
                {/* displaying channel heading */}
                <div id="user-panel-channels" >

                    <Icon 
                    name="exchange" 
                    size="large" 
                    style={{marginRight:"10px"}}
                     />

                    Channels ({channels.length})

                    <Icon 
                    name="add" 
                    size="large" 
                    className="icon" 
                    id="add"
                    onClick={showModal}

                    />

                </div> 
                
                {/* displaying channels */}
                <ul style={{
                    fontSize:"16px",
                    color:"rgba(255, 50, 50, 0.452)",
                    paddingLeft:"50px",
                    marginTop:"0px"
                }}>
                    {this.displayChannels(channels)}
                </ul>
                
                {/* dispalying modal */}
                <Modal basic open={modal} closeIcon onClose={closeModal} onKeyDown={this.handleEnter}>

                    <Modal.Header 
                        icon="add" 
                        style={{
                            fontWeight:"lighter",
                            color: "rgb(226, 226, 226)",

                            border:"none",
                    }}
                    >
                        Add a channel
                    </Modal.Header>

                    <Modal.Content style={{border:"none",fontWeight:"lighter"}}>

                        <Input 
                            fluid 
                            label="Name of the Channel"
                            name="channelName"
                            onChange={this.handleChange}
                            style={{marginBottom:"10px"}}
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