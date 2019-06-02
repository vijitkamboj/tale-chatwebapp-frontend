import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';



ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.register();
