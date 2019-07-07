import React, { Component } from 'react';
import {Modal,Button,Icon,Input} from "semantic-ui-react"

class FileModal extends Component {
    state = {
        file:null,
        isFormEmpty : true
    }


    addFile = event => {
        console.log(event.target.files[0]);
    }

    render(){
        return(
            <Modal basic open={this.props.modal} closeIcon onClose={this.props.closeModal} onKeyDown={this.handleEnter}>

                    <Modal.Header 
                        icon="add" 
                        style={{
                            fontWeight:"lighter",
                            color: "rgb(226, 226, 226)",
                            border:"none",
                        }}
                    >
                        Select an Image File
                    </Modal.Header>

                    <Modal.Content style={{border:"none",fontWeight:"lighter"}}>

                        <Input 
                            fluid 
                            label="Upload File"
                            name="file"
                            type="file"
                            onChange={this.addFile}
                            style={{marginBottom:"10px"}}
                        />

                    </Modal.Content>

                    <Modal.Actions style={{border:"none"}}>
                    
                        <Button 
                            color="green" 
                            basic 
                            inverted 
                            // onClick={this.addFile} 
                            disabled={this.state.isFormEmpty}
                        >
                            <Icon name="checkmark"/>
                            Send
                        </Button>

                        <Button 
                            color="red" 
                            basic 
                            inverted 
                            onClick={this.props.closeModal}
                        >
                            <Icon name="remove" />
                            Cancel
                        </Button>

                    </Modal.Actions>
                </Modal>
        )
    }
}


export default FileModal