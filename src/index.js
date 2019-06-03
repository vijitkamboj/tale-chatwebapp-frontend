import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register'
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';


const Root = () => {
   return(
    <Router >
        <Switch>
            <Route exact path ="/" component = {App}/>
            <Route path ="/login" component = {Login}/>
            <Route path ="/register" component = {Register}/>
        </Switch>
    </Router>
   )
}

ReactDOM.render(<Root />, document.getElementById('root'));


serviceWorker.register();
