import React from 'react';
import logo from './logo.png'

const Logo = ({Link}) => <Link to = "/" style={{margin : "8px" , alignSelf : "flex-start"}}>
                            <img 
                            src={logo} 
                            alt="logo" 
                            id="logo" 
                            height="150px" 
                            width="auto" 
                            
                            />
                        </Link> 

export default Logo