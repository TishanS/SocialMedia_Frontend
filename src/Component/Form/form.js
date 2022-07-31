
import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts'


import ChipInput from 'material-ui-chip-input';


import useStyles from './styles'

function Form({currentId, setCurrentId}) {

    const classes = useStyles();
    const [postData, setPostData] = useState({  title: '', message: '', tags: [], selectedFile: '' });
    const post = useSelector ((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null)) ;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    
   
    const clear = () => {
        setCurrentId(0);
        setPostData({title: '', message: '', tags: '', selectedFile: '' })
    }

 // useEffect(() => {
    //     if(post) 
    //     setPostData(post)
    // },[post])

    useEffect(() => {
        if (!post?.title) clear();
        if (post) setPostData(post);
      }, [post]);



   
    const handleSubmit = (e) => {
        
        e.preventDefault();


        if(currentId === 0){
            dispatch(createPost({...postData, name: user?.result?.name}, navigate))
            //console.log(postData)
        }
        else{
            // dispatch(updatePost(currentId,{postData, name: user?.result?.name}))
            dispatch(updatePost(currentId,postData))
        }
       clear();
    }

    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
      }




      const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
      };
    
      const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
      };




    return (
        // <h1>FORM</h1>
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                
                
                
                
                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                {/* <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div> */}
                
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )

}

export default Form;