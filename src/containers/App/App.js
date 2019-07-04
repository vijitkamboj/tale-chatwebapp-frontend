import React,{Component} from 'react';
import './App.css';

import ColorPanel from "../ColorPanel/ColorPanel"
import SidePanel from "../SidePanel/SidePanel"
import MessagePanel from "../MessagePanel/MessagePanel"
import MetaPanel from "../MetaPanel/MetaPanel"

import {connect} from "react-redux"

class App extends Component {

    componentWillMount(){
        if(!this.props.currentUser){
            this.props.history.go(0)
        }
    } // before the component is mounted , making sure that there is signedIn user , if not refresh the page so that it redirects to home

    
    render(){
        document.body.className = "app-body"
            return(
                <div id="app">
                    <ColorPanel />
                    <SidePanel currentUser={this.props.currentUser}/>
                    <MessagePanel currentChannel= {this.props.currentChannel} currentUser={this.props.currentUser} />  
                    <MetaPanel />
                </div>
            )
       
    } // rendering the chat console component
}

const mapStateToProps = ({user,channel}) => {
    return({
        currentUser: user.currentUser,
        currentChannel : channel.currentChannel
    })
} // providing global state to the component

export default connect(mapStateToProps)(App);