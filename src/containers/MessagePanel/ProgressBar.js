import React, { Component } from 'react';
import {Progress} from "semantic-ui-react"

class ProgressBar extends Component {

    render(){
        return(
            this.props.uploadStatus !== "" && (<Progress 
                percent={this.props.percentageUploaded} 
                progress
                indicating
                inverted
                size="medium"
                className = "progress-bar"
                style = {{margin:"2px 0 0 0",padding:0}}
            />)
        )
    }
}

export default ProgressBar