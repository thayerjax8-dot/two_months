document.addEventListener("DOMContentLoaded", () => {
    // 1. Photo File Names (Exactly as you uploaded)
    const photoFiles = [
        "1.jpg.JPG", "2.jpg.JPG", "3.jpg.JPG", "4.jpg.JPG", "5.jpg.JPG",
        "6.jpg.JPG", "7.jpg.JPG", "8.jpg.HEIC", "9.jpg.HEIC", "10.jpg.HEIC",
        "11.jpg.JPG", "12.jpg.HEIC", "13.jpg.JPG", "14.jpg.HEIC", "15.jpg.JPG",
        "16.jpg.HEIC", "17.jpg.JPG", "18.jpg.JPG", "19.jpg.JPG", "20.jpg.JPG"
    ];

    // 2. Playlist Names
    const playlist = [
        "Eagles - Lyin' Eyes (Official Audio).mp3",
        "Missed Call.mp3",
        "Katy Perry - Last Friday Night (Lyrics).mp3",
        "Zach Bryan - Madeline (feat. Gabriella Rose).mp3",
        "Flatland Cavalry - Sleeping Alone (Official Audio).mp3"
    ];

    let currentTrack = 0;
    const audio = document.getElementById("bg-music");
    const trackLabel = document.getElementById("current-track");

    // 3. Grid Generation
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

    // 4. THE NEXT SONG BUTTON FIX
    const nextBtn = document.getElementById("next-song-btn");
    nextBtn.addEventListener("click", () => {
        // Move to the next index
        currentTrack = (currentTrack + 1) % playlist.length;

        // Force reload the source
        audio.src = playlist[currentTrack];
        audio.load(); // Tells the browser to dump old data and fetch new file
        
        // Update the display text
        trackLabel.textContent = playlist[currentTrack].split('.')[0];

        // Start playing
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay was prevented. Click the heart!");
            });
        }
    });

    // 5. General Interaction Logic
    document.getElementById("heart-btn").onclick = () => audio.play();
    document.getElementById("volume-slider").oninput = (e) => audio.volume = e.target.value;
    document.getElementById("view-gallery-btn").onclick = () => document.getElementById("gallery-start").scrollIntoView();
    document.querySelector(".close-btn").onclick = () => document.getElementById("photo-modal").style.display = "none";

    // 6. Timer (Nov 29, 2025 at 8:39 PM)
    const startDate = new Date("November 29, 2025 20:39:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = now - startDate;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById("timer").textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
});
