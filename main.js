const player = document.querySelector('.player');
const video = player.querySelector('.player-video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-filled');
const toggle = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player-input');
const size = player.querySelector('.over-size');
const controls = document.querySelector('.controls')
// size.width = window.innerWidth;
// size.height = window.innerHeight - progress.offsetHeight;
function togglePlay() {
const playPause = video.paused ? 'play' : 'pause';
video[playPause]();
}

function updateBtn() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)  // +10s or -10s video
}

function handleRangeUpdate() {
video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`
}

function scrub(e) {
const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
video.currentTime = scrubTime
}


function fullScreen() {
    document.getElementsByTagName('video')[0].requestFullscreen().addEventListener('click', togglePlay) ;
    // player.classList.toggle('full-screen');
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipBtns.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))  
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
size.addEventListener('click', fullScreen);
