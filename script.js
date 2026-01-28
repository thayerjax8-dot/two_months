document.addEventListener("DOMContentLoaded", () => {
    // 1. Files
    const photoFiles = [
        "1.jpg.JPG", "2.jpg.JPG", "3.jpg.JPG", "4.jpg.JPG", "5.jpg.JPG",
        "6.jpg.JPG", "7.jpg.JPG", "8.jpg.jpg", "9.jpg.jpg", "10.jpg.jpg",
        "11.jpg.JPG", "12.jpg.jpg", "13.jpg.JPG", "14.jpg (1).jpg", "15.jpg.JPG",
        "16.jpg (1).jpg", "17.jpg.JPG", "18.jpg.JPG", "19.jpg.JPG", "20.jpg.JPG"
    ];

    const playlist = [
        "Eagles - Lyin' Eyes (Official Audio).mp3",
        "Missed Call.mp3",
        "Katy Perry - Last Friday Night (Lyrics).mp3",
        "Zach Bryan - Madeline (feat. Gabriella Rose).mp3",
        "Flatland Cavalry - Sleeping Alone (Official Audio).mp3"
    ];

    // 2. Elements
    let currentTrack = 0;
    let currentPhoto = 0;
    const audio = document.getElementById("bg-music");
    const record = document.getElementById("record-disc");
    const trackLabel = document.getElementById("current-track");
    const slider = document.getElementById("photo-slider");

    // 3. Slideshow Generation
    photoFiles.forEach(file => {
        const img = document.createElement("img");
        img.src = file;
        slider.appendChild(img);
    });

    const updateSlider = () => {
        const imgs = slider.querySelectorAll("img");
        imgs.forEach((img, i) => {
            img.style.transform = `translateX(-${currentPhoto * 100}%)`;
        });
    };

    document.getElementById("next-btn").onclick = () => {
        currentPhoto = (currentPhoto + 1) % photoFiles.length;
        updateSlider();
    };

    document.getElementById("prev-btn").onclick = () => {
        currentPhoto = (currentPhoto - 1 + photoFiles.length) % photoFiles.length;
        updateSlider();
    };

    // 4. Record Player (Click to Play / Spin to skip)
    record.onclick = () => {
        if (audio.paused) {
            audio.play();
            record.classList.add("spinning");
        } else {
            // "Spin to skip" - clicking while playing goes to next song
            currentTrack = (currentTrack + 1) % playlist.length;
            audio.src = playlist[currentTrack];
            audio.load();
            audio.play();
            trackLabel.textContent = playlist[currentTrack].split('.')[0];
        }
    };

    audio.onpause = () => record.classList.remove("spinning");
    audio.onplay = () => record.classList.add("spinning");

    // 5. Volume & Navigation
    document.getElementById("volume-slider").oninput = (e) => audio.volume = e.target.value;
    document.getElementById("view-gallery-btn").onclick = () => document.getElementById("gallery-start").scrollIntoView();

    // 6. Countdown Logic
    const updateCountdown = (targetDate, elementId) => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff < 0) {
            document.getElementById(elementId).textContent = "The day is here! ❤️";
            return;
        }

        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        document.getElementById(elementId).textContent = `${d}d ${h}h ${m}m ${s}s`;
    };

    // Dates
    const anniversary = new Date("November 29, 2025 20:39:00").getTime();
    const valentines = new Date("February 14, 2026 00:00:00").getTime();
    const stagecoach = new Date("April 25, 2026 00:00:00").getTime();

    setInterval(() => {
        // Together counter (counts UP)
        const togetherDiff = new Date().getTime() - anniversary;
        const d = Math.floor(togetherDiff / 86400000);
        const h = Math.floor((togetherDiff % 86400000) / 3600000);
        const m = Math.floor((togetherDiff % 3600000) / 60000);
        const s = Math.floor((togetherDiff % 60000) / 1000);
        document.getElementById("timer").textContent = `${d}d ${h}h ${m}m ${s}s`;

        // Look forward to (counts DOWN)
        updateCountdown(valentines, "vday-timer");
        updateCountdown(stagecoach, "stagecoach-timer");
    }, 1000);
});
