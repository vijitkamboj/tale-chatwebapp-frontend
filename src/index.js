import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Home from './components/Home/Home';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register';
import App from './containers/App';

import * as serviceWorker from './serviceWorker';

import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase'

import {BrowserRouter as Router , Switch , Route ,withRouter} from 'react-router-dom';


class Root extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                console.log(user)
                this.props.history.push("/")
            }
        })
    }

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

const RootWithAuth = withRouter(Root);

ReactDOM.render(<Router><RootWithAuth /></Router>, document.getElementById('root'));


serviceWorker.register();
