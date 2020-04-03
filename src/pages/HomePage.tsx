import React from 'react';
import image from '../images/home-pic.png';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import PostAddIcon from '@material-ui/icons/PostAdd';

function Home(){
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
            <Typography style={{ fontSize: 18, fontFamily: 'Sintony', color: '#ffffff', textAlign:'center', padding:10 }}> GET TO KNOW WHAT <strong style={{color:'#f9ca24'}}> PEOPLE ACTUALLY THINK </strong>ABOUT YOU! </Typography>
            <Typography style={{ alignSelf: 'center', margin:20, marginBottom:30}}><img style={{ width:260 }} src={image} alt='Creating!' /> </Typography>  
            <Button startIcon={<PostAddIcon/>}component={Link} to='/create' color="primary" variant="contained" disableElevation size="large" style={{width:300}} >CREATE PAGE</Button>
            <Typography style={{ paddingTop:20,fontSize: 16, fontFamily: 'Roboto Slab', color: '#ffffff', textAlign: 'center', margin:10 }}> People can visit your page and can write SECRET CONFESSIONS! Their name is not revealed and they can still write their heart out..</Typography>
        </div>
    )

}

export default Home;