import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import AddIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import { getAllConfessionsQuery,addConfessionMutation, getPageQuery } from '../queries/queries';
import { graphql } from 'react-apollo';
import image from '../images/confess-form.png';
import logo from '../images/logo.png';
import ShareBox from '../components/ShareBox';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      marginTop:10
    },

    buttons:{
      margin:5
    }
  }),
);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfessionForm(props:any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [titleShort, setTitleShort]=React.useState(true);
  const [contentShort, setContentShort]= React.useState(true);
  const [openShare, setOpenShare]= React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShare = () =>{
    setOpenShare(true)
  }

  const handleShareClose = ()=>{
    setOpenShare(false)
  }

  const handleSubmit = () =>{

    if (titleShort||contentShort) {
      return null
    }
    else{
      props.addConfessionMutation({
        variables:{
          title:title,
          content:content,
          pageId:props.pageId,
        },
        refetchQueries:props.isPublic?[
          {query:getPageQuery, variables: { id: props.pageId }},
          {query:getAllConfessionsQuery, variables: { pageId: props.pageId }}]:[
            {query:getPageQuery, variables: { id: props.pageId }}]     
        })
      setTitle("")
      setContent("")
      handleClose()
    }
     
  }

  return (
    <div style={{ textAlign: 'center' }} >
      <Button className={classes.buttons} variant="contained" startIcon={<AddIcon />} color="secondary" onClick={()=>{handleClickOpen()}}>
        Your Secret Confession
      </Button>
      <Button onClick={handleShare} className={classes.buttons} variant="contained" startIcon={<ShareIcon />} color="primary">
        Share
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >
        
        <AppBar className={classes.appBar} position='sticky'>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            <Link to='/'><img src={logo} alt="Logo" height="25px"/></Link>
            </Typography>
            <Button autoFocus type="submit" color="inherit" onClick={handleSubmit} startIcon={<SendIcon />}>
              SUBMIT
            </Button>
          </Toolbar>
        </AppBar>
        <Typography style={{marginTop:10, alignSelf:'center'}}><img style={{ width:200}} src={image} alt='Shouting!'/></Typography>
        <Typography style={{ marginBottom:12,fontFamily:'Sintony', alignSelf:'center', fontSize:16}}><strong>Scream n Shout</strong> & <strong>Let it all out</strong> !! </Typography>
        <form style ={{padding:5, margin:5, textAlign:'center'}} noValidate autoComplete="off">
          <TextField 
          id="confession-title" 
          label="Title"
          placeholder="Give a short (at least 10 chars.) title to your confession!" 
          variant="outlined"
          defaultValue={title}
          style={{minWidth:'90%', marginBottom:16}}
          onChange={(event)=>{
            setTitle(event.target.value)
            title.length<10? setTitleShort(true):setTitleShort(false)
          }}
          helperText={titleShort?"Title too short!":""}
          error={titleShort?true:false}
          />

          <TextField
          id="confession-content"
          label="Confession"
          multiline
          rows="12"
          placeholder="Write your secret confession (at least 30 chars.) here!"
          variant="outlined"
          style={{minWidth:'90%', marginTop:16}}
          defaultValue={content}
          //onInput={handleShort}
          onChange={(event)=>{
            setContent(event.target.value)
            content.length<30? setContentShort(true):setContentShort(false);
            
          }}
          helperText={contentShort?"Content too short!":""}
          error={contentShort?true:false}
        />
        </form>
        <Typography style={{alignContent:'center', padding:10,margin:12,fontFamily:'Sintony', alignSelf:'center', fontSize:10}}>*This is a <strong>Secret Confession</strong> as your name is not revealed! If the page is <i>Private</i> only the page owner can see the confession, otherwise it will be <i>Public</i>.</Typography>
      </Dialog>
      {(openShare)?<ShareBox handleShareClose={handleShareClose} pageId={props.pageId}/>:null}
    </div>
  );
}


export default graphql(addConfessionMutation, {name:"addConfessionMutation",
  options:(props: any) => ({ variables: { pageId: props.pageId } })})(ConfessionForm)
