import React, { useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../contexts/contexts';
import { LoginQuery} from '../queries/queries';
import { useQuery} from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom';
import ManageTitle from '../components/ManageTitle';
import ManageList from '../components/ManageList';


function ManagePage(props: any) {
    const { user, setUser } = useContext(UserContext);
    const { data, loading, error:LoginError} = useQuery(LoginQuery,{
        variables: { pageId: user.user, auth: user.auth },
        pollInterval:100000
    });


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
    if (!user.loggedIn){return (<Redirect to='/login' />)}
    if(user.loggedIn){
        if(data&&data.login==null){
            Logout()
        }
    }
    if (LoginError) {
        Logout()
    }
    if (loading) {
        return (
            <CircularProgress style={{
                justifyContent: 'center',
                alignItems: 'center',
                display:'flex'
            }} />
        )
    }

    return (
        <div>
            <ManageTitle />
            <ManageList />
        </div>
    );

}

export default ManagePage;