document.addEventListener("DOMContentLoaded", () => {
    // 1. Data: Quotes and Music Playlist
    const messages = [
        "I love you more every day 🥺",
        "Two months already, forever to go 💖",
        "You make my life better ✨",
        "I'm so lucky to have you 💕",
        "This is just the beginning 😊"
    ];

    // EXACT filenames from your GitHub uploads
    const playlist = [
        "Eagles - Lyin' Eyes (Official Audio).mp3",
        "Missed Call.mp3",
        "Katy Perry - Last Friday Night (Lyrics).mp3",
        "Zach Bryan - Madeline (feat. Gabriella Rose).mp3",
        "Flatland Cavalry - Sleeping Alone (Official Audio).mp3"
    ];
    
    let currentSongIndex = 0;

    // 2. Element Selectors
    const heartBtn = document.getElementById("heart-btn");
    const nextBtn = document.getElementById("next-song-btn");
    const messageText = document.getElementById("message");
    const music = document.getElementById("bg-music");
    const musicSource = document.getElementById("music-source");
    const timerDisplay = document.getElementById("timer");

    // 3. Timer Logic (Starts Nov 29, 2025 at 8:39 PM)
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

    // Refresh the timer every second
    setInterval(updateTimer, 1000);
    updateTimer();

    // 4. Interaction Logic
    heartBtn.addEventListener("click", () => {
        // Change the quote randomly
        const randomIndex = Math.floor(Math.random() * messages.length);
        messageText.textContent = messages[randomIndex];
        
        // Music plays on the first interaction
        if (music.paused) {
            music.play().catch(e => console.log("Music play blocked until user clicks."));
        }
    });

    // Skip to the next song
    nextBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        musicSource.src = playlist[currentSongIndex];
        music.load(); // Reloads the player with the new file
        music.play();
    });
});
