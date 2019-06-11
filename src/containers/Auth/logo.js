import React from 'react';
import logo from './logo.png'

const Logo = ({Link}) => <Link to = "/home" style={{margin : "8px" , alignSelf : "flex-start" , backgroundColor: "rgb(68,79,90,0.15)", borderRadius:"18px"}}>
                            <img 
                            src={logo} 
                            alt="logo" 
                            id="logo" 
                            height="150px" 
                            width="auto" 
                            
                            />
                        </Link> 

export default Logo