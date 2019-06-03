import React,{ Component } from 'react';
import {Link} from 'react-router-dom'
import firebase from '../../../firebase'
import './Register.css'

import Logo from '../logo';
import Nav from '../../../components/Nav/Nav'


class register extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            email: '',
            password:'',
            passwordConfirmation:'',
            errors: []
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit = (event) => {
        if(this.isFormValid()){
            event.preventDefault();
            firebase.auth()
            .createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then( createdUser => console.log(createdUser))
            .catch(err => console.log(err))
        }
    }

    isFormValid = () => {
        let errors = []
        let error
        if (this.isFormEmpty(this.state)) {
            error = { message: "Fill in all fields"}
            this.setState({errors : errors.concat(error)})
            return false;
        } else if(!this.isPasswordValid(this.state)){
            error = { message: "Password ain't valid"}
            this.setState({errors : errors.concat(error)})
            return false
        }else{
        return true
        }
    }

    isFormEmpty = ({username,email,password,passwordConfirmation}) =>{
        return(
        !username.length || !email.length || !password.length || !passwordConfirmation.length
        )}

    isPasswordValid = ({password , passwordConfirmation}) => {
        if ( password.length<6 || passwordConfirmation.length<6){
            return false;
        }else if (password !== passwordConfirmation){
            return false;
        }else{
            return true;
        }
    }

    render(){
        document.body.className = 'reg-back';

        return(
            <div id="register">
                <Nav />
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

                    <p id="prompt">Already a user? 
                    <Link to="/login" className="authLink" id="login">
                    LOGIN
                    </Link> 
                    </p>

                </div>
            </div>
        )
    }
}


export default register;