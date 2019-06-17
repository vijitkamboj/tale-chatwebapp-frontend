import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import Home from './components/Home/Home';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register';
import App from './containers/App/App';
import LoadingScreen from "./LoadingScreen"

import * as serviceWorker from './serviceWorker';


import {composeWithDevTools} from 'redux-devtools-extension'
import {BrowserRouter as Router , Switch , Route ,withRouter} from 'react-router-dom';

import firebase from './firebase';

import {createStore} from 'redux';
import {Provider ,connect} from 'react-redux';
import rootReducer from "./reducers";
import {setUser,clearUser} from "./actions/index"

const store = createStore( rootReducer , composeWithDevTools()) //created store for global state


    
class Root extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(currentUser => {
            if (currentUser) {
                setTimeout(() => {
                    this.props.setUser(currentUser)
                    this.props.history.push("/app")
                }, 1500)
            } else {
                this.props.history.push("/home")
                this.props.clearUser();
            }
        })
    } // automatically routing the user to chat  console on refreshing if user is already logged in 

    render(){
        console.log("index")
        document.body.className = 'none';
        return this.props.isLoading ? <LoadingScreen /> : (
            <Switch>
                <Route exact path ="/app" component = {App} history={this.props.history} />
                <Route path ="/home" component = {Home}/>
                <Route path ="/login" component = {Login}/>
                <Route path ="/register" component = {Register}/>
            </Switch>
        ) 
    }
}

const mapStateToProps = (state) => ({isLoading:state.user.isLoading}) 


const RootWithAuth = withRouter(connect( mapStateToProps ,{setUser,clearUser})(Root));  //connect (mapStateToProps , mapDispatchToProps)
// higher order component and pass isLoading state and setUser method as props to Root Componenet

ReactDOM.render(<Provider store = {store}><Router><RootWithAuth /></Router></Provider>, document.getElementById('root'));


serviceWorker.register();
