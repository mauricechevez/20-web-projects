/* Global Variables */
const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progressBar = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
/* END of Global Variables */

/* %%%%% Functions %%%%% */

    // Play and Pause Video
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
}
    // Update play/pause button
function updatePlayIcon(){
     if(video.paused){
        playBtn.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
     } else {
        playBtn.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
     }
}

    // Update progress of video & timestap
function updateProgress(){
    progressBar.value = (video.currentTime / video.duration) * 100;

    // get minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + String(mins);
    }

    let seconds = Math.floor(video.currentTime % 60);
    if(seconds < 10){
        seconds = '0' + String(seconds);
    }

    timestamp.innerText = `${mins}:${seconds}`;

    console.log(`There is ${(100 - progressBar.value)}% elapse`)

}

function setVideoProgress(e){
    video.currentTime = (+progressBar.value * video.duration) / 100;
}

    // Stop the video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

/* %%%%% END Functions %%%%% */


// Event Listeners
video.addEventListener('click',toggleVideoStatus);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play',updatePlayIcon);
video.addEventListener('timeupdate',updateProgress);

playBtn.addEventListener('click',toggleVideoStatus);

stopBtn.addEventListener('click',stopVideo);

progressBar.addEventListener('change',setVideoProgress);

