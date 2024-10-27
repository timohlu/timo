let hoveredVideo = null;

document.querySelectorAll('.video-container').forEach(function (container) {
  const video = container.querySelector('video');
  const playButton = container.querySelector('.play');
  const pauseButton = container.querySelector('.pause');
  const muteButton = container.querySelector('.mute');
  const unmuteButton = container.querySelector('.unmute');
  const playPauseButton = container.querySelector('.play-pause-button');
  const muteButtonElement = container.querySelector('.mute-button');
  const playbackContainer = container.querySelector('.playback-container');
  const playbackBar = container.querySelector('.playback-bar');

  // Initialize control icons based on the initial state of the video
  updateControls(video);

  // Event listeners for control buttons
  playPauseButton.addEventListener('click', function () {
    togglePlay();
  });

  muteButtonElement.addEventListener('click', function () {
    toggleMute();
  });

  // Add click event listener to the video to toggle play/pause
  video.addEventListener('click', function () {
    togglePlay();
  });

  // Update hoveredVideo when mouse enters/leaves
  video.addEventListener('mouseenter', function () {
    hoveredVideo = video;
  });

  video.addEventListener('mouseleave', function () {
    if (hoveredVideo === video) {
      hoveredVideo = null;
    }
  });

  // Allow seeking by clicking on the playback bar
  playbackContainer.addEventListener('click', function (e) {
    const rect = playbackContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    video.currentTime = percentage * video.duration;
    updatePlaybackBar(); // Update the playback bar immediately
  });

  // Listen to video state changes and update controls
  video.addEventListener('play', function () {
    updateControls(video);
    requestAnimationFrame(updatePlaybackBar); // Start the animation loop
  });

  video.addEventListener('pause', function () {
    updateControls(video);
  });

  video.addEventListener('volumechange', function () {
    updateControls(video);
  });

  video.addEventListener('ended', function () {
    updateControls(video);
  });

  // Define the updatePlaybackBar function
  function updatePlaybackBar() {
    const percentage = (video.currentTime / video.duration) * 100;
    playbackBar.style.width = percentage + '%';

    if (!video.paused && !video.ended) {
      requestAnimationFrame(updatePlaybackBar);
    }
  }

  // Define toggle functions
  function togglePlay() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function toggleMute() {
    video.muted = !video.muted;
  }
});

// Handle keyboard events for the hovered video
document.addEventListener('keydown', function (event) {
  if (hoveredVideo) {
    if (event.key === 'm') {
      event.preventDefault();
      hoveredVideo.muted = !hoveredVideo.muted;
    }
    if (event.code === 'Space') {
      event.preventDefault();
      if (hoveredVideo.paused) {
        hoveredVideo.play();
      } else {
        hoveredVideo.pause();
      }
    }
  }
});

// Function to update control icons based on video state
function updateControls(video) {
  const container = video.closest('.video-container');
  if (container) {
    const playButton = container.querySelector('.play');
    const pauseButton = container.querySelector('.pause');
    const muteButton = container.querySelector('.mute');
    const unmuteButton = container.querySelector('.unmute');

    // Update play/pause icons
    if (video.paused) {
      playButton.style.display = 'block';
      pauseButton.style.display = 'none';
    } else {
      playButton.style.display = 'none';
      pauseButton.style.display = 'block';
    }

    // Update mute/unmute icons
    if (video.muted) {
      muteButton.style.display = 'none';
      unmuteButton.style.display = 'block';
    } else {
      muteButton.style.display = 'block';
      unmuteButton.style.display = 'none';
    }
  }
}

// Pause all videos when the document loses focus
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    document.querySelectorAll('.video-container').forEach(function (container) {
      const video = container.querySelector('video');
      video.pause();
    });
  }
});