import { playList } from "./tracksObj.js";

const musicBg           = document.querySelector("#musicBackground");
const audioBtn          = document.querySelector("#audioBtn");
const nextBtn           = document.querySelector('#next');
const previousBtn       = document.querySelector('#previous');
const shuffleBtn        = document.querySelector('#shuffleBtn');
const audioTag          = document.querySelector("#audioTag");
const artistTag         = document.querySelector('#artist');
const musicTitleTag     = document.querySelector('#musicTitle');
const fixDuration       = document.querySelector('#fixDuration');
const updateDuration    = document.querySelector('#updateDuration');
const animateProgressBar= document.querySelector('#animateProgressBar');
const progressContainer = document.querySelector('#progressContainer');
const musicImgBox       = document.querySelector('#musicImgBox');
let isPlay          = false;
let index           = 0;

// Play audio
function audioPlay() 
    {
    isPlay = !isPlay;
    renderAudioBtn();
    playPause();
    }

// whether the song is played or pauseds
function playPause() 
    {
    !isPlay ? audioTag.pause() : audioTag.play();
    }

// play next
function next()
    {
        isPlay = true;
        if (index < playList.length - 1) {
            index++;
        };
        renderAudioBtn();
        loadAudioDetail(playList[index])
        playPause();
    }
// play previous
function previous()
    {
        isPlay = true;
        if (index > 0) {
            index--;
        };
        renderAudioBtn();
        loadAudioDetail(playList[index])
        playPause();
    }


// shuffle play
function shuffle()
{
    const randomIndex = Math.floor(Math.random() * playList.length);
    loadAudioDetail(playList[randomIndex]);
    isPlay = false
    audioPlay()
}
const playBtn = `<i class="fa-solid relative z-10
                        fa-circle-play text-red-500 
                        hover:text-red-800 transition text-6xl">
                                <div class="absolute w-8 h-8 bg-white 
                                            -z-10 inset-0 m-auto rounded-full">
                                </div>
                </i>`;

const pauseBtn = `<i class="fa-solid fa-circle-pause
                         text-red-500 hover:text-red-800 
                         transition text-6xl relative z-10">
                                <div class="absolute w-8 h-8 bg-white 
                                            -z-10 inset-0 m-auto rounded-full">
                                </div>
                         </i>`
// Render Audio Button types
function renderAudioBtn() 
    {
        renderShadowAnimation();
        !isPlay
        ? (audioBtn.innerHTML = playBtn)
        : (audioBtn.innerHTML = pauseBtn);
    }

// render Shadow animation
function renderShadowAnimation() 
    {
        if (isPlay) {
            musicImgBox.style.animationPlayState = 'running';
        }else{
            musicImgBox.style.animationPlayState = 'paused';
        }
    }

audioTag.addEventListener("ended", function() 
    {
        // play next when the audio ends
        next();
    });

// load audio detail
function loadAudioDetail({artist, musicTitle, src , imgSrc})
    {
        musicBg.style.backgroundImage = `url(${imgSrc})`;
        artistTag.innerHTML     = artist ;
        musicTitleTag.innerHTML = musicTitle ;
        audioTag.src            = src ;
    }

// load audio duration
audioTag.addEventListener('loadeddata', function () {
    let duration    = Math.floor(audioTag.duration);
    let minute      = Math.floor(duration / 60);
    let second      = Math.floor(duration % 60);
    fixDuration.innerText = (minute < 10 ?`0${minute}:`: minute) + (second < 10 ? `0${second}`: second);
})

// load audio time update
audioTag.addEventListener('timeupdate', function () {
    let totalDuration = Math.floor(audioTag.duration);
    let currentTime = Math.floor(audioTag.currentTime);
    let minute = Math.floor(currentTime / 60);
    let second = Math.floor(currentTime % 60);
    updateDuration.innerText = updateDuration.innerText = (minute < 10 ?`0${minute}:`: minute) + (second < 10 ? `0${second}`: second);

    let progress = Math.floor((currentTime/totalDuration) * 100);
    animateProgressBar.style.width = `${progress}%`;
    
})



// Allow seeking by clicking on the progress bar 
// important
progressContainer.addEventListener('click', (e) => {
  const containerWidth = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const seekTime = (clickX / containerWidth) * audioTag.duration;
  audioTag.currentTime = seekTime;
});



// page load
document.addEventListener("DOMContentLoaded", () => {
  renderAudioBtn();
  audioBtn.addEventListener('click', () => audioPlay());
  nextBtn.addEventListener('click', () => next());
  previousBtn.addEventListener('click', () => previous());
  shuffleBtn.addEventListener('click', () => shuffle())
  
  loadAudioDetail(playList[index]);
  musicImgBox.style.animationName = 'shadowAnimate'
});
