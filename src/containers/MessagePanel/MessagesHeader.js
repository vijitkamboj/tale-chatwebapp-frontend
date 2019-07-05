import React, { Component } from 'react';
import {Segment,Input,Icon} from "semantic-ui-react"



class MessagesHeader extends Component{
    render(){
        return(
            <Segment clearing style={{width:"95%",margin:"10px auto 0 auto", height:"auto"}} >

                <span style={{fontSize:"20px",marginRight:"8px"}}>
                    {this.props.currentChannel && this.props.currentChannel.name}
                </span>

                <Icon 
                    name="star outline" 
                    style={{color:"rgb(255,153,153)",fontSize:"20px"}}
                 />

                <Input 
                    name="channelSearch" 
                    icon="search" 
                    iconPosition="left" 
                    placeholder="Search Messages" 
                    style={{float:"right",margin:"auto 0 "}}
                 />

                <div style={{marginTop:"8px"}}> Unknown users </div>

            </Segment>
        )
    }
}

export default MessagesHeader