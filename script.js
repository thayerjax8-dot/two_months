document.addEventListener("DOMContentLoaded", () => {
    const photoFiles = [
        "1.jpg.JPG", "2.jpg.JPG", "3.jpg.JPG", "4.jpg.JPG", "5.jpg.JPG",
        "6.jpg.JPG", "7.jpg.JPG", "8.jpg.HEIC", "9.jpg.HEIC", "10.jpg.HEIC",
        "11.jpg.JPG", "12.jpg.HEIC", "13.jpg.JPG", "14.jpg.HEIC", "15.jpg.JPG",
        "16.jpg.HEIC", "17.jpg.JPG", "18.jpg.JPG", "19.jpg.JPG", "20.jpg.JPG"
    ];

    const playlist = [
        "Eagles - Lyin' Eyes (Official Audio).mp3",
        "Missed Call.mp3",
        "Katy Perry - Last Friday Night (Lyrics).mp3",
        "Zach Bryan - Madeline (feat. Gabriella Rose).mp3",
        "Flatland Cavalry - Sleeping Alone (Official Audio).mp3"
    ];

    let currentSongIndex = 0;
    const music = document.getElementById("bg-music");
    const musicSource = document.getElementById("music-source");
    const songDisplay = document.getElementById("song-title");

    // 1. Photo Grid Logic
    const grid = document.getElementById("photo-grid");
    photoFiles.forEach((file, index) => {
        const pol = document.createElement("div");
        pol.className = "polaroid";
        pol.innerHTML = `<img src="${file}" loading="lazy"><p>Memory #${index + 1}</p>`;
        pol.onclick = () => {
            document.getElementById("modal-img").src = file;
            document.getElementById("modal-caption").textContent = `Memory #${index + 1} ❤️`;
            document.getElementById("photo-modal").style.display = "flex";
        };
        grid.appendChild(pol);
    });

    // 2. THE NEXT SONG FIX
    const nextBtn = document.getElementById("next-song-btn");
    nextBtn.onclick = () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        
        // Update the source
        music.pause();
        musicSource.src = playlist[currentSongIndex];
        
        // Crucial: Reload the audio element with the new source
        music.load(); 
        
        // Update the display text (cleaning up the .mp3 part)
        songDisplay.textContent = playlist[currentSongIndex].replace(".mp3", "");
        
        // Play
        music.play().catch(e => console.log("Playback error:", e));
    };

    // 3. General Controls
    document.getElementById("heart-btn").onclick = () => { if(music.paused) music.play(); };
    document.getElementById("volume-slider").oninput = (e) => { music.volume = e.target.value; };
    document.querySelector(".close-btn").onclick = () => { document.getElementById("photo-modal").style.display = "none"; };
    document.getElementById("view-gallery-btn").onclick = () => { document.getElementById("gallery-start").scrollIntoView(); };

    // 4. Timer
    const startDate = new Date("November 29, 2025 20:39:00").getTime();
    setInterval(() => {
        const diff = new Date().getTime() - startDate;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById("timer").textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
});
