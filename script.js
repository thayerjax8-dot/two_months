document.addEventListener("DOMContentLoaded", () => {
    // 1. Data
    const messages = [
        "I love you more every day 🥺",
        "Two months already, forever to go 💖",
        "You make my life better ✨",
        "I'm so lucky to have you 💕",
        "This is just the beginning 😊"
    ];

    const playlist = ["song1.mp3", "song2.mp3", "song3.mp3", "song4.mp3", "song5.mp3"];
    let currentSongIndex = 0;

    // 2. Elements
    const heartBtn = document.getElementById("heart-btn");
    const nextBtn = document.getElementById("next-song-btn");
    const messageText = document.getElementById("message");
    const music = document.getElementById("bg-music");
    const musicSource = document.getElementById("music-source");
    const timerDisplay = document.getElementById("timer");

    // 3. Timer Logic (Starting Nov 29, 2025 at 8:39 PM)
    const startDate = new Date("November 29, 2025 20:39:00").getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const difference = now - startDate;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        timerDisplay.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }

    setInterval(updateTimer, 1000); // Update every second
    updateTimer(); // Run once immediately

    // 4. Heart Button Logic
    heartBtn.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * messages.length); 
        messageText.textContent = messages[randomIndex];
        
        if (music.paused) {
            music.play();
        }
    });

    // 5. Playlist Logic
    nextBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        musicSource.src = playlist[currentSongIndex];
        music.load();
        music.play();
    });
});
