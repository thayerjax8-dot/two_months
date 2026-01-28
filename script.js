document.addEventListener("DOMContentLoaded", () => {
    // --- 1. CONFIGURATION ---
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

    // --- 2. HEADER LOGIC ---
    const header = document.getElementById("dynamic-header");
    const hour = new Date().getHours();
    if (header) {
        if (hour >= 5 && hour < 12) header.textContent = "Good Morning, Lily ❤️";
        else if (hour >= 12 && hour < 18) header.textContent = "Good Afternoon, Lily ❤️";
        else header.textContent = "Good Evening, Lily ❤️";
    }

    // --- 3. AUDIO LOGIC ---
    const audio = document.getElementById("bg-music");
    const record = document.getElementById("record-disc");
    const trackLabel = document.getElementById("current-track");
    const playPauseBtn = document.getElementById("play-pause-toggle");
    let currentTrack = 0;

    if (playPauseBtn && audio) {
        playPauseBtn.onclick = () => {
            if (audio.paused) {
                audio.play().catch(e => console.log("Playback blocked by browser. Click again!"));
                playPauseBtn.textContent = "Pause Music ⏸️";
            } else {
                audio.pause();
                playPauseBtn.textContent = "Play Music 🎵";
            }
        };
    }

    const skipBtn = document.getElementById("skip-track");
    if (skipBtn && audio) {
        skipBtn.onclick = () => {
            currentTrack = (currentTrack + 1) % playlist.length;
            audio.src = playlist[currentTrack];
            audio.play();
            if (trackLabel) trackLabel.textContent = playlist[currentTrack].split('.')[0];
            if (playPauseBtn) playPauseBtn.textContent = "Pause Music ⏸️";
        };
    }

    if (audio && record) {
        audio.onplay = () => record.classList.add("spinning");
        audio.onpause = () => record.classList.remove("spinning");
    }

    // --- 4. SLIDER LOGIC ---
    const slider = document.getElementById("photo-slider");
    let currentPhoto = 0;

    if (slider) {
        photoFiles.forEach(file => {
            const img = document.createElement("img");
            img.src = file;
            img.onerror = () => img.style.display = 'none'; // Skip if file is missing
            slider.appendChild(img);
        });
    }

    const updateSlider = () => {
        const imgs = slider.querySelectorAll("img");
        if (imgs.length > 0) {
            imgs.forEach(img => img.style.transform = `translateX(-${currentPhoto * 100}%)`);
        }
    };

    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    if (nextBtn) nextBtn.onclick = () => { currentPhoto = (currentPhoto + 1) % photoFiles.length; updateSlider(); };
    if (prevBtn) prevBtn.onclick = () => { currentPhoto = (currentPhoto - 1 + photoFiles.length) % photoFiles.length; updateSlider(); };

    // --- 5. TIMERS ---
    const dates = {
        anniv: new Date("November 29, 2025 20:39:00").getTime(),
        vday: new Date("February 14, 2026 00:00:00").getTime(),
        aspen: new Date("February 17, 2026 00:00:00").getTime(),
        stage: new Date("April 25, 2026 00:00:00").getTime()
    };

    function updateTimers() {
        const now = new Date().getTime();
        
        // Count Up
        const up = now - dates.anniv;
        const timerEl = document.getElementById("timer");
        if (timerEl) {
            timerEl.textContent = `${Math.floor(up/86400000)}d ${Math.floor((up%86400000)/3600000)}h ${Math.floor((up%3600000)/60000)}m ${Math.floor((up%60000)/1000)}s`;
        }

        // Count Downs
        const setCD = (target, id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const diff = target - now;
            if (diff > 0) {
                el.textContent = `${Math.floor(diff/86400000)}d ${Math.floor((diff%86400000)/3600000)}h ${Math.floor((diff%3600000)/60000)}m ${Math.floor((diff%60000)/1000)}s`;
            } else {
                el.textContent = "Enjoy! ❤️";
            }
        };

        setCD(dates.vday, "vday-timer");
        setCD(dates.aspen, "aspen-timer");
        setCD(dates.stage, "stagecoach-timer");
    }
    setInterval(updateTimers, 1000);

    // --- 6. OPEN WHEN & UTILS ---
    const missBtn = document.getElementById("miss-btn");
    const badDayBtn = document.getElementById("badDay-btn");
    const noteDisplay = document.getElementById("note-display");
    const noteText = document.getElementById("note-text");

    if (missBtn) missBtn.onclick = () => { noteText.textContent = notes.miss; noteDisplay.classList.remove("hidden"); };
    if (badDayBtn) badDayBtn.onclick = () => { noteText.textContent = notes.badDay; noteDisplay.classList.remove("hidden"); };
    const closeBtn = document.getElementById("close-note-btn");
    if (closeBtn) closeBtn.onclick = () => noteDisplay.classList.add("hidden");

    // Hearts
    setInterval(() => {
        const container = document.getElementById("hearts-container");
        if (!container) return;
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 600);

    const vol = document.getElementById("volume-slider");
    if (vol && audio) vol.oninput = (e) => audio.volume = e.target.value;
    
    const galleryBtn = document.getElementById("view-gallery-btn");
    if (galleryBtn) galleryBtn.onclick = () => document.getElementById("gallery-start").scrollIntoView({behavior: 'smooth'});
});
