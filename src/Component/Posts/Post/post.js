import React, {useState} from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import { useNavigate } from 'react-router-dom'
import moment from 'moment';

import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'

function Post({ post, setCurrentId }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);

    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = post?.likes?.find((like) => like === userId);

    const openPost = () => {

        navigate(`/posts/${post._id}`);
    }


    const handleLike = async () => {
        dispatch(likePost(post._id));
    
        if (hasLikedPost) {
          setLikes(post.likes.filter((id) => id !== userId));
        } else {
          setLikes([...post.likes, userId]);
        }
      };

      const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
    
    // const Likes = () => {
    //     if (post.likes.length > 0) {
    //         return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
    //             ? (
    //                 <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
    //             ) : (
    //                 <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
    //             );
    //     }

    //     return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    // };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
                component="span"
                name="test"
                className={classes.cardAction}
                onClick={openPost}
            >
                {/* <Link to='/postDetails' > */}


                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>

                {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(post._id) }}><MoreHorizIcon fontSize="default" /></Button>
            </div>
            )} */}

                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2} name="edit">
                        <Button
                            onClick={(e) => {
                                // TO ACT AS SEPARATE .BUTTON
                                e.stopPropagation();
                                setCurrentId(post._id);
                            }}
                            style={{ color: 'white' }}
                            size="small"
                        >
                            <MoreHorizIcon fontSize="default" />
                        </Button>
                    </div>
                )}


                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                {/* </Link> */}

            </ButtonBase>


            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>

                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}

            </CardActions>
        </Card>



        // <h1>Post</h1>

    )

}

export default Post;