const VIDEO_ID = 'XgMsLuislvw';
let player = null;
let playerReady = false;

const youtubePlayerElement = document.getElementById('youtube-player');
if (!youtubePlayerElement) {
  console.error('[MusicPlayer] ERROR: YouTube player container not found!');
}

const musicPlayerBtn = document.getElementById('musicPlayerBtn');
if (!musicPlayerBtn) {
  console.error('[MusicPlayer] ERROR: Music player button not found!');
}

window.onYouTubeIframeAPIReady = function() {
  console.log('[MusicPlayer] YouTube API Loaded');
  
  if (!youtubePlayerElement) {
    console.error('[MusicPlayer] Cannot initialize: YouTube player container missing');
    return;
  }
  
  try {
    player = new YT.Player('youtube-player', {
      width: 1,
      height: 1,
      videoId: VIDEO_ID,
      playerVars: {
        'autoplay': 1,
        'mute': 0,
        'controls': 0,
        'modestbranding': 1,
        'rel': 0,
        'showinfo': 0,
        'iv_load_policy': 3
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      }
    });
  } catch (error) {
    console.error('[MusicPlayer] Error initializing player:', error);
  }
};

function onPlayerReady(event) {
  console.log('[MusicPlayer] Player Ready - Auto playing');
  playerReady = true;
  updateButtonUI();

  if (musicPlayerBtn) {
    musicPlayerBtn.removeEventListener('click', togglePlayPause);
    musicPlayerBtn.addEventListener('click', togglePlayPause);
  }
}

function onPlayerStateChange(event) {
  // Auto-loop ketika lagu selesai
  if (event.data === YT.PlayerState.ENDED) {
    if (player) {
      player.playVideo();
    }
  }
  updateButtonUI();
}

function onPlayerError(event) {
  console.error('[MusicPlayer] YouTube Player Error:', event.data);
}

function togglePlayPause() {
  if (!player || !playerReady) {
    console.warn('[MusicPlayer] Player not ready yet');
    return;
  }

  try {
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    updateButtonUI();
  } catch (error) {
    console.error('[MusicPlayer] Error toggling play/pause:', error);
  }
}

function updateButtonUI() {
  if (!player || !playerReady || !musicPlayerBtn) return;

  try {
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      musicPlayerBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      musicPlayerBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  } catch (error) {
    console.error('[MusicPlayer] Error updating UI:', error);
  }
}
