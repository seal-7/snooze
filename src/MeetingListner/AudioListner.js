import DataStore from "../Mapper/DataStore";
import Player from "../Player/VideoPlayer";


function getMappedWords(str) {
  let words = [];
  str.split(" ").forEach(word => {
    let length = words.length;
    let lowerCaseWord = word.toLowerCase();
    if(length === 0 || (words[length - 1] === lowerCaseWord)){
      if(DataStore.isKeywordPresent(lowerCaseWord)) {
          words.push(lowerCaseWord);
      }
    }
  });
  return words;
}

function init() {
  let recognition;
  try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    alert("SpeechRecognition not supported on your browser");
    window.close();
  }


  recognition.onstart = function() {
    console.log('Voice recognition activated. Try speaking into the microphone.');
  }

  recognition.onspeechend = function() {
    stop();
    console.log('You were quiet for a while so voice recognition turned itself off.');
  }

  recognition.onerror = function(event) {
    if(event.error === 'no-speech') {
      console.log('No speech was detected. Try again.');
    };
  }

  recognition.continuous = true;

  // This block is called every time the Speech APi captures a line.
  recognition.onresult = function(event) {

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far.
    // We only need the current one.
    var current = event.resultIndex;

    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;

    // Add the current transcript to the contents of our Note.
    // There is a weird bug on mobile, where everything is repeated twice.
    // There is no official solution so far so we have to handle an edge case.
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if(!mobileRepeatBug) {
      console.log(transcript);
      let mappedWords  = getMappedWords(transcript);
      mappedWords.forEach(word => {
          Player.addVideoToQueue(DataStore.getVideoFileFromStore(word));
      })
    }
  };

  function start() {
    console.log("Starting audio recognition");
    recognition.start();
  }

  function stop() {
    recognition.stop();
  }
  start();
}

export default {init};
