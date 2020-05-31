let wordToVideoMap = {}

function addVideoFileToStore(keyword, videoFile) {
  wordToVideoMap[keyword] = videoFile;
}

function getVideoFileFromStore(keyword) {
  return wordToVideoMap[keyword];
}

function removeVideoFromStore(keyword) {
  delete wordToVideoMap[keyword];
}

function isKeywordPresent(keyword) {
  return wordToVideoMap.hasOwnProperty(keyword.toLowerCase());
}

function isEmpty() {
  return Object.keys(wordToVideoMap).length === 0;
}

export default {addVideoFileToStore, getVideoFileFromStore, isKeywordPresent, removeVideoFromStore, isEmpty};
