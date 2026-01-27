document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    "I can't wait to see you running around with your long stick,
    " I'm Ken Tran, your husband.",
    "You make me so h.....",
    "Can you sit on my..",
  ];

  const button = document.getElementById("heart-btn");
  const messageText = document.getElementById("message");

  button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageText.textContent = messages[randomIndex];
  });
});

const music = document.getElementById("bg-music");
const source = document.getElementById("music-source");
const nextBtn = document.getElementById("next-song-btn");

// 1. List your 5 songs here
const playlist = [
    "song1.mp3",
    "song2.mp3",
    "song3.mp3",
    "song4.mp3",
    "song5.mp3"
];

let currentSongIndex = 0;

nextBtn.addEventListener("click", () => {
    // Move to the next song index
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    
    // Change the source and reload the player
    source.src = playlist[currentSongIndex];
    music.load(); 
    music.play();
    
    console.log("Now playing: " + playlist[currentSongIndex]);
});
