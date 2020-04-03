import React, { useState } from 'react';
import HeaderBar from './components/HeaderBar';
import About from './pages/AboutPage';
import Home from './pages/HomePage';
import ManagePage from './pages/ManagePage';
import Create from './pages/CreatePage';
import ConfessionPage from './pages/ConfessionPage';
import FooterBar from './components/FooterBar';
import NoMatch from './pages/NoMatch';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import LoginPage from './pages/LoginPage';
import { UserProvider } from './contexts/contexts';

const client = new ApolloClient({
    uri: 'https://confessapi.herokuapp.com/data'
})

export default function App() {
    //managing sessions and localStorage
    const memRemember = localStorage.getItem('remember') === 'true';
    let memUser = undefined
    let memLoggedIn = undefined
    let auth = undefined
    if (memRemember) {
        memUser = localStorage.getItem('user')
        if (memUser!==null) {
            memUser = JSON.parse(memUser)
            memLoggedIn = memUser.loggedIn === true;
            auth=memUser.auth
            memUser = memUser.user
        }
    }
    else {
        memUser = sessionStorage.getItem('user')
        if (memUser!==null) {
            memUser = JSON.parse(memUser)
            memLoggedIn = memUser.loggedIn === true;
            auth=memUser.auth
            memUser =  memUser.user
        }
    }
    const [user, setUser] = useState({ user: memUser, loggedIn: memLoggedIn, auth: auth })

    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <UserProvider value={{ user, setUser }}>
                        <HeaderBar />
                    </UserProvider>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/:id(\d{6})" component={ConfessionPage} />
                        <Route exact path="/create">
                            <UserProvider value={{ user, setUser }}>
                                <Create />
                            </UserProvider>
                        </Route>
                        <Route exact path="/manage">
                            <UserProvider value={{ user, setUser }}>
                                <ManagePage />
                            </UserProvider>
                        </Route>
                        <Route exact path="/login">
                            <UserProvider value={{ user, setUser }}>
                                <LoginPage />
                            </UserProvider>
                        </Route>
                        <Route component={NoMatch} />
                    </Switch>
                    <FooterBar />

                </div>
            </Router>
        </ApolloProvider>
    );

};

