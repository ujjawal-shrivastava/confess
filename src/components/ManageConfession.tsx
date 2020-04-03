import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Collapse, IconButton, Typography} from '@material-ui/core';
import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getOneAdminConfessionQuery, adminLikeMutation, getAdminConfessionLikeQuery, deleteConfessionMutation, getAllAdminConfessionsQuery, getAdminPageQuery} from '../queries/queries';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery, useMutation } from '@apollo/react-hooks';
import UserContext from '../contexts/contexts';
const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        minWidth:200,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    cardTitle: {
        paddingTop: 0,
        paddingBottom: 0,
        "&:last-child": {
          paddingBottom: 0
        },
        fontFamily:'Roboto Slab'
      },
    cardDate:{
        fontSize:11,
        color:'#bdc3c7',
        marginTop:-8,
        paddingLeft:10
    }
}
);

function ManageConfession(props:any) {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const [expanded, setExpanded] = React.useState(false);
    const {data, loading} = useQuery(getOneAdminConfessionQuery, {variables:{pageId:user.user, confId:props.confId, auth:user.auth}});
    const {data:likedata, loading:likeloading} = useQuery(getAdminConfessionLikeQuery, {variables:{pageId:user.user, confId:props.confId, auth:user.auth}});
    const [adminLike]=useMutation(adminLikeMutation);
    const [adminDelete]=useMutation(deleteConfessionMutation);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const handleDelete =() =>{
        if (window.confirm(`Are you sure you wish to Delete this Confession? This is not revertible!`)){
            adminDelete({variables:{pageId:user.user,confId:props.confId,auth:user.auth},
                refetchQueries:[{query:getAllAdminConfessionsQuery, variables:{pageId: user.user, auth: user.auth}},
                    {query:getAdminPageQuery, variables:{pageId: user.user, auth: user.auth}}]
            })
        }
    }

    const handleLike =() =>{
        adminLike({
            variables:{
              pageId:user.user,
              confId:props.confId,
              auth:user.auth},
              refetchQueries:[{query:getAdminConfessionLikeQuery, variables: { pageId: user.user, confId: props.confId, auth:user.auth}}]
            })
    }

    if (loading||likeloading) {
        return (
            <div>
                <Card className={classes.root} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight:140,
            }} >
                    <CircularProgress style={{color:'#bdc3c7'}} />
                </Card>
            </div>
        )
    }
    
    let item = data.adminConfessions[0]
    let liked = likedata.adminConfessions[0]
    return (
        <div>
        <Card className={classes.root}>
            <CardActions style={{ fontFamily: 'inherit',padding:0, justifyContent:'space-between' }} >
                <Typography variant="caption" color="textSecondary" component="p" className={classes.cardDate}>
                <i> #{item.confId} • {item.dateAddedText}</i> 
                </Typography>
                <IconButton aria-label="delete" onClick={handleDelete}>
                    <ClearIcon htmlColor="#95a5a6"/>
                </IconButton>
            </CardActions>
            <CardContent className={classes.cardTitle}  onClick={handleExpandClick}>
                <Typography variant="body1" color="textPrimary"  component="h1" style={{ fontFamily: 'inherit', whiteSpace:'pre-wrap', wordWrap:'break-word' }}>
                     <b>{item.title}</b>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Like" onClick={handleLike}>
                    <FavoriteIcon htmlColor={liked.ownerLiked?"#ff4757":"#95a5a6"}/>
                </IconButton>
                
                <Typography variant="caption" color="textSecondary" component="p" onClick={handleLike} style={{fontFamily:'Montserrat'}}>
                    {liked.likes} Likes  {liked.ownerLiked?<small><strong style={{color:'#6ab04c'}}> • You liked this!</strong></small>:null}
                </Typography>

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent onClick = {handleExpandClick}>
                    <Typography variant="body1" color="textPrimary"  component="h1" style={{ fontFamily: 'Montserrat', marginBottom:5 }}>
                        <b>Confession:</b>
                    </Typography>
                    <Typography variant ="subtitle1"style={{padding:2, textAlign:"justify"}}>
                        <pre style={{fontSize:13, fontFamily:'Sintony', whiteSpace:'pre-wrap', wordWrap:'break-word' }}>
                        {item.content}
                        </pre>
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>

        </div>
    );

}

export default ManageConfession;