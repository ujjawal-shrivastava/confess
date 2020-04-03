import React, {useContext} from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link}from 'react-router-dom';
import logo from '../images/logo.png';
import UserContext from '../contexts/contexts';


const useStyles = makeStyles({
  loginButton: {
    background: '#130f40',
    marginLeft: 4,
    marginRight:-20,
  },

  createButton: {
    background: '#130f40',
    marginRight: 4,
  },

  toolbar: {
    justifyContent: 'space-between'
  },

  AppBar: {
    flexGrow: 1
  }

});

function HeaderBar() {
  const classes = useStyles();
  const {user, setUser} = useContext(UserContext);

  const handleLogout = ()=>{
    if(localStorage.getItem('remember')==='true'){
      localStorage.setItem('user',JSON.stringify({user:'',loggedIn: false, auth:''}));
    }
    else{
      sessionStorage.setItem('user',JSON.stringify({user:'',loggedIn: false, auth:''}));
    }
    setUser({user:'',loggedIn: false, auth:''});
  }
  
  return (
      <AppBar className={classes.AppBar} position="sticky" style={{ background: '#e74c3c' }}  >
        <Toolbar className={classes.toolbar} >
          <Link to='/'><img src={logo} alt="Logo" height="25px"/></Link>
          {!user.loggedIn?
          <Toolbar>
            <Button component= {Link} to='/create' color="primary" variant="contained" disableElevation size="small" className={classes.createButton}>Create Page</Button>
            <Button component= {Link} to='/login' color="primary" variant="contained" disableElevation size="small" className={classes.loginButton}>Login</Button>
          </Toolbar>:
          <Toolbar>
          <Button component= {Link} to='/manage' color="primary" variant="contained" disableElevation size="small" className={classes.createButton}>Manage</Button>
          <Button component={Link} onClick={handleLogout} to='/login' color="primary" variant="contained" disableElevation size="small" className={classes.loginButton}>Logout</Button>
          </Toolbar>}
        </Toolbar>
      </AppBar>
  );

}

export default HeaderBar;
