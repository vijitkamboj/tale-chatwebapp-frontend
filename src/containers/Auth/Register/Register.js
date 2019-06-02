import React,{ Component } from 'react';
import './Register.css'
import Logo from '../logo'
import {Link} from 'react-router-dom'

class register extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        document.body.className = "reg-back"
        return(
            <div id="register">
                <Logo/>
                <div className="form-cont">
                    <div className="form-header">Register Yourself</div>
                    <div className="field">
                        <div className="name">Username</div>
                        <input name="username" type="text" />
                    </div>
                    <div className="field">
                        <div className="name">Email</div>
                        <input name="email" type="email" />
                    </div>
                    <div className="field">
                        <div className="name">Password</div>
                        <input name="password" type="password" />
                    </div>
                    <div className="field">
                        <div className="name">Confirm Password</div>
                        <input name="passwordConfirmation" type="password" />
                    </div>
                    <div className="btn" >Register</div>
                    <p id="prompt">Already a user? <Link to="/login">LOGIN</Link> </p>
                </div>
            </div>
        )
    }
}


export default register;