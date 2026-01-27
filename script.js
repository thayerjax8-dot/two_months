document.addEventListener("DOMContentLoaded", () => {
    // 1. YOUR EXACT FILE NAMES
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

    const scatterField = document.getElementById("photo-scatter-field");
    const modal = document.getElementById("photo-modal");
    const modalImg = document.getElementById("modal-img");

    // 2. Scatter Photos
    photoFiles.forEach((file, index) => {
        const pol = document.createElement("div");
        pol.className = "polaroid";
        
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * 1500 + 200; // Spreads them deep down
        const rot = Math.random() * 40 - 20;

        pol.style.left = `${x}px`;
        pol.style.top = `${y}px`;
        pol.style.transform = `rotate(${rot}deg)`;

        pol.innerHTML = `<img src="${file}"><p>Memory #${index + 1}</p>`;

        pol.onclick = () => {
            modalImg.src = file;
            document.getElementById("modal-caption").textContent = `Memory #${index + 1} ❤️`;
            modal.style.display = "flex";
        };
        scatterField.appendChild(pol);
    });

    // 3. Timer (Nov 29, 2025)
    const startDate = new Date("November 29, 2025 20:39:00").getTime();
    setInterval(() => {
        const diff = new Date().getTime() - startDate;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById("timer").textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);

    // 4. Audio Controls
    const music = document.getElementById("bg-music");
    let currentSong = 0;

    document.getElementById("heart-btn").onclick = () => {
        if(music.paused) music.play();
        document.getElementById("message").textContent = "I Love You! 💕";
    };

    document.getElementById("next-song-btn").onclick = () => {
        currentSong = (currentSong + 1) % playlist.length;
        document.getElementById("music-source").src = playlist[currentSong];
        music.load(); music.play();
    };

    document.getElementById("volume-slider").oninput = (e) => { music.volume = e.target.value; };
    document.querySelector(".close-btn").onclick = () => modal.style.display = "none";
});
