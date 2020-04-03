import React from 'react';
import image from '../images/profile-pic.png';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function About(){
    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'column',
            margin: 30,
            minHeight:560,
            height:'100%',
        }}>
            <Typography style={{ alignSelf: 'center', margin:20, marginBottom:0}}><img style={{ width:210 }} src={image} alt='Ujjawal Shrivastava' /> </Typography>
            <Typography style={{ fontSize: 24, fontFamily: 'Sintony', color: '#ffffff', textAlign:'center', paddingTop:10 }}><strong>UJJAWAL SHRIVASTAVA</strong></Typography>
            <Typography style={{ paddingBottom:20,fontSize: 16, fontFamily: 'Roboto Slab', color: '#ffffff', textAlign: 'center'}}> Student, University of Delhi</Typography>  
            <Typography style={{ paddingBottom:20,fontSize: 16, fontFamily: 'Roboto Slab', color: '#ffffff', textAlign: 'center', margin:10 }}> Made this app in <strong style={{color:'#1abc9c'}}>#QuarantineDays</strong></Typography> 
            <Button startIcon={<WhatsAppIcon/>}href="https://wa.me/919910524015?text=Hey+Ujjawal%21+I+just+visited+the+Confess+App+..." target="_blank" color="primary" variant="contained" disableElevation size="large" style={{width:300, margin:10}} >WHATSAPP</Button>
            <Button startIcon={<MailOutlineIcon/>}href="mailto:ujjawalshrivastava19@gmail.com" target="_blank" color="primary" variant="contained" disableElevation size="large" style={{width:300, margin:10}} >EMAIL</Button>
            <Typography style={{padding:10, margin:20, fontFamily:'Montserrat',color:'#808e9b', fontSize:11}}>"Change the game, don’t let the game <strong>change you</strong>!"</Typography>
        </div>
    )

}

export default About;