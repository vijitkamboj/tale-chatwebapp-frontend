import React from 'react';
import {Loader , Dimmer} from "semantic-ui-react"

const Screen = () => {
    return(
        <Dimmer active style={{backgroundColor:"rgb(121, 120, 120,0.5)"}}><Loader size = "huge" content ="Preparing Chat..."/></Dimmer>
    )
}

export default Screen;