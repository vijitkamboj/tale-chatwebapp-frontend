import React from 'react';
import './App.css';
import {connect} from "react-redux"
import ColorPanel from "../ColorPanel/ColorPanel"
import SidePanel from "../SidePanel/SidePanel"
import MessagePanel from "../MessagePanel/MessagePanel"
import MetaPanel from "../MetaPanel/MetaPanel"
// import {Grid} from "semantic-ui-react"


const App = ({currentUser}) => {
    document.body.className = "app-body"
    return(
        <div id="app">
            <ColorPanel />
            <SidePanel currentUser={currentUser}/>
            <MessagePanel />
            <MetaPanel />
        </div>
    )
}
const mapStateToProps = ({user}) => {
    return({
        currentUser: user.currentUser
    })
}

export default connect(mapStateToProps)(App);