var video = document.getElementById("video-one");
const pauseButton = document.getElementById("pause")
const playButton = document.getElementById("play")
const muteButton = document.getElementById("mute")
const unmuteButton = document.getElementById("unmute")

function toggleMute() {
  if (video.muted) {
    video.muted = false;
    unmuteButton.style.display = "none";
    muteButton.style.display = "block";
  } else {
    video.muted = true;
    muteButton.style.display = "none";
    unmuteButton.style.display = "block";
  }
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playButton.style.display = "none";
    pauseButton.style.display = "block";
  } else {
    video.pause();
    playButton.style.display = "block";
    pauseButton.style.display = "none";
  }
}