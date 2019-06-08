import React from 'react';
import './App.css';
import ColorPanel from "../ColorPanel/ColorPanel"
import SidePanel from "../SidePanel/SidePanel"
import MessagePanel from "../MessagePanel/MessagePanel"
import MetaPanel from "../MetaPanel/MetaPanel"
// import {Grid} from "semantic-ui-react"


const App = () => {
    return(
        <div id="app">
            <ColorPanel />
            <SidePanel />
            <MessagePanel />
            <MetaPanel />
        </div>
    )
}

export default App;