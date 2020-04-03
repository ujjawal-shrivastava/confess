import React from 'react';
import {Link}from 'react-router-dom'


export default function FooterBar(){


    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding:5,
            marginTop:18,
            backgroundColor:'#1e272e',
            bottom:0,
            position:"fixed",  
            width:'100%',
            minHeight:50}}>

<Link to='/about'  style={{textDecoration:'none', color:'#ecf0f1'}}> <small style={{color:'#bdc3c7'}}>Developed with ♥ by <strong>me!</strong></small></Link>
        </div>
    )
}