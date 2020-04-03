import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAllAdminConfessionsQuery } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks'
import UserContext from '../contexts/contexts';
import ManageConfession from './ManageConfession';



function ManageList(props: any) {
    const { user } = useContext(UserContext);
    const { data, loading } = useQuery(getAllAdminConfessionsQuery, {
        variables: { pageId: user.user, auth: user.auth }
    });

    if (loading) {
        return (
            <div style={{
                margin:26,
                display:'flex',
                minWidth: 300,
                maxWidth: 600,
                minHeight: 200,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CircularProgress />
            </div>
        )
    }
    return (
        <div style={{
            padding: 5, display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', paddingTop: 0
        }}>
            <Grid container spacing={2} style={{ padding: 10, margin: 'auto' }}>
                {data.adminConfessions.map((value: any, index: number) =>
                    <Grid item xs={12} sm={4} key={index}>
                        <ManageConfession confId={value.confId} />
                        {/*index%5===0?<AdCard />:null*/}
                        </Grid>
                )}
            </Grid>
        </div>
    );
}

export default ManageList