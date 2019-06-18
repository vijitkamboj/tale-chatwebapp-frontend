import React,{Component} from 'react';
import './App.css';

import ColorPanel from "../ColorPanel/ColorPanel"
import SidePanel from "../SidePanel/SidePanel"
import MessagePanel from "../MessagePanel/MessagePanel"
import MetaPanel from "../MetaPanel/MetaPanel"

import {connect} from "react-redux"
import {changeRegisterStatus} from "../../actions/index"

class App extends Component {

    componentWillMount(){
        if(!this.props.currentUser){
            this.props.history.go(0)
        }
    } 

    // componentWillUnmount(){
    //     // on the basis of 
    // }
    
    render(){
        document.body.className = "app-body"
            return(
                <div id="app">
                    <ColorPanel />
                    <SidePanel currentUser={this.props.currentUser}/>
                    <MessagePanel />
                    <MetaPanel />
                </div>
            )
       
    }
}
const mapStateToProps = ({user}) => {
    return({
        currentUser: user.currentUser,
        register_status:user.register_status
    })
}

export default connect(mapStateToProps,{changeRegisterStatus})(App);