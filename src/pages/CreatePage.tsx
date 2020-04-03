import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import image from '../images/create-pic.png';
import TextField from '@material-ui/core/TextField';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { createPageMutation } from '../queries/queries';
import { useMutation } from '@apollo/react-hooks';
import DetailsBox from '../components/DetailsBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../contexts/contexts';
import { Redirect } from 'react-router-dom';

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

const Create: React.FC = (props: any) => {
    const classes = useStyles();
    const [addPage, { data, loading }] = useMutation(createPageMutation);
    const [name, setName] = React.useState('');
    const [isPublic, setIsPublic] = React.useState(true)
    const [nameShort, setNameShort] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false)
    const { user} = useContext(UserContext);

    React.useEffect(() => {
        if(data) setOpenDialog(true)
      },[data]);
    const handlePrivate = () => {
        setIsPublic(!isPublic)
    }
    const handleSubmit = () => {
        name.length < 3 ? setNameShort(true) : setNameShort(false)
        if (nameShort) { return (null) }
        addPage({ variables: { name:name, isPublic:isPublic } });
        setName('')
        setIsPublic(true)
        return null  
    }
    if (user.loggedIn){return (<Redirect to='/manage' />)}
    if (loading) {
        return (
                <CircularProgress style={{
                justifyContent: 'center',
                alignItems:'center',
                position:'fixed',
                zIndex:200,
                top:'47%',
                left:'45.5%'
            }} />
        )
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
        }} >
            <Typography style={{ marginTop: 10, alignSelf: 'center' }}><img style={{ width: 160 }} src={image} alt='Creating!' /></Typography>
            <Typography style={{ fontSize: 24, fontFamily: 'Roboto Slab', color: '#ffffff' }}> Create Your Confession Page! </Typography>

            <Card className={classes.root} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                paddingTop: 30,
                paddingBottom: 30,
                maxWidth: 400
            }} >

                <form style={{ padding: 5, margin: 5, textAlign: 'center' }} noValidate autoComplete="off">
                    <TextField
                        id="page-name"
                        label="Name"
                        placeholder="Full name for the confession page!"
                        variant="outlined"
                        onChange={(event) => {
                            setName(event.target.value)
                            name.length < 3 ? setNameShort(true) : setNameShort(false)

                        }}
                        helperText={nameShort ? "Name too short!" : ""}
                        error={nameShort ? true : false}
                        style={{ width: 300 }}
                    />

                    <FormControlLabel
                        control={<Switch checked={!isPublic} onChange={handlePrivate} name="private-switch" />}
                        label="Make this page Private!"
                        labelPlacement='start'
                        style={{ padding: 10, margin: 10 }}
                    />
                    <Button onClick={handleSubmit} color="primary" variant="contained" disableElevation size="large" className={classes.createButton}>Create Page</Button>
                </form>
            </Card>
            <Typography style={{ fontSize: 10, fontFamily: 'Roboto Slab', color: '#ffffff' }}> You can change the page visibility ( Public/Private ) later as well! </Typography>
            <Typography style={{ fontSize: 10, fontFamily: 'Roboto Slab', color: '#ffffff', textAlign: 'center' }}> On public pages all the confessions will be visible to others (with whom you will share the link), while on private pages only you can see all the confessions!  </Typography>
            { (openDialog)?<DetailsBox data={data}/>:null}
        </div>
    )

}


export default Create;