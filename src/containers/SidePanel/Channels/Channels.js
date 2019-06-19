import "./Channels.css"
import React, { Component } from 'react';
import {Icon, Modal,Input , Button} from "semantic-ui-react"

class Channels extends Component{

    state = {
        channels:[],
        modal:false,
        channelName:'',
        channelDetail:""
    }

    handleChange =(event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    showModal = () => {
        this.setState({modal:true})
    }

    closeModal = () => {
        this.setState({modal:false})
    }

    render(){
        const {channels ,modal} = this.state;
        const{showModal , closeModal} =this
        return(
            <React.Fragment>

                <div id="user-panel-channels" >
                    <Icon name="exchange" size="large" style={{marginRight:"10px"}} />
                    Channels ({channels.length})
                    <Icon name="add" size="large" className="icon" id="add" onClick={showModal}/>
                </div>

                <Modal basic dimmer={"blurring"} open={modal} closeIcon onClose={closeModal} >

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
                        style={{marginBottom:"10px"}}
                        />

                        <Input 
                        fluid 
                        type="text"
                        label="About the Channel"
                        name="channelDetails"
                        onChange={this.handleChange}
                        />

                    </Modal.Content>

                    <Modal.Actions style={{border:"none"}}>
                        <Button color="green" basic inverted><Icon name="checkmark"/>Add</Button>
                        <Button color="red" basic inverted onClick={this.closeModal}><Icon name="remove" />Cancel</Button>
                    </Modal.Actions>
                </Modal>

            </React.Fragment>
        )
    }
}

export default Channels ;