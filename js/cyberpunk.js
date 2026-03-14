function addGlitchEffect() {
    document.querySelectorAll(".glitch-text").forEach(el => {
        el.classList.toggle("animated", Math.random() < 0.7);
    });
    setTimeout(addGlitchEffect, 500);
}
addGlitchEffect();

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const drops = Array(columns).fill(0);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px 'Share Tech Mono', '3270 Nerd Font', monospace";

    drops.forEach((y, index) => {
        let text = String.fromCharCode(0x30A0 + Math.random() * 96);
        let x = index * 20 + (Math.random() - 0.5) * 5;

        ctx.fillStyle = "rgb(0,100,0)";

        if (Math.random() < 0.1) {
            if (Math.random() < 0.2) {
                ctx.fillStyle = Math.random() < 0.5 ? "#ff0055" : "#00ffff";
            }
            text = Math.random() < 0.5 ? "█" : String.fromCharCode(0x2588 + Math.random() * 10);
            x += (Math.random() - 0.5) * 2;
            ctx.fillText(text, x, y + (Math.random() - 0.5) * 2);
        } else {
            ctx.fillText(text, x, y);
        }

        if (Math.random() < 0.05) {
            ctx.font = (Math.random() < 0.5 ? "14" : "18") + "px 'Share Tech Mono', monospace";
        } else {
            ctx.font = "16px 'Share Tech Mono', monospace";
        }

        if (Math.random() < 0.005) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        drops[index] = y > canvas.height || Math.random() > 0.975 ? 0 : y + 20;
    });

    ctx.fillStyle = "rgba(0, 255, 0, 0.1)";
    ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 2);
}
setInterval(drawMatrix, 50);

const timeDisplay = document.getElementById("timeDisplay");

function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    timeDisplay.textContent = h + ":" + m + ":" + s;
    timeDisplay.classList.toggle("animated", Math.random() < 0.5);
}
setInterval(updateTime, 1000);
updateTime();

timeDisplay.addEventListener("click", function () {
    document.body.classList.add("fade-out");
    setTimeout(() => { window.location.href = "index.html"; }, 500);
});

/* =============================================
   Broadcast — fullscreen video background
   Song title → YouTube video ID for cyberpunk songs.
   ============================================= */

const cyberVideos = {
    "お勉強しといてよ": "Atvsg_zogxo",
    "オトネケ": "tRwHpyOq4P4",
    "AIZO": "zz2a9Q2Wru0"
};

const videoBg = document.getElementById("videoBg");
const bgVideo = document.getElementById("bgVideo");
const broadcastBtn = document.getElementById("broadcastBtn");
let broadcasting = false;

function startBroadcast() {
    const titles = Object.keys(cyberVideos);
    const title = titles[Math.floor(Math.random() * titles.length)];
    bgVideo.src = "https://www.youtube.com/embed/" + cyberVideos[title]
        + "?autoplay=1&rel=0&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=" + cyberVideos[title];
    videoBg.classList.add("active");
    document.body.classList.add("broadcasting");
    broadcastBtn.textContent = "■ " + title;
    broadcastBtn.classList.add("on");
    broadcasting = true;
    window.currentBroadcastSong = title;
    if (window.showFirstCyberLyric) window.showFirstCyberLyric(title);
}

function stopBroadcast() {
    videoBg.classList.remove("active");
    document.body.classList.remove("broadcasting");
    bgVideo.src = "";
    broadcastBtn.textContent = "▶ Broadcast";
    broadcastBtn.classList.remove("on");
    broadcasting = false;
    window.currentBroadcastSong = null;
    if (window.showRandomCyberLyric) window.showRandomCyberLyric();
}

broadcastBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (broadcasting) {
        stopBroadcast();
    } else {
        startBroadcast();
    }
});
