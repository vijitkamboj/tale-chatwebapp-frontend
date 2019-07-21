import React, { Component } from 'react';
import {Modal,Button,Icon,Input} from "semantic-ui-react"
import mime from "mime-types"

class FileModal extends Component {
    state = {
        file: null,
        isFormEmpty: true,
        authorized: ["image/jpeg", "image/png"]
    }

    isAuthorized = (filename) => this.state.authorized.includes(mime.lookup(filename))

    addFile = event => {
        if (event.target.files[0]) {
            this.setState({
                isFormEmpty: false
            })
        } else {
            this.setState({
                isFormEmpty: true
            })
        }

        this.setState({
            file: event.target.files[0],
        })
    }

    sendFile = () => {
        const {file} = this.state
        if(this.isAuthorized(file.name)){
            const metaData = {
                contentType : mime.lookup(file.name)
            }
            this.props.uploadFile(file,metaData);
            this.props.closeModal()
            this.setState({
                file: null
            })
        }
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
                            label="jpeg, png"
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
                            onClick={this.sendFile} 
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