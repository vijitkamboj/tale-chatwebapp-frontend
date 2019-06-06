import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import Home from './components/Home/Home';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register';
import App from './components/App/App';
import LoadingScreen from "./LoadingScreen"

import * as serviceWorker from './serviceWorker';


import {composeWithDevTools} from 'redux-devtools-extension'
import {BrowserRouter as Router , Switch , Route ,withRouter} from 'react-router-dom';

import firebase from './firebase';

import {createStore} from 'redux';
import {Provider ,connect} from 'react-redux';
import rootReducer from "./reducers";
import {setUser} from "./actions/index"

const store = createStore( rootReducer , composeWithDevTools()) //created store for global state


class Root extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                this.props.setUser(user)
                this.props.history.push("/")
            }
        })
    } // automatically routing the user to app if user is logged in 

    render(){
        document.body.className = 'none';
        return this.props.isLoading ? <LoadingScreen /> : (
            <Switch>
                <Route exact path ="/" component = {App}/>
                <Route path ="/home" component = {Home}/>
                <Route path ="/login" component = {Login}/>
                <Route path ="/register" component = {Register}/>
            </Switch>
        ) 
    }
}

const mapStateFromProps = (state) => ({isLoading:state.user.isLoading})


const RootWithAuth = withRouter(connect( mapStateFromProps ,{setUser})(Root));  // higher order component

ReactDOM.render(<Provider store = {store}><Router><RootWithAuth /></Router></Provider>, document.getElementById('root'));


serviceWorker.register();
