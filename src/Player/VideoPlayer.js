import React from 'react';
import './VideoPlayer.css';

let queue = [];
let baseVideo = undefined;

function VideoPlayer() {
  return (
    <div>
      <video controls autoPlay className='Video-frame' ></video>
    </div>
  );
}

function onVideoEnd(event) {
    playSelectedFile();
}

function playSelectedFile () {
  let nextVideo;
  if(queue.length === 0) {
    nextVideo = baseVideo;
    document.querySelector('video').loop = true;
  } else{
    console.log("Playing video from queue");
    nextVideo = queue.shift();
  }
  var type = nextVideo.type
  var videoNode = document.querySelector('video')
  var canPlay = videoNode.canPlayType(type)
  if (canPlay === '') canPlay = 'no'
  var message = 'Can play type "' + type + '": ' + canPlay
  var isError = canPlay === 'no'

  if (isError) {
    alert(message);
    return
  }

  var fileURL = URL.createObjectURL(nextVideo)
  videoNode.src = fileURL
}

function addVideoToQueue(file) {
  if(baseVideo === undefined) {
    document.querySelector('video').addEventListener('ended',onVideoEnd,false);
    baseVideo = file;
    playSelectedFile();
    return;
  }
  queue.push(file);
  document.querySelector('video').loop = false;
}

export default {VideoPlayer,addVideoToQueue};
