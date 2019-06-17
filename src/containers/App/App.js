import React,{Component} from 'react';
import './App.css';
import {connect} from "react-redux"
import ColorPanel from "../ColorPanel/ColorPanel"
import SidePanel from "../SidePanel/SidePanel"
import MessagePanel from "../MessagePanel/MessagePanel"
import MetaPanel from "../MetaPanel/MetaPanel"
// import {Grid} from "semantic-ui-react"


class App extends Component {

    componentWillMount(){
        if(!this.props.currentUser){
            this.props.history.go(0)
        }
    }
    
    render(){
        console.log("app");
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
        currentUser: user.currentUser
    })
}

export default connect(mapStateToProps)(App);