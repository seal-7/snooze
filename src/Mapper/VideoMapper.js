import React, { useState} from 'react';
import {Container, Button, TextField, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import "./VideoMapper.css";
import Player from '../Player/VideoPlayer.js';
import DataStore from './DataStore';

const useStyles = makeStyles({});

function VideoMapper() {

  const classes = useStyles();
  const [mappedVideos,setMappedVideos] = useState([]);
  const [newKeyword, setNewkeyword] = useState();
  const [newVideo, setNewVideo] = useState();

  function handleTextChange(event) {
      let keyword = event.target.value.toLowerCase();
      if(keyword.search(" ") !== -1) {
        alert("Spaces not Allowed");
        event.target.value = newKeyword;
        return
      }
      setNewkeyword(keyword);
      event.target.value = keyword;
  }

  function handleVideoUpload(event) {
    setNewVideo(event.target.files[0]);
  }

  function handleSave(event) {
    if (newKeyword === undefined || newVideo === undefined) {
      event.preventDefault();
      alert("Please make sure you have added keyword and video");
      return;
    }
    if (DataStore.isKeywordPresent(newKeyword)) {
        event.preventDefault();
        alert("KeyWord already exists!!");
        return;
    }
    let id= mappedVideos.length;
    setMappedVideos([
      ...mappedVideos,
      {"keyword": newKeyword, "video": newVideo}
    ]);
    
    if(DataStore.isEmpty()) {
      console.log("Adding baseVideo");
        Player.addVideoToQueue(newVideo);
    }
    DataStore.addVideoFileToStore(newKeyword, newVideo);
    event.preventDefault();
  }

  function handleDelete(keyword) {
    let ind = -1;
    let updatedMappedVideos = mappedVideos.filter((video,index) => {
      if (video.keyword !== keyword) {
        return true;
      }
      else {
        ind = index;
        return false;
      }
    })
    console.log(keyword,ind);
    setMappedVideos(updatedMappedVideos);
    DataStore.removeVideoFromStore(keyword);
    console.log(mappedVideos);
  }

  function getAddVideoMappingView() {
    return (
      <TableRow key="static-add-row">
        <TableCell component="th" scope="row">
        <TextField id="outlined-size-small" variant="outlined" size="small" onChange={handleTextChange}/>
        </TableCell>
      <TableCell align="left">
        <input type="file" accept="video/*" onChange={handleVideoUpload}/>
      </TableCell>
      <TableCell align="left">
        <Button variant="contained" color="primary" size="small" startIcon={<SaveIcon />} onClick={handleSave}> Save </Button>
      </TableCell>
    </TableRow>);
  }

  function getAddedList() {
    return (
      <TableContainer component={Paper}>
      <Table className="Table-frame" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>KeyWord</TableCell>
            <TableCell align="left">Video</TableCell>
            <TableCell align="left">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedVideos.map((mappedVideo) => (
            <TableRow key={mappedVideo.keyword}>
              <TableCell component="th" scope="row">
                {mappedVideo.keyword}
              </TableCell>
              <TableCell align="left">
              {mappedVideo.video.name}
              </TableCell>
              <TableCell>
              <IconButton aria-label="delete" className={classes.margin} onClick={() => { handleDelete(mappedVideo.keyword)}} >
                <DeleteIcon fontSize="small" />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow><TableCell align="left"></TableCell><TableCell align="left"></TableCell><TableCell align="left"></TableCell></TableRow>
          {getAddVideoMappingView()}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }

  function getVideoMappingListContainer() {

    return  ( <Container maxWidth="md">
            <Grid container item xs={12} spacing={3}>
                {getAddedList()}
            </Grid>
          </Container>);
  }

  return getVideoMappingListContainer();
}

export default VideoMapper;
