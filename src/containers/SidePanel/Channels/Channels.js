import "./Channels.css"
import React, { Component } from 'react';
import {Icon, Modal} from "semantic-ui-react"

class Channels extends Component{

    state = {
        channels:[],
        modal:false
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
                    <Icon name="exchange" size="large" color="white" style={{marginRight:"10px"}} />
                    Channels ({channels.length})
                    <Icon name="add" size="large" color="white" className="icons" id="add" onClick={showModal}/>
                </div>
                <Modal dimmer={"blurring"} open={modal} closeIcon onClose={closeModal}>
                    
                </Modal>
            </React.Fragment>
        )
    }
}

export default Channels ;