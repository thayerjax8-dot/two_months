document.addEventListener("DOMContentLoaded", () => {
    const messages = [
        "I love you more every day 🥺",
        "Two months already, forever to go 💖",
        "You make my life better ✨",
        "I'm so lucky to have you 💕",
        "This is just the beginning 😊"
    ];

    const playlist = [
        "Eagles - Lyin' Eyes (Official Audio).mp3",
        "Missed Call.mp3",
        "Katy Perry - Last Friday Night (Lyrics).mp3",
        "Zach Bryan - Madeline (feat. Gabriella Rose).mp3",
        "Flatland Cavalry - Sleeping Alone (Official Audio).mp3"
    ];
    
    let currentSongIndex = 0;

    const heartBtn = document.getElementById("heart-btn");
    const nextBtn = document.getElementById("next-song-btn");
    const messageText = document.getElementById("message");
    const music = document.getElementById("bg-music");
    const musicSource = document.getElementById("music-source");
    const timerDisplay = document.getElementById("timer");
    const volumeSlider = document.getElementById("volume-slider");

    // Set default volume
    music.volume = 0.5;

    // Timer Logic (Nov 29, 2025 at 8:39 PM)
    const startDate = new Date("November 29, 2025 20:39:00").getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        timerDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // Heart Click: Fixes Audio & Changes Message
    heartBtn.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        messageText.textContent = messages[randomIndex];
        
        // Browsers require a click to play audio
        music.play().then(() => {
            console.log("Playing: " + playlist[currentSongIndex]);
        }).catch(error => {
            console.log("Playback failed. Please try clicking again.");
        });
    });

    // Next Song Button
    nextBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        musicSource.src = playlist[currentSongIndex];
        music.load(); 
        music.play();
    });

    // Volume Slider Logic
    volumeSlider.addEventListener("input", (e) => {
        music.volume = e.target.value;
    });
});
