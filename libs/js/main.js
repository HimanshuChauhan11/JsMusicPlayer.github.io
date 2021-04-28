const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const pre = document.getElementById("pre");
const next = document.getElementById("next");
const artist = document.getElementById("artist");
let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");
// let progress = document.getElementById("progress");
const title = document.getElementById("title");

const songs = [
  {
    name: "alone",
    title: "Alone",
    artist: "Marshmellow",
  },
  {
    name: "think",
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
  },
  {
    name: "We",
    title: "We don't talk",
    artist: "Charlle Puth",
  },
];

let isPlaying = false;
//for play music
const playMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};
//for pause function
let pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};
//For play  and pause
play.addEventListener("click", () => {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});
//changing the music data
const loadsongs = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "libs/music/" + songs.name + ".mp3";
  img.src = "libs/img/" + songs.name + ".jpg";
};
let songindex = 2;
const nextSong = () => {
  songindex = (songindex + 1) % songs.length;
  loadsongs(songs[songindex]);
  playMusic();
};

const preSong = () => {
  songindex = (songindex - 1 + songs.length) % songs.length;
  loadsongs(songs[songindex]);
  playMusic();
};

//prgress bar js

music.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  /* music duration update*/
  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);

  let tot_duration = `${min_duration}:${sec_duration}`;
  total_duration.textContent = `${tot_duration}`;

  //Current duration update

  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);

  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
  current_time.textContent = `${tot_currentTime}`;
});

progress_div.addEventListener("click", (event) => {
  const { duration } = music;
  let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = move_progress;
});

music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
pre.addEventListener("click", preSong);
