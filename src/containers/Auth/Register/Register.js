import React,{ Component } from 'react';
import './Register.css'
import Logo from '../logo'
import {Link} from 'react-router-dom'
import firebase from '../../../firebase'

class register extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            email: '',
            password:'',
            passwordConfirmation:''
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault();

    }
    render(){
        return(
            <div id="register">
                <Logo/>
                <div className="form-cont">
                    <div className="form-header">Register Yourself</div>
                    <div className="field">
                        <div className="name">Username</div>
                        <input name="username" type="text" onChange={this.handleChange}/>
                    </div>
                    <div className="field">
                        <div className="name">Email</div>
                        <input name="email" type="email" onChange ={this.handleChange} />
                    </div>
                    <div className="field">
                        <div className="name">Password</div>
                        <input name="password" type="password" onChange={this.handleChange}/>
                    </div>
                    <div className="field">
                        <div className="name">Confirm Password</div>
                        <input name="passwordConfirmation" type="password" onChange={this.handleChange}/>
                    </div>
                    <div className="btn" onClick={this.handleSubmit}>Register</div>
                    <p id="prompt">Already a user? <Link to="/login">LOGIN</Link> </p>
                </div>
            </div>
        )
    }
}


export default register;