import React,{ Component } from 'react';
import {Link} from 'react-router-dom'
import firebase from '../../../firebase'
import './Register.css';
import { Button,Message } from 'semantic-ui-react'

import Logo from '../logo';



class register extends Component {
	constructor(){
		super()
		this.state = {
			username:'',
			email: '',
			password:'',
			passwordConfirmation:'',
			errors: [],
			loading:false,
			status:'Register'
		}  // defining state for registration form
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
			errors: [],
			status: 'Register'
		}) // clering errors and status to register
	} // method to handle change in the feilds

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.isFormValid()) {

			this.setState({
				loading: true,
				errors: []
			}) // starting loading and clearing previous errors

			firebase.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password) // creating user
				.then(createdUser => {
					this.setState({
						loading: false,
						status: 'Registered',
						password: '',
						passwordConfirmation: ''
					}) // stop loading and change status to registered
				})
				.catch(err => {
					this.setState({
						errors: this.state.errors.concat(err),
						loading: false
					}) // stop loading and concat erorrs
				})
		}
	} // method to handle the submit event

	isFormValid = () => {
		let errors = []
		let error
		if (this.isFormEmpty(this.state)) {
			error = {
				message: "Fill in all fields"
			}
			this.setState({
				errors: errors.concat(error)
			})
			return false;
		} else if (!this.isPasswordValid(this.state)) {
			error = {
				message: "Password not confirmed"
			}
			this.setState({
				errors: errors.concat(error)
			})
			return false
		} else {
			return true
		}
	} // method to check if form is valid

	isFormEmpty = ({username,email,password,passwordConfirmation}) =>{
		return(
		!username.length || !email.length || !password.length || !passwordConfirmation.length
	)} // method to check if form is empty

	isPasswordValid = ({password , passwordConfirmation}) => {
		if (password !== passwordConfirmation){
			return false;
		}else{
			return true;
		}
	} // method to check if password is confirmed

	displayError =(errors) => errors.map((error,i) => <p key ={i}>{error.message}</p> );

	handleEnter = (event) =>{
		if (event.keyCode === 13){
			(this.handleSubmit(event))
		}
	}
	

	render(){
		document.body.className = 'reg-back';

		const {
			username,
			email,
			password,
			passwordConfirmation,
			loading,
			status,
			errors
		} = this.state;
		const {
			handleChange,
			handleEnter,
			handleSubmit,
			displayError
		} = this

		return(
			<div id="register">
				<Logo/>
				<div className="form-cont"  onKeyDown={handleEnter}>

					<div className="form-header">
						Register Yourself
					</div>

					<div className="field">
						<div className="name">
							Username
						</div>

						<input 
						className="form" 
						name="username" 
						type="text" 
						onChange={handleChange}
						value = {username}
						/>
					</div>

					<div className="field">
						<div className="name">
							Email
						</div>

						<input 
						className="form" 
						name="email" 
						type="email" 
						onChange ={handleChange} 	
						value= {email}
						/>
					</div>

					<div className="field">
						<div className="name">
							Password
						</div>

						<input 
						className="form" 
						name="password" 
						type="password" 
						onChange={handleChange}
						value = {password}
						/>
					</div>

					<div className="field">
						<div className="name">
							Confirm Password
						</div>

						<input 
						className="form" 
						name="passwordConfirmation" 
						value= {passwordConfirmation}
						type="password" 
						onChange={handleChange}
						/>
					</div>

					<Button 
					id="btn-register" 
					onClick={handleSubmit} 
					className={loading ? 'loading' : ''} 
					disabled={loading}
					> 
						{status}
					</Button>

					{
						errors.length > 0 && (
						<Message 
						error 
						className="error-prompt" 
						id="register"
						>
							{displayError(errors)}
						</Message>
						)
					}
					
					<p id="suggestion">
						Already a user? 
						<Link 
						to="/login" 
						className="authLink" 
						id="login"
						>
							 LOGIN
						</Link> 
					</p>

				</div>
			</div>
		)
	}
}


export default register;