import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../images/logo.png';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import image2 from '../images/share-pic.png';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CopyToClipboard from 'clipboard-copy'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
//import InstagramIcon from '@material-ui/icons/Instagram';
//import TwitterIcon from '@material-ui/icons/Twitter';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
        marginTop: 10
    },
}
);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DetailsBox(props: any) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const pageId = props.pageId;
    let msg = `Hey! Secretly Confess something to or about me on this awesome Confess App..\n\nconfess.cf/${pageId}`
    msg = encodeURIComponent(msg)
    let msg2 = `https://confess.cf/${pageId}`
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition} >
            <AppBar className={classes.appBar} position='sticky'>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to='/'><img src={logo} alt="Logo" height="25px" /></Link>
                    </Typography>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => { setOpen(false); props.handleShareClose() }} autoFocus type="submit" color="inherit">
                        Back
                    </Button>
                </Toolbar>
            </AppBar>
            <Typography style={{ marginTop: 23, alignSelf: 'center' }}><img style={{ width: 200 }} src={image2} alt='Share!' /></Typography>
            <Typography style={{ fontFamily: 'Sintony', alignSelf: 'center', fontSize: 18 }}><strong>SHARE PAGE</strong></Typography>
            <Typography style={{ padding: 10, margin: 5, fontFamily: 'Sintony', textAlign: 'center', fontSize: 13 }}>With this link, one can visit and write confessions on this page...</Typography>
            <div style={{ paddingBottom: 16 }}>
                <div>
                    <Typography style={{ padding: 5, color: '#6ab04c', fontSize: 21, fontFamily: 'Sintony', textAlign: 'center' }} >
                        <u><strong><Link style={{ color: '#6ab04c' }} to={`/${pageId}`} target='_blank' >confess.cf/{pageId}</Link></strong></u>
                        <IconButton aria-label="copy" onClick={() => CopyToClipboard('confess.cf/' + pageId)}>
                            <FileCopyIcon fontSize="default" />
                        </IconButton>
                    </Typography>
                </div>
            </div>
            <Typography style={{ marginBottom:20,fontFamily: 'Sintony', alignSelf: 'center', fontSize: 18 }}><strong>SOCIAL PLATFORMS</strong></Typography>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10
            }}>
                <Button href={`whatsapp://send?text=${msg}`} target='_blank' startIcon={<WhatsAppIcon />} color="primary" variant="contained" disableElevation size="large" style={{ marginRight: 8,width:160 }}>WHATSAPP</Button>
                <Button href={`https://www.facebook.com/sharer/sharer.php?u=${msg2}`} target="_blank" startIcon={<FacebookIcon />} color="primary" variant="contained" disableElevation size="large" style={{ marginRight: 8,width:160 }}>FACEBOOK</Button>
            </div>
            {/*<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10
            }}>
                <Button startIcon={<FacebookIcon />} color="primary" variant="contained" disableElevation size="large" style={{ marginRight: 8,width:160 }}>FACEBOOK</Button>
                <Button startIcon={<TwitterIcon />} color="primary" variant="contained" disableElevation size="large" style={{ marginLeft: 8,width:160 }} >TWITTER</Button>
        </div>*/}
            <Typography style={{ textAlign: 'center', padding: 10, margin: 12, fontFamily: 'Sintony', alignSelf: 'center', fontSize: 11 }}>Copyright 2020. <strong>confess.cf</strong> by <strong>Ujjawal Shrivastava</strong></Typography>
        </Dialog>
    )
}

export default DetailsBox;

