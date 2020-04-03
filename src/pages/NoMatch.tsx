import React from 'react';
import Typography from '@material-ui/core/Typography';
import image from '../images/404.png';
import { Link } from 'react-router-dom';


function NoMatch(){
    return(
        <div style={{
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'9vh',
        }} >
            <Typography style={{marginTop:10, alignSelf:'center'}}><img style={{ width:280}} src={image} alt='Shouting!'/></Typography>
            <Typography style={{fontSize:21,fontFamily:'Roboto Slab', color:'#ffffff'}}> OOPS! You are lost ... </Typography>
            <Typography variant='body1' style={{fontSize:13,fontFamily:'Roboto Slab', color:'#bdc3c7', textAlign:'center', margin:5, padding:5}}>Page not found! This is page is not in database, link is invalid or the page is deleted by the owner. Go back to <Link to='/' style={{textDecoration:'none', color:'#23c7ab'}}><strong>Home</strong></Link></Typography>
        </div>
    )

}

export default NoMatch;