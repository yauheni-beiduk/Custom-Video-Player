const player = document.querySelector('.player');
const video = player.querySelector('.player-video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-filled');
const toggle = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player-input');
const size = player.querySelector('.over-size');
const controls = document.querySelector('.controls')
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
    player.classList.toggle('full-screen');
}


function progressTrue() {
    mousedown = true;
}

function progressFalse() {
    mousedown = false;
}

function remind(e) {
    mousedown && scrub(e);
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
progress.addEventListener('mousemove', remind);
progress.addEventListener('mousedown',progressTrue);
progress.addEventListener('mouseup', progressFalse);
size.addEventListener('click', fullScreen);
