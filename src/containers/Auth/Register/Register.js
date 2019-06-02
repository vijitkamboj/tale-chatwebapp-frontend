import React,{ Component } from 'react';
import './Register.css'
import Logo from '../logo'

class register extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div id="register">
                <Logo/>
                <div className="form-cont">
                    <div className="form-header">Register Yourself</div>
                    <div className="field">
                        <div className="name">Username</div>
                        <input name="useranme" type="text" />
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
                </div>
            </div>
        )
    }
}


export default register;