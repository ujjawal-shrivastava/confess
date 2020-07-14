import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../images/logo.png';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import image2 from '../images/details-pic.png';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CopyToClipboard from 'clipboard-copy'
import ShareBox from '../components/ShareBox';
import LockIcon from '@material-ui/icons/Lock';
import ShareIcon from '@material-ui/icons/Share';


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
    const pageId = props.data.createPage.page.pageId
    const pin = props.data.createPage.page.pin
    const [openShare, setOpenShare]= React.useState(false)

    const handleShare = () =>{
        setOpenShare(true)
      }
    
      const handleShareClose = ()=>{
        setOpenShare(false)
      }

    return (
        <Dialog fullScreen open={true} TransitionComponent={Transition} >
            <AppBar className={classes.appBar} position='sticky'>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to='/'><img src={logo} alt="Logo" height="25px" /></Link>
                    </Typography>
                    <Button startIcon={<LockIcon/>} component={Link} to='/login' color="primary" variant="contained" disableElevation size="medium">LOGIN</Button>
                </Toolbar>
            </AppBar>
            <Typography style={{ marginTop: 10, alignSelf: 'center' }}><img style={{ width: 200 }} src={image2} alt='Success!' /></Typography>
            <Typography style={{ marginBottom: 12, fontFamily: 'Sintony', alignSelf: 'center', fontSize: 18 }}><strong>Great!</strong> Your page is <strong>live</strong> .. </Typography>
            <div style={{ padding: 20 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography style={{ fontSize: 18, fontFamily: 'Montserrat' }}>
                        PAGE ID -
                </Typography>
                    <Typography style={{ marginLeft: 5, color: '#e74c3c', fontSize: 21, fontFamily: 'Montserrat' }}>
                        {pageId}
                    </Typography>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography style={{ fontSize: 18, fontFamily: 'Montserrat' }}>
                        PIN -
                </Typography>
                    <Typography style={{ marginLeft: 5, color: '#e74c3c', fontSize: 21, fontFamily: 'Montserrat' }}>
                        {pin}
                    </Typography>
                </div>
                <div>
                    <Typography style={{ marginTop: 12, padding: 20, color: '#6ab04c', fontSize: 21, fontFamily: 'Sintony', textAlign: 'center' }} >
                        <u><strong><Link style={{ color: '#6ab04c' }} to={`/${pageId}`} target='_blank' >confess.ujjawal.co/{pageId}</Link></strong></u>

                        <IconButton aria-label="copy" onClick={() => CopyToClipboard('confess.ujjawal.co/'+pageId)}>
                            <FileCopyIcon fontSize="default" />
                        </IconButton>


                    </Typography>

                </div>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10
            }}>
                <Button startIcon={<LockIcon/>} component={Link} to='/login' color="primary" variant="contained" disableElevation size="large" style={{ marginRight: 8, width:160 }}>LOGIN</Button>
                <Button startIcon={<ShareIcon/>} onClick={handleShare} color="primary" variant="contained" disableElevation size="large" style={{ marginLeft: 8, width:160 }} >SHARE</Button>
            </div>
            <Typography style={{ marginTop: 8, fontSize: 23, fontFamily: 'Montserrat', textAlign: 'center' }}>
                <strong>⚠ ATTENTION ⚠</strong>
            </Typography>
            <Typography style={{ textAlign: 'center', padding: 10, margin: 12, fontFamily: 'Sintony', alignSelf: 'center', fontSize: 11 }}>Please take a <strong>SCREENSHOT</strong> of this page! This page with essential info will not be available again and without the <i>PAGE ID</i> & <i>PIN</i> you will not be able to access/manage/share your page!</Typography>
            {(openShare)?<ShareBox handleShareClose={handleShareClose} pageId={pageId}/>:null}
        </Dialog>
    )
}

export default DetailsBox;

