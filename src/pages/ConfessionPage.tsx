import React from 'react';
import TitleBar from '../components/TitleBar';
import {Typography} from '@material-ui/core';
import ConfessionList from '../components/ConfessionList';
import ConfessionForm from '../components/ConfessionForm';
import { getPageQuery } from '../queries/queries';
import { graphql } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import PrivateBox from '../components/PrivateBox';
import NoMatch from '../pages/NoMatch';

function ConfessionPage(props: any) {
    let { page, loading, error} = props.data
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
    
    if (error){
        return(
        <NoMatch />
        )
    }

    document.title = 'Confess - '+page.name
    return (
        <div >
            <TitleBar name={page.name} totalConfessions={page.totalConfessions} isPublic={page.isPublic} pageId={page.pageId} />
            <ConfessionForm pageId={page.pageId} isPublic={page.isPublic} />
            {page.isPublic && <ConfessionList pageId={page.pageId} />}
            {page.isPublic && (page.totalConfessions > 6) && <ConfessionForm pageId={page.pageId} isPublic={page.isPublic} />}
            {!page.isPublic && <PrivateBox />}
            {page.totalConfessions===0 && <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight:150
            }} >
                <Typography style={{padding:10, margin:20, fontFamily:'Montserrat',color:'#808e9b', fontSize:20}}>Be the first one to confesss!</Typography>
                </div>}
        </div>
    );
}

export default graphql(getPageQuery, {
    options: (props: any) => ({ variables: { id: props.match.params.id} })
})(ConfessionPage);