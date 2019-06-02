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

                </div>
            </div>
        )
    }
}


export default register;