// youtube player promo section
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1040px',
    width: '2400px',
    videoId: 'RbfJTBBIrso',
    playerVars: { 'autoplay': 1, 'controls': 0 },
    loopPlaylists: true,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.setVolume(0);
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    event.target.playVideo();
  }
}

function stopVideo() {
  player.stopVideo();
}