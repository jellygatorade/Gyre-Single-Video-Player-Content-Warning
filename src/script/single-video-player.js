import { fadeIn, fadeOut } from "./fade-in-out-elements.js";
import { domVars } from "./global-vars-dom.js";
import { interactionEvents } from "./interaction-events.js";

const singleVideoPlayer = {
  // Video path is defined in "./apply-content-ui.js"
  videoPath: undefined,

  // Choose the video player volume // 50%
  videoPlayerVolume: 0.5,

  init: function () {
    //apply the videoPath variable to a source element's src tag within the video element
    domVars.videoPlayer.insertAdjacentHTML(
      "afterbegin",
      '<source id="videoSource" src="' + this.videoPath + '" type="video/mp4">'
    );

    // Set the audio volume
    domVars.videoPlayer.volume = this.videoPlayerVolume;

    //Start on touch (domVars.touchToBeginSlide)
    domVars.touchToBeginSlide.onclick = function (event) {
      fadeIn(domVars.controls);
      fadeIn(domVars.returnHomeBtn);
      timeFadeOut();
      fadeOut(this);
      playVideoFunctions();
      event.stopPropagation();
    };

    //Define reset function to reset the page to 'home' status
    function pageReset() {
      domVars.videoPlayer.pause();
      fadeIn(domVars.touchToBeginSlide);

      setTimeout(() => {
        domVars.videoPlayer.currentTime = 0;
        domVars.scrubBar.value = 0;
        domVars.playPauseBtnIcon.classList.remove("fa-pause");
        domVars.playPauseBtnIcon.classList.add("fa-play");

        fadeOut(domVars.returnHomeBtn);
        fadeOut(domVars.controls);
      }, 300);
    }

    // Navigate back to home on video end
    domVars.videoPlayer.addEventListener("ended", function () {
      pageReset();
    });

    // Navigate back to home on domVars.returnHomeBtn click
    domVars.returnHomeBtn.onclick = function () {
      pageReset();
    };

    // Display domVars.controls for 5 seconds on page load then fade
    let timer;
    const timeVisible = 5000;

    function timeFadeOut() {
      timer = setTimeout(function () {
        fadeOut(domVars.controls);
      }, timeVisible);
    }

    timeFadeOut();

    // Display domVars.controls on user interaction with domVars.screenDiv
    document.body.addEventListener(
      interactionEvents.clickEvent,
      function (event) {
        clearTimeout(timer);
        if (
          domVars.controlBar.contains(event.target) ||
          domVars.returnHomeBtn.contains(event.target) ||
          domVars.playPauseBtn.contains(event.target)
        ) {
          timeFadeOut();
        } else if (domVars.screenDiv.contains(event.target)) {
          if (domVars.controls.classList.contains("invisible")) {
            fadeIn(domVars.controls);
            fadeIn(domVars.returnHomeBtn);
            timeFadeOut();
          } else {
            fadeOut(domVars.controls);
          }
        }
      }
    );

    // Define play video functions
    let videoInterval;
    function playVideoFunctions() {
      domVars.videoPlayer.play();
      videoInterval = setInterval(calcVideoProgressAndUpdateScrubBar, 25);
      domVars.playPauseBtnIcon.classList.add("fa-pause");
      domVars.playPauseBtnIcon.classList.remove("fa-play");
    }

    // Define pause video functions
    function pauseVideoFunctions() {
      domVars.videoPlayer.pause();
      clearInterval(videoInterval);
      domVars.playPauseBtnIcon.classList.add("fa-play");
      domVars.playPauseBtnIcon.classList.remove("fa-pause");
    }

    // Play and pause functions for domVars.playPauseBtn
    domVars.playPauseBtn.addEventListener(
      interactionEvents.clickEvent,
      function () {
        if (domVars.videoPlayer.paused == true) {
          playVideoFunctions();
          fadeOut(domVars.returnHomeBtn);
        } else {
          pauseVideoFunctions();
          fadeIn(domVars.returnHomeBtn);
        }
      }
    );

    // Functions for domVars.scrubBar
    domVars.scrubBar.addEventListener("input", function () {
      let time = domVars.videoPlayer.duration * (domVars.scrubBar.value / 100);
      domVars.videoPlayer.currentTime = time;
    });

    // Scrub bar function used with setInterval() during playVideoFunctions()
    function calcVideoProgressAndUpdateScrubBar() {
      let value =
        (100 / domVars.videoPlayer.duration) * domVars.videoPlayer.currentTime;
      domVars.scrubBar.value = value;
    }

    domVars.scrubBar.addEventListener(
      interactionEvents.pressDownEvent,
      function () {
        domVars.videoPlayer.pause();
      }
    );

    domVars.scrubBar.addEventListener(
      interactionEvents.releaseEvent,
      function () {
        domVars.videoPlayer.play();
        domVars.playPauseBtnIcon.classList.add("fa-pause");
        domVars.playPauseBtnIcon.classList.remove("fa-play");
      }
    );
  },
};

export { singleVideoPlayer };
