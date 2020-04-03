import * as  React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Collapse, IconButton, Typography} from '@material-ui/core';
import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getOneConfessionQuery, likeConfessionMutation, getConfessionLikeQuery} from '../queries/queries';
import { graphql } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMutation } from '@apollo/react-hooks';
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
        color:'#bdc3c7'
    }
}
);

function Confession(props:any) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [likeColor, setLikeColor] = React.useState("#95a5a6");
    const [changeLikes] = useMutation(likeConfessionMutation);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike =() =>{
        let value:number
        if (likeColor==="#95a5a6"){
            value = 1
            setLikeColor("#ff4757")
        }
        else{
            value = -1
            setLikeColor("#95a5a6")
        }

        changeLikes({
            variables:{
              confId:props.confId,
              value:value},
              refetchQueries:[{query:getConfessionLikeQuery, variables: { pageId: props.pageId, confId: props.confId}}]
            })

    }

    if (props.data.loading) {
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
    let confItem =props.data.confessions[0]
    
    return (
        <div>
        <Card className={classes.root}>
            <CardContent style={{ fontFamily: 'inherit' }} >
                <Typography variant="caption" color="textSecondary" component="p" className={classes.cardDate}>
                <i> #{confItem.confId} • {confItem.dateAddedText}</i> 
                </Typography>
            </CardContent>
            <CardContent className={classes.cardTitle}  onClick={handleExpandClick}>
                <Typography variant="body1" color="textPrimary"  component="h1" style={{ fontFamily: 'inherit', whiteSpace:'pre-wrap', wordWrap:'break-word' }}>
                     <b>{confItem.title}</b>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleLike}>
                    <FavoriteIcon htmlColor={likeColor}/>
                </IconButton>
                
                <Typography variant="caption" color="textSecondary" component="p" onClick={handleLike} style={{fontFamily:'Montserrat'}}>
                    {confItem.likes} Likes  {confItem.ownerLiked?<small><strong style={{color:'#6ab04c'}}> • Owner likes this!</strong></small>:null}
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
                    {//<Typography paragraph>Confession:</Typography>
                    }
                    <Typography variant="body1" color="textPrimary"  component="h1" style={{ fontFamily: 'Montserrat', marginBottom:5 }}>
                        <b>Confession:</b>
                    </Typography>
                    <Typography variant ="subtitle1"style={{padding:2, textAlign:"justify"}}>
                        <pre style={{fontSize:13, fontFamily:'Sintony', whiteSpace:'pre-wrap', wordWrap:'break-word' }}>
                        {confItem.content}
                        </pre>
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>

        </div>
    );

}

export default graphql(getOneConfessionQuery,{options: (props: any) => ({ variables: { pageId: props.pageId, confId: props.confId} })})(Confession);