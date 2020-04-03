import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { LoginQuery } from '../queries/queries';
import { useLazyQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import image from '../images/login-pic.png';
import { Redirect } from 'react-router-dom';
import UserContext from '../contexts/contexts';


const useStyles = makeStyles({
    root: {
        maxWidth: 600,
        minWidth: 350,
        margin: 20
    },
    createButton: {
        background: '#27ae60',
    },
}
);

const LoginPage: React.FC = (props: any) => {
    const classes = useStyles();
    const [LoginUser, { data, loading, error }] = useLazyQuery(LoginQuery);
    const [loginId, setLoginId] = React.useState('');
    const [remember, setRemember] = React.useState(false)
    const [idNotValid, setIdNotValid] = React.useState(false);
    const [loginPin, setLoginPin] = React.useState('');
    const [pinNotValid, setPinNotValid] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [checkLogin, setCheckLogin] = React.useState(false);
    const { user, setUser } = useContext(UserContext);


    React.useEffect(() => {
        if (data && data.login !== null && data.login.result !== null) {
            setUser({ user: loginId, loggedIn: true, auth: data.login.result });
            localStorage.setItem('remember', `${remember}`)
            if (remember) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            else {
                sessionStorage.setItem('user', JSON.stringify(user));
            }
            setSuccess(true)
        }
        (loginId.length <= 5 || loginId.length > 6) ? setIdNotValid(true) : setIdNotValid(false);
        (loginPin.length <= 3 || loginPin.length > 4) ? setPinNotValid(true) : setPinNotValid(false);
    }, [loginId, loginPin, data, remember, setUser, user, error, checkLogin]);



    const handleRemember = () => {
        setRemember(!remember);
    }
    const handleLogin = () => {
        if (idNotValid || pinNotValid) { return null }
        LoginUser({ variables: { pageId: loginId, pin: loginPin } });
        setCheckLogin(true)
    }
    if (!loading && checkLogin) {
        if (error) {
            console.log(error)
            setLoginId('')
            setLoginPin('')
            setIdNotValid(true)
            setPinNotValid(true)
            setCheckLogin(false)
        }
        else {
            setPinNotValid(true)
            setLoginPin('')
            setCheckLogin(false)
        }

    }

    if (success) {
        return (
            <Redirect to={'/manage'} />
        )
    }
    if (user) {
        if (user.loggedIn) {
            return (
                <Redirect to='/manage' />
            )
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }} >
            <Typography style={{ marginTop: 10, alignSelf: 'center', marginBottom: -40 }}><img style={{ width: 220 }} src={image} alt='Creating!' /> </Typography>
            <Typography style={{ fontSize: 24, fontFamily: 'Roboto Slab', color: '#ffffff' }}> Login </Typography>

            <Card className={classes.root} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                paddingTop: 30,
                paddingBottom: 20,
                maxWidth: 400,
                minHeight: 260
            }} >

                {loading ?
                    <CircularProgress style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} /> :
                    <form style={{ padding: 5, margin: 5, textAlign: 'center' }} noValidate autoComplete="off">
                        <TextField
                            id="page-id"
                            label="ID"
                            placeholder="Page ID (6 digits)!"
                            variant="outlined"
                            type='number'
                            defaultValue={loginId}
                            onChange={(event) => {
                                setLoginId(event.target.value);
                            }}
                            helperText={idNotValid ? "Invalid ID!" : ""}
                            error={idNotValid ? true : false}
                            style={{ width: 300, marginBottom: 10 }}
                        />
                        <TextField
                            id="page-pin"
                            label="PIN"
                            placeholder="Page PIN (4 digits)!"
                            variant="outlined"
                            type='number'
                            defaultValue={loginPin}
                            onChange={(event) => {
                                setLoginPin(event.target.value);
                            }}
                            helperText={pinNotValid ? "Invalid PIN!" : ""}
                            error={pinNotValid ? true : false}
                            style={{ width: 300, marginTop: 10 }}
                        />

                        <FormControlLabel
                            control={<Switch checked={remember} onChange={handleRemember} name="private-switch" />}
                            label="Keep me logged in!"
                            labelPlacement='start'
                            style={{ padding: 10, margin: 10, fontSize: 12 }}
                        />
                        <Button onClick={handleLogin} color="primary" variant="contained" disableElevation size="large" className={classes.createButton}>Login</Button>
                    </form>
                }
            </Card>
            <Typography style={{ fontSize: 10, fontFamily: 'Roboto Slab', color: '#ffffff' }}> ADMIN LOGIN DASHBOARD </Typography>
            <Typography style={{ fontSize: 10, fontFamily: 'Roboto Slab', color: '#ffffff', textAlign: 'center' }}> www.confess.cf </Typography>
        </div>
    )

}


export default LoginPage;