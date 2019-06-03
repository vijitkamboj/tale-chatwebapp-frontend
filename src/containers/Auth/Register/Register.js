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
		}
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value,errors: [],status:'Register'})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if(this.isFormValid()){
			this.setState({loading:true,errors:[]})
			firebase.auth()
			.createUserWithEmailAndPassword(this.state.email,this.state.password)
			.then( createdUser => {
				console.log(createdUser)
				this.setState({loading:false,status:'Registered'})
			})
			.catch(err => {
				this.setState({errors:this.state.errors.concat(err),loading:false})
			})
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
		if (password !== passwordConfirmation){
			return false;
		}else{
			return true;
		}
	}

	displayError =(errors) => errors.map((error,i) => <p key ={i}>{error.message}</p> );

	handleEnter = (event) =>{
		if (event.keyCode === 13){
			(this.handleSubmit(event))
		}
	}
	

	render(){
		document.body.className = 'reg-back';

		return(
			<div id="register">
				<Logo/>
				<div className="form-cont"  onKeyDown={this.handleEnter}>

					<div className="form-header">Register Yourself</div>
					<div className="field">
						<div className="name">Username</div>
						<input className="form" name="username" type="text" onChange={this.handleChange}/>
					</div>

					<div className="field">
						<div className="name">Email</div>
						<input className="form" name="email" type="email" onChange ={this.handleChange} />
					</div>

					<div className="field">
						<div className="name">Password</div>
						<input className="form" name="password" type="password" onChange={this.handleChange}/>
					</div>

					<div className="field">
						<div className="name">Confirm Password</div>
						<input className="form" name="passwordConfirmation" type="password" onChange={this.handleChange}/>
					</div>
					<Button id="btn-register" onClick={this.handleSubmit} className={this.state.loading ? 'loading' : ''} disabled={this.state.loading}> {this.state.status}</Button>
					{
						this.state.errors.length>0 && (
							<Message error className="error-prompt" id="register">{this.displayError(this.state.errors)}</Message>
						)
					}
					<p id="prompt">Already a user? <Link to="/login" className="authLink" id="login"> LOGIN
					</Link> 
					</p>

				</div>
			</div>
		)
	}
}


export default register;