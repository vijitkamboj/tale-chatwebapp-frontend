import React, { Component } from 'react';
import {Segment,Button,Input} from "semantic-ui-react"

class MessagesForm extends Component{
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

                />

                <Button.Group icon widths="2" style={{marginTop:"10px"}}>
                    <Button 
                        content="Add reply"
                        icon="edit"
                        labelPosition="left"
                        color="orange"
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