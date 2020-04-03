import * as  React from 'react';
import {Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GiveAd from './AdsList';
import {  Button } from '@material-ui/core';
const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        minWidth:200,
    },
    AdButton: {
        background: '#130f40',
        maxHeight:30,
        alignSelf:'center',
        justifySelf:'center',
        marginLeft:'auto',
        marginRight:'auto'
      },
})

function AdCard(props:any){
    const classes = useStyles();
    const ad = GiveAd()
    const handleAdClick= ()=>{
        window.open(ad.link, '_blank')
    }
    return (
        <div>
            <Card className={classes.root} style={{
            display: 'flex',
            marginTop:16,
            alignItems: 'center',
        }} >
            
            <img  alt="Ad Banner"src={ad.source} onClick={handleAdClick} style={{height:145}} />
    <Button onClick={handleAdClick} className={classes.AdButton} color="primary" variant="contained" disableElevation size="small" >{ad.text}</Button>            
            </Card>
        </div>
    )

}

export default AdCard;
