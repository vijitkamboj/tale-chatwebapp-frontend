import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Home from './components/Home/Home';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register';
import App from './containers/App';

import * as serviceWorker from './serviceWorker';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import {BrowserRouter as Router , Switch , Route ,withRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase'

const store = createStore(() => {} , composeWithDevTools())


class Root extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                this.props.history.push("/")
            }
        })
    } // automatically routing the user to app if user is logged in 

    render(){
        document.body.className = 'none';
        return(
            <Switch>
                <Route exact path ="/" component = {App}/>
                <Route path ="/home" component = {Home}/>
                <Route path ="/login" component = {Login}/>
                <Route path ="/register" component = {Register}/>
            </Switch>
        )
    }
}

const RootWithAuth = withRouter(Root);  // higher order component

ReactDOM.render(<Provider store = {store}><Router><RootWithAuth /></Router></Provider>, document.getElementById('root'));


serviceWorker.register();
