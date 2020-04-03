import React from 'react';
import Typography from '@material-ui/core/Typography';
import image from '../images/private-pic.png';


export default function PrivateBox(){


    return(
        <div style={{
            alignItems: 'center',
            justifyContent: 'center',
            display:'flex',
            flexDirection:'column',
            margin:20
        }} >
            <Typography style={{marginTop:10, alignSelf:'center'}}><img style={{ width:200}} src={image} alt='Shouting!'/></Typography>
            <Typography style={{fontSize:18,fontFamily:'Roboto Slab', color:'#ffffff'}}> OOPS! This Page is Private ... </Typography>
            <Typography variant='body1' style={{fontSize:11,fontFamily:'Roboto Slab', color:'#bdc3c7', textAlign:'center', margin:5, padding:5}}> You can still write a Secret Confession to the page owner. But the confessions written by you and others will not be public. So just confess out!</Typography>
        </div>
    )
}