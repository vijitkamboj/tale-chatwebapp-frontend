import React,{ Component } from 'react';
import {Link} from 'react-router-dom'

import firebase from '../../../firebase'

import { Button,Message } from 'semantic-ui-react';
import Logo from '../Logo';

import {changeRegisterStatus} from "../../../actions/index";
import {connect} from "react-redux"

class login extends Component {
	constructor(){
		super()
		this.state = {
			email: '',
			password:'',
			errors: [],
			loading:false,
		}  // defining state for login form
	}

	componentDidMount(){
		this.props.changeRegisterStatus(null,null)
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
			errors: [],
		})
	} // method to handle change in the feilds

	handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid){

            this.setState({
                loading: true,
                error: []
            })

            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .catch( err => {
                    this.setState({
                        loading:false,
                        errors : this.state.errors.concat(err)
                    })
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
		}else {
			return true
		}
	} // method to check if form is valid

	isFormEmpty = ({email,password}) =>{
		return(
		!email.length || !password.length
	)} // method to check if form is empty

	displayError =(errors) => errors.map((error,i) => <p key ={i}>{error.message}</p> ); // Generates <p> tags based on errors

	handleEnter = (event) =>{
		if (event.keyCode === 13){
			(this.handleSubmit(event))
		}
	} // checks if ENTER key is pressed

	render(){
		document.body.className = 'reg-back'; // change the background when routed to login component

		const {
			email,
			password,
			loading,
			errors
		} = this.state;
		const {
			handleChange,
			handleEnter,
			handleSubmit,
			displayError
		} = this

		return(
			<div id="login">
				<Logo Link = {Link}/>
				<div className="form-cont"  onKeyDown={handleEnter}>

					<div className="form-header">
                        Login
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

					<Button 
					id="btn-login" 
					onClick={handleSubmit} 
					className={loading ? 'loading' : ''} 
					disabled={loading}
					> 
						Login
					</Button>

					{
						errors.length > 0 && (
						<Message 
						error 
						className="error-prompt" 
						id="login"
						>
							{displayError(errors)}
						</Message>
						)
					}
					
					<p id="suggestion">
						Haven't Regitered ?
						<Link 
						to="/register" 
						className="authLink" 
						id="login"
						>
							{" Register"}
						</Link> 
					</p>

				</div>
			</div>
		)
	}
}

const mapStateToProps =(state)=>{
	return({
		register_status:state.user.register_status
	})
}

export default connect(mapStateToProps,{changeRegisterStatus})(login);