document.addEventListener("DOMContentLoaded", () => {
    // 1. DATA
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

    const notes = {
        miss: "Hi Lily! Whenever you miss me, first you should try to find a distraction. But if that doesn't work, just imagine giving me the biggest hug when you see me, and think of a joke to tell me! I love you.",
        badDay: "Hi Lily! If you're having a bad day for whatever reason, please remember that you're an awesome person. Think of all the people who care about you and would want to hear about your day—whether to comfort you or celebrate it with you. Remember those who care and do so much for you!"
    };

    let currentTrack = 0;
    let currentPhoto = 0;

    // 2. ELEMENT SELECTORS
    const audio = document.getElementById("bg-music");
    const record = document.getElementById("record-disc");
    const trackLabel = document.getElementById("current-track");
    const slider = document.getElementById("photo-slider");
    const playPauseBtn = document.getElementById("play-pause-toggle");

    // 3. AUDIO LOGIC
    playPauseBtn.onclick = () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "Pause Music ⏸️";
        } else {
            audio.pause();
            playPauseBtn.textContent = "Play Music 🎵";
        }
    };

    document.getElementById("skip-track").onclick = () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        audio.src = playlist[currentTrack];
        audio.load();
        audio.play();
        trackLabel.textContent = playlist[currentTrack].split('.')[0];
        playPauseBtn.textContent = "Pause Music ⏸️";
    };

    audio.onplay = () => record.classList.add("spinning");
    audio.onpause = () => record.classList.remove("spinning");

    // 4. OPEN WHEN LOGIC
    document.getElementById("miss-btn").onclick = () => {
        document.getElementById("note-text").textContent = notes.miss;
        document.getElementById("note-display").classList.remove("hidden");
    };

    document.getElementById("badDay-btn").onclick = () => {
        document.getElementById("note-text").textContent = notes.badDay;
        document.getElementById("note-display").classList.remove("hidden");
    };

    document.getElementById("close-note-btn").onclick = () => {
        document.getElementById("note-display").classList.add("hidden");
    };

    // 5. SLIDER POPULATION & NAV
    photoFiles.forEach(file => {
        const img = document.createElement("img");
        img.src = file;
        slider.appendChild(img);
    });

    document.getElementById("next-btn").onclick = () => {
        currentPhoto = (currentPhoto + 1) % photoFiles.length;
        updateSlider();
    };

    document.getElementById("prev-btn").onclick = () => {
        currentPhoto = (currentPhoto - 1 + photoFiles.length) % photoFiles.length;
        updateSlider();
    };

    function updateSlider() {
        const imgs = slider.querySelectorAll("img");
        imgs.forEach(img => img.style.transform = `translateX(-${currentPhoto * 100}%)`);
    }

    // 6. ALL TIMERS
    const annivDate = new Date("November 29, 2025 20:39:00").getTime();
    const vdayDate = new Date("February 14, 2026 00:00:00").getTime();
    const aspenDate = new Date("February 17, 2026 00:00:00").getTime();
    const stageDate = new Date("April 25, 2026 00:00:00").getTime();

    function updateAllTimers() {
        const now = new Date().getTime();

        // Together Count Up
        const up = now - annivDate;
        document.getElementById("timer").textContent = 
            `${Math.floor(up/86400000)}d ${Math.floor((up%86400000)/3600000)}h ${Math.floor((up%3600000)/60000)}m ${Math.floor((up%60000)/1000)}s`;

        // Function for Count Downs
        const setCD = (target, elId) => {
            const diff = target - now;
            if (diff > 0) {
                document.getElementById(elId).textContent = 
                    `${Math.floor(diff/86400000)}d ${Math.floor((diff%86400000)/3600000)}h ${Math.floor((diff%3600000)/60000)}m ${Math.floor((diff%60000)/1000)}s`;
            } else {
                document.getElementById(elId).textContent = "It's time! ❤️";
            }
        };

        setCD(vdayDate, "vday-timer");
        setCD(aspenDate, "aspen-timer");
        setCD(stageDate, "stagecoach-timer");
    }

    setInterval(updateAllTimers, 1000);

    // 7. HEARTS
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.getElementById("hearts-container").appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 500);

    // 8. OTHER CONTROLS
    document.getElementById("volume-slider").oninput = (e) => audio.volume = e.target.value;
    document.getElementById("view-gallery-btn").onclick = () => document.getElementById("gallery-start").scrollIntoView({behavior: 'smooth'});
});
