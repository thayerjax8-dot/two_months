document.addEventListener("DOMContentLoaded", () => {
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

    // Updated notes with grammar fixes
    const notes = {
        miss: "Hi Lily! Whenever you miss me, first you should try to find a distraction. But if that doesn't work, just imagine giving me the biggest hug when you see me, and think of a joke to tell me! I love you.",
        badDay: "Hi Lily! If you're having a bad day for whatever reason, please remember that you're an awesome person. Think of all the people who care about you and would want to hear about your day—whether to comfort you or celebrate it with you. Remember those who care and do so much for you!"
    };

    let currentTrack = 0;
    let currentPhoto = 0;
    const audio = document.getElementById("bg-music");
    const record = document.getElementById("record-disc");
    const trackLabel = document.getElementById("current-track");
    const slider = document.getElementById("photo-slider");

    window.revealNote = (type) => {
        document.getElementById("note-text").textContent = notes[type];
        document.getElementById("note-display").classList.remove("hidden");
    };
    window.closeNote = () => {
        document.getElementById("note-display").classList.add("hidden");
    };

    const createHeart = () => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";
        heart.style.opacity = Math.random();
        document.getElementById("hearts-container").appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    };
    setInterval(createHeart, 450);

    photoFiles.forEach(file => {
        const img = document.createElement("img");
        img.src = file;
        slider.appendChild(img);
    });

    const updateSlider = () => {
        const imgs = slider.querySelectorAll("img");
        imgs.forEach(img => img.style.transform = `translateX(-${currentPhoto * 100}%)`);
    };

    document.getElementById("next-btn").onclick = () => {
        currentPhoto = (currentPhoto + 1) % photoFiles.length;
        updateSlider();
    };

    document.getElementById("prev-btn").onclick = () => {
        currentPhoto = (currentPhoto - 1 + photoFiles.length) % photoFiles.length;
        updateSlider();
    };

    record.onclick = () => {
        if (audio.paused) {
            audio.play();
        } else {
            currentTrack = (currentTrack + 1) % playlist.length;
            audio.src = playlist[currentTrack];
            audio.load();
            audio.play();
            trackLabel.textContent = playlist[currentTrack].split('.')[0];
        }
    };

    audio.onplay = () => record.classList.add("spinning");
    audio.onpause = () => record.classList.remove("spinning");

    const anniversary = new Date("November 29, 2025 20:39:00").getTime();
    const vday = new Date("February 14, 2026 00:00:00").getTime();
    const stagecoach = new Date("April 25, 2026 00:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const diffUp = now - anniversary;
        document.getElementById("timer").textContent = `${Math.floor(diffUp / 86400000)}d ${Math.floor((diffUp % 86400000) / 3600000)}h ${Math.floor((diffUp % 3600000) / 60000)}m ${Math.floor((diffUp % 60000) / 1000)}s`;

        const updateCD = (target, id) => {
            const d = target - now;
            document.getElementById(id).textContent = d > 0 ? `${Math.floor(d / 86400000)}d ${Math.floor((d % 86400000) / 3600000)}h ${Math.floor((d % 3600000) / 60000)}m ${Math.floor((d % 60000) / 1000)}s` : "Today! ❤️";
        };
        updateCD(vday, "vday-timer");
        updateCD(stagecoach, "stagecoach-timer");
    }, 1000);

    document.getElementById("volume-slider").oninput = (e) => audio.volume = e.target.value;
    document.getElementById("view-gallery-btn").onclick = () => document.getElementById("gallery-start").scrollIntoView();
});
