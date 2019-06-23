import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom'
const Nav = () => {
    return(
        <div id="nav">
            <div className="navbtn"><Link to="/home" className='links'>Home</Link></div>
            <div className="navbtn"><Link to="/home#about" className='links'>About</Link></div>
            <div className="navbtn"><Link to="/login" className='links'>Login</Link></div>
            <div className="navbtn"><Link to="/register" className='links'>Register</Link></div>
        </div>
    )
}

export default Nav;