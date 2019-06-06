import React,{ Component } from 'react';
import {Link} from 'react-router-dom'
import firebase from '../../../firebase'
import './Register.css';
import { Button,Message } from 'semantic-ui-react';
import md5 from 'md5'

import Logo from '../Logo';



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
			status:'Register',
			userFire : firebase.firestore(),
			userRef: firebase.database().ref('users')
		}  // defining state for registration form
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
			errors: [],
			status: 'Register'
		}) // clering errors and status to register and fiels states
	} // method to handle change in the feilds

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.isFormValid()) {

			this.setState({
				loading: true,
				errors: []
			}) // starting loading and clearing previous errors

			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password) // registering user
				.then(createdUser => {

					createdUser.user.updateProfile({
							displayName: this.state.username,
							photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
						}) // updating the registered user profile
						.then(
							() => {
								const temp = createdUser
								this.saveUser(temp)
								.then(()=> {
									this.setState({
										loading: false,
										status: 'Registered',
										password: '',
										passwordConfirmation: ''
									}) // stop loading and change status and clear password fields
								})

								.catch(err => {
									this.setState({
										errors: this.state.errors.concat({message:"Registered you but error while saving your profile"}),
									}) // concat erorr
								})
							}
						)
						.catch(err => this.setState({
							errors: this.state.errors.concat({message:"Registered you but error while updating your profile"}),
						})) // concat error
				})
				.catch(err => {
					this.setState({
						errors: this.state.errors.concat(err),
						loading: false
					}) // stop loading and concat erorrs
				})
		}
	} // method to handle the submit event

	saveUser = (createdUser) => {
			return(
				this.state.userRef.child(createdUser.user.uid).set({
					name:createdUser.user.displayName,
					avatar:createdUser.user.photoURL
				}
			)
		)
	}// saving extra info about users in database

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

	displayError =(errors) => errors.map((error,i) => <p key ={i}>{error.message}</p> ); // Generates <p> tags based on errors

	handleEnter = (event) =>{
		if (event.keyCode === 13){
			(this.handleSubmit(event))
		}
	} // checks if ENTER key is pressed

	render(){
		document.body.className = 'reg-back'; // change the background when routed to register component

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
				<Logo Link = {Link}/>
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
						Already a user ? 
						<Link 
						to="/login" 
						className="authLink" 
						id="register"
						>
							{" Login"}
						</Link> 
					</p>

				</div>
			</div>
		)
	}
}


export default register;