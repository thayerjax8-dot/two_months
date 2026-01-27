document.addEventListener("DOMContentLoaded", () => {
    const photoFiles = [
        "1.jpg.JPG", "2.jpg.JPG", "3.jpg.JPG", "4.jpg.JPG", "5.jpg.JPG",
        "6.jpg.JPG", "7.jpg.JPG", "8.jpg.HEIC", "9.jpg.HEIC", "10.jpg.HEIC",
        "11.jpg.JPG", "12.jpg.HEIC", "13.jpg.JPG", "14.jpg.HEIC", "15.jpg.JPG",
        "16.jpg.HEIC", "17.jpg.JPG", "18.jpg.JPG", "19.jpg.JPG", "20.jpg.JPG"
    ];

    const grid = document.getElementById("photo-grid");
    const modal = document.getElementById("photo-modal");
    const modalImg = document.getElementById("modal-img");

    // Create Grid Items
    photoFiles.forEach((file, index) => {
        const pol = document.createElement("div");
        pol.className = "polaroid";
        pol.innerHTML = `
            <img src="${file}" loading="lazy" alt="Memory">
            <p>Memory #${index + 1}</p>
        `;

        pol.onclick = () => {
            modalImg.src = file;
            document.getElementById("modal-caption").textContent = `Memory #${index + 1} ❤️`;
            modal.style.display = "flex";
        };
        grid.appendChild(pol);
    });

    // Gallery Scroll
    document.getElementById("view-gallery-btn").onclick = () => {
        document.getElementById("gallery-start").scrollIntoView();
    };

    // Timer (Nov 29, 2025)
    const startDate = new Date("November 29, 2025 20:39:00").getTime();
    setInterval(() => {
        const diff = new Date().getTime() - startDate;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById("timer").textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);

    // Audio
    const music = document.getElementById("bg-music");
    document.getElementById("heart-btn").onclick = () => { if(music.paused) music.play(); };
    document.getElementById("volume-slider").oninput = (e) => { music.volume = e.target.value; };
    document.querySelector(".close-btn").onclick = () => modal.style.display = "none";
});
