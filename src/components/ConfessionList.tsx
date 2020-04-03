import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Confession from './Confession';
import { getAllConfessionsQuery } from '../queries/queries';
import { graphql } from 'react-apollo';

class ConfessionList extends Component<{ data: any, pageId:string }> {

    render() {
        if (this.props.data.loading) {
            return (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 20
                }}>
                    <CircularProgress />
                </div>
            )
        }
        return (
            <div style={{ padding: 5, display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', paddingTop:0 }}>
                <Grid container spacing={2} style={{padding:10, margin:'auto'}}>
                    {this.props.data.confessions.map((value: any, index: number) =>
                        <Grid item xs={12} sm={4} key={index}>
                            <Confession pageId = {this.props.pageId} confId={value.confId}/>
                            {/*index%5===0?<AdCard />:null*/}
                        </Grid>
                        
                    )}
                    
                </Grid>
            </div>
        );
    }
}

export default graphql(getAllConfessionsQuery, {
    options: (props: any) => ({ variables: { pageId: props.pageId } })
})(ConfessionList);