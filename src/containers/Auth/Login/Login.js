import React, { Component } from 'react';
import Logo from '../logo';
import Nav from '../../../components/Nav/Nav';
import {Link} from 'react-router-dom';
import { Button } from 'semantic-ui-react'

class login extends Component {
    render(){
        document.body.className = "reg-back";
        return(
            <div id="login">
            <Nav />
                <Logo/>
                <div className="form-cont">
                    <div className="form-header">Login</div>
                    <div className="field">
                        <div className="name">Email</div>
                        <input className="form" name="email" type="email" />
                    </div>
                    <div className="field">
                        <div className="name">Password</div>
                        <input className="form" name="password" type="password" />
                    </div>
                    <Button id="btn-login" onClick={this.handleSubmit} >Login</Button>
                    <p id="prompt">Haven't Registered? <Link to="/register" className="authLink" id="register"> REGISTER</Link></p>
                </div>
            </div>
        )
    }
}

export default login;