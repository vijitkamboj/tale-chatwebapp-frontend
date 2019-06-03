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
        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then( createdUser => console.log(createdUser))
        .catch(err => console.log(err))

    }
    render(){
        document.body.className = 'reg-back'
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
                    
                    <div className="btn" onClick={this.handleSubmit}><Link to="/login" className="authLink" id="register">Register</Link></div>
                    <p id="prompt">Already a user? <Link to="/login" className="authLink" id="login">LOGIN</Link> </p>
                </div>
            </div>
        )
    }
}


export default register;