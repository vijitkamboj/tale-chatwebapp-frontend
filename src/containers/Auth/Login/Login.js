import React, { Component } from 'react';
import Logo from '../logo'

class login extends Component {
    render(){
        document.body.className = "reg-back";
        return(
            <div id="login">
                <Logo/>
                <div className="form-cont">
                    <div className="form-header">Login</div>
                    <div className="field">
                        <div className="name">Email</div>
                        <input name="email" type="email" />
                    </div>
                    <div className="field">
                        <div className="name">Password</div>
                        <input name="password" type="password" />
                    </div>
                    <div className="btn" >Login</div>
                </div>
            </div>
        )
    }
}

export default login;