import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


interface props {
    name:string;
    totalConfessions:number;
    isPublic : boolean;
    pageId: string;
}

const useStyles = makeStyles({
    tagline:{
        fontSize:10,
        fontFamily:'Roboto',
        color:'rgb(178, 190, 195)'
    },


    name:{
        fontSize:'1.3em',
        fontFamily:'Montserrat',
        color:'#A3CB38',
        padding:2
    },

    details:{
        fontSize:16,
        fontFamily:'Montserrat',
        color:'rgb(178, 190, 195)'
    },



});

 const TitleBar: React.SFC<props> = (props) => {

    const classes = useStyles();
    return(
        <div style={{textAlign:'center', margin:26 }}>
            <Typography className={classes.tagline}> HERE'S THE CONFESSION PAGE FOR <strong>#{props.pageId}</strong> </Typography>
            <Typography><img width={100} style={{marginTop:8, borderRadius:50, width:80, border:'6px solid #34495e'}} alt='Profile'
            src={'https://avatars.dicebear.com/v2/initials/'+props.name+'.svg?options[radius]=50&options[background]=%232c3e50&options[bold]=1'}
/> </Typography>
            <Typography className={classes.name}> {props.name.toUpperCase()} </Typography>
            <Typography className={classes.details}> {props.totalConfessions} Confessions • {props.isPublic ? 'Public' : 'Private'}</Typography>
        </div>
    );

}

export default TitleBar;

