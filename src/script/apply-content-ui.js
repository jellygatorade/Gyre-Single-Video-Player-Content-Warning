import { domVars } from "./global-vars-dom.js";
import { singleVideoPlayer } from "./single-video-player.js";

function applyContent(data) {
  // Content Warning - Touch to play
  domVars.homeBgImg.src = data.bg_image_path;
  domVars.contentWarning.innerHTML = data.en.general.content_warning;
  domVars.exitNote.innerHTML = data.en.general.exit_note;
  domVars.touchToPlay.innerHTML = data.en.general.touch_to_play;

  // Video Player
  singleVideoPlayer.videoPath = data.main_video_path;
  singleVideoPlayer.init();
}

export { applyContent };
