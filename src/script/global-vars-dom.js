const domVars = {};

window.addEventListener("load", () => {
  // Content Warning - Touch to play
  domVars.homeBgImg = document.getElementById("home-bg-image");
  domVars.contentWarning = document.getElementById("content-warning");
  domVars.touchToPlay = document.getElementById("touch-to-play");

  // Video Player
  domVars.videoPlayer = document.getElementById("video-player");
  domVars.screenDiv = document.getElementById("screen-div");
  domVars.touchToBeginSlide = document.getElementById("touch-to-begin-slide");
  domVars.controls = document.getElementById("controls");
  domVars.controlBar = document.getElementById("control-bar");
  domVars.playPauseBtn = document.getElementById("play-pause-button");
  domVars.playPauseBtnIcon = document.getElementById("play-pause-button-icon");
  domVars.scrubBar = document.getElementById("scrub-bar");
  domVars.returnHomeBtn = document.getElementById("return-home-button");
});

export { domVars };
