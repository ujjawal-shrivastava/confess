import React, { useContext } from 'react';
import { Typography, Card, Divider, Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../contexts/contexts';
import { getAdminPageQuery, adminPublicMutation, deletePageMutation } from '../queries/queries';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom';
import ShareBox from '../components/ShareBox';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';

function ManageTitle(props: any) {
    const { user, setUser } = useContext(UserContext);
    const { data, loading } = useQuery(getAdminPageQuery, {
        variables: { pageId: user.user, auth: user.auth }
    });
    const [changePublic] = useMutation(adminPublicMutation);
    const [deletePage] = useMutation(deletePageMutation);
    const [openShare, setOpenShare] = React.useState(false)
    const handleShare = () => {
        setOpenShare(true)
    }

    const handleShareClose = () => {
        setOpenShare(false)
    }

    if (loading) {
        return (
            <Card style={{
                margin:26,
                display:'flex',
                minWidth: 300,
                maxWidth: 600,
                minHeight: 200,
                alignItems: 'center',
                justifyContent: 'center',
            }} >
                <CircularProgress />
            </Card>
        )
    }
    function Logout() {
        if (localStorage.getItem('remember') === 'true') {
            localStorage.setItem('user', JSON.stringify({ user: '', loggedIn: false, auth: '' }));
        }
        else {
            sessionStorage.setItem('user', JSON.stringify({ user: '', loggedIn: false, auth: '' }));
        }
        setUser({ user: '', loggedIn: false, auth: '' });
        return (
            <Redirect to='/login' />
        )
    }

    return (
        <div style={{
            margin: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            textAlign: 'left'
        }}>
            <Card style={{
                minWidth: 300,
                maxWidth: 600,
                minHeight: 160,
                textAlign: 'left',
                alignItems: 'center',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                padding: 20,
                paddingLeft: 30,
                paddingRight: 30
            }} >
                <Typography style={{ fontFamily: 'Roboto', fontSize: 20, color: '#2c3e50', textAlign: 'center', marginBottom: 10 }}><strong>ADMIN DASHBOARD</strong></Typography>
                <Typography style={{ padding: 11, fontFamily: 'Montserrat', fontSize: 13, color: '#2c3e50', textAlign: 'left' }}><strong>ID</strong> :  {data.adminPage.pageId}</Typography>
                <Divider light />
                <Typography style={{ padding: 11, fontFamily: 'Montserrat', fontSize: 13, color: '#2c3e50', textAlign: 'left' }}><strong>NAME</strong> :  {data.adminPage.name}</Typography>
                <Divider light />
                <Typography style={{ padding: 11, fontFamily: 'Montserrat', fontSize: 13, color: '#2c3e50', textAlign: 'left' }}><strong>TOTAL CONFESSIONS</strong> :  {data.adminPage.totalConfessions}</Typography>
                <Divider light />
                <Typography style={{ padding: 11, fontFamily: 'Montserrat', fontSize: 13, color: '#2c3e50', textAlign: 'left' }}><strong>VISIBILITY</strong> :  {data.adminPage.isPublic ? 'PUBLIC' : 'PRIVATE'}
                    <Switch checked={data.adminPage.isPublic} name="private-switch" onChange={() => {
                        changePublic({
                            variables: { pageId: user.user, auth: user.auth },
                            refetchQueries: [{ query: getAdminPageQuery, variables: { pageId: user.user, auth: user.auth } }]
                        });
                    }} />
                </Typography>

                <Button startIcon={<DeleteIcon />} style={{ marginRight: 3, height:48 }} color="secondary" variant="contained" disableElevation size="medium" onClick={() => {
                    if (window.confirm(`Are you sure you wish to Delete Page ( ${data.adminPage.pageId} )? This is not revertible!`)) {
                        deletePage({
                            variables: { pageId: user.user, auth: user.auth }
                        })
                        Logout()
                    }
                }}>
                    Delete Page
                </Button>
                <Button startIcon={<ShareIcon />} onClick={handleShare} style={{ marginLeft: 3, height:48 }} color="primary" variant="contained" disableElevation size="medium">Share Page</Button>
                {(openShare) ? <ShareBox handleShareClose={handleShareClose} pageId={data.adminPage.pageId} /> : null}
            </Card>
        </div>
    );

}

export default ManageTitle;
