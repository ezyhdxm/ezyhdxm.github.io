const quoteElement = document.getElementById("quote");
const modeToggle = document.getElementById("modeToggle");
const timeDisplay = document.getElementById("timeDisplay");
const playlistToggle = document.getElementById("playlistToggle");
const playlistPanel = document.getElementById("playlistPanel");
const playlistList = document.getElementById("playlistList");
const tv = document.getElementById("tv");
const videoFrame = document.getElementById("videoFrame");
const tvPower = document.getElementById("tvPower");
const tvFilter = document.getElementById("tvFilter");
const noiseCanvas = document.getElementById("tvNoise");
const noiseCtx = noiseCanvas.getContext("2d");
const tvBody = document.querySelector(".tv-body");

/* =============================================
   Clock
   ============================================= */

function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const weekday = ['日', '月', '火', '水', '木', '金', '土'][now.getDay()];

    timeDisplay.innerHTML = `
        <span class="clock">${h}:${m}:${s}</span>
        <span class="date">${year}.${month}.${day} ${weekday}</span>
    `;
}
setInterval(updateTime, 1000);
updateTime();

/* =============================================
   Mode toggle (昼 / 夕 / 夜)
   ============================================= */

function autoSetMode() {
    const hour = new Date().getHours();
    document.body.classList.remove("dusk-mode", "night-mode");

    if (hour >= 6 && hour < 18) {
        modeToggle.textContent = "昼";
    } else if (hour >= 18 && hour < 21) {
        document.body.classList.add("dusk-mode");
        modeToggle.textContent = "夕";
    } else {
        document.body.classList.add("night-mode");
        modeToggle.textContent = "夜";
    }
}
autoSetMode();

modeToggle.addEventListener("click", function () {
    const body = document.body;
    if (!body.classList.contains("dusk-mode") && !body.classList.contains("night-mode")) {
        body.classList.add("dusk-mode");
        modeToggle.textContent = "夕";
    } else if (body.classList.contains("dusk-mode")) {
        body.classList.remove("dusk-mode");
        body.classList.add("night-mode");
        modeToggle.textContent = "夜";
    } else {
        body.classList.remove("night-mode");
        modeToggle.textContent = "昼";
    }
});

/* =============================================
   Glitch effect
   ============================================= */

let glitchProbability = 0.3;
if (document.body.classList.contains("night-mode")) {
    glitchProbability = 0.6;
}

timeDisplay.addEventListener("click", function (event) {
    event.preventDefault();
    if (Math.random() < glitchProbability) {
        timeDisplay.classList.add("glitch");
        quoteElement.classList.add("glitch");
    }
    setTimeout(() => { document.body.classList.add("fade-out"); }, 500);
    setTimeout(() => { window.location.href = "index.html"; }, 1000);
});

function triggerNightGlitch() {
    if (document.body.classList.contains("night-mode")) {
        if (Math.random() < 0.3) {
            timeDisplay.classList.add("glitch");
            quoteElement.classList.add("glitch");
            setTimeout(() => {
                timeDisplay.classList.remove("glitch");
                quoteElement.classList.remove("glitch");
            }, Math.random() * 2000 + 500);
        }
        setTimeout(triggerNightGlitch, Math.random() * 4000 + 2000);
    } else {
        setTimeout(triggerNightGlitch, 5000);
    }
}
triggerNightGlitch();

/* =============================================
   TV — noise
   ============================================= */

function resizeNoise() {
    noiseCanvas.width = noiseCanvas.offsetWidth;
    noiseCanvas.height = noiseCanvas.offsetHeight;
}
resizeNoise();
window.addEventListener("resize", resizeNoise);
new ResizeObserver(resizeNoise).observe(tvBody);

const logoImg = new Image();
logoImg.src = "assets/favicon/android-chrome-512x512.png";
let logoSize = 28;
let logoX = 10, logoY = 10;
const logoStep = 20;
let logoDx = logoStep, logoDy = logoStep;

function getScreenBg() {
    if (document.body.classList.contains("night-mode")) return "#282C3E";
    if (document.body.classList.contains("dusk-mode")) return "#D8CABC";
    return "#E8E0D4";
}

function clampLogo() {
    const w = noiseCanvas.width;
    const h = noiseCanvas.height;
    logoSize = Math.max(20, Math.min(w, h) * 0.28);
    if (w > 0 && logoX + logoSize > w) logoX = w - logoSize;
    if (h > 0 && logoY + logoSize > h) logoY = h - logoSize;
    if (logoX < 0) logoX = 0;
    if (logoY < 0) logoY = 0;
}

const origResize = resizeNoise;
resizeNoise = function () { origResize(); clampLogo(); };

function drawLogo() {
    const w = noiseCanvas.width;
    const h = noiseCanvas.height;
    if (w === 0 || h === 0) return;

    noiseCtx.fillStyle = getScreenBg();
    noiseCtx.fillRect(0, 0, w, h);

    if (logoImg.complete && logoImg.naturalWidth > 0) {
        noiseCtx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
    }
}

function stepLogo() {
    const w = noiseCanvas.width;
    const h = noiseCanvas.height;
    if (w === 0 || h === 0) return;

    logoX += logoDx;
    logoY += logoDy;

    if (logoX <= 0 || logoX + logoSize >= w) {
        logoDx = -logoDx;
        logoX = Math.max(0, Math.min(logoX, w - logoSize));
    }
    if (logoY <= 0 || logoY + logoSize >= h) {
        logoDy = -logoDy;
        logoY = Math.max(0, Math.min(logoY, h - logoSize));
    }

    drawLogo();
}

drawLogo();
setInterval(stepLogo, 800);

/* =============================================
   TV — playlist & playback
   Song title → YouTube video ID mapping.
   To add a song, add an entry here and in
   assets/lyrics/lyrics_with_hiragana.json.
   ============================================= */

const songVideos = {
    "第一夜": "-R8UiY_44Y0",
    "だから僕は音楽を辞めた": "KTZ-y85Erus",
    "逃亡": "T535kqz3mgw",
    "嘘月": "utpMm8qi4hg",
    "左右盲": "1IlTeOMCNJU",
    "爆弾魔": "U3X8yQb0YXI",
    "言って": "F64yFFnZfkI",
    "花に亡霊": "9lVPAWLWtWc",
    "ただ君に晴れ": "ZdzoLCLliW0",
    "春泥棒": "Sw1Flgub9s8"
};

function playOnTV(title) {
    playlistList.querySelectorAll("li").forEach(el => {
        el.classList.toggle("active", el.textContent === title);
    });
    videoFrame.src = "https://www.youtube.com/embed/" + songVideos[title] + "?autoplay=1&rel=0";
    tv.classList.add("playing");
    window.currentPlayingSong = title;
    if (window.showFirstLyricOf) window.showFirstLyricOf(title);
}

function stopTV() {
    tv.classList.remove("playing");
    videoFrame.src = "";
    playlistList.querySelectorAll("li").forEach(el => el.classList.remove("active"));
    window.currentPlayingSong = null;
    if (window.showRandomLyric) window.showRandomLyric();
}

Object.keys(songVideos).forEach(title => {
    const li = document.createElement("li");
    li.textContent = title;
    li.addEventListener("click", function (e) {
        e.stopPropagation();
        playOnTV(title);
    });
    playlistList.appendChild(li);
});

playlistToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    playlistPanel.classList.toggle("open");
});

tvPower.addEventListener("click", function (e) {
    e.stopPropagation();
    if (tv.classList.contains("playing")) {
        stopTV();
    } else {
        const titles = Object.keys(songVideos);
        playOnTV(titles[Math.floor(Math.random() * titles.length)]);
    }
});

/* =============================================
   TV — Lo-Fi CRT filter toggle
   ============================================= */

tvFilter.addEventListener("click", function (e) {
    e.stopPropagation();
    tv.classList.toggle("lofi");
    tvFilter.classList.toggle("active");
});

/* =============================================
   Pomodoro timer
   ============================================= */

const pomoTime = document.getElementById("pomoTime");
const pomoStartPause = document.getElementById("pomoStartPause");
const pomoReset = document.getElementById("pomoReset");

let pomoSeconds = 25 * 60;
let pomoInterval = null;
let pomoRunning = false;
let pomoIsBreak = false;

function formatPomo(s) {
    return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
}

function pomoTick() {
    if (pomoSeconds <= 0) {
        clearInterval(pomoInterval);
        pomoRunning = false;
        pomoIsBreak = !pomoIsBreak;
        pomoSeconds = pomoIsBreak ? 5 * 60 : 25 * 60;
        pomoTime.classList.toggle("break", pomoIsBreak);
        pomoStartPause.textContent = "▶";
    } else {
        pomoSeconds--;
    }
    pomoTime.textContent = formatPomo(pomoSeconds);
}

pomoStartPause.addEventListener("click", function (e) {
    e.stopPropagation();
    if (pomoRunning) {
        clearInterval(pomoInterval);
        pomoRunning = false;
        pomoStartPause.textContent = "▶";
    } else {
        pomoInterval = setInterval(pomoTick, 1000);
        pomoRunning = true;
        pomoStartPause.textContent = "⏸";
    }
});

pomoReset.addEventListener("click", function (e) {
    e.stopPropagation();
    clearInterval(pomoInterval);
    pomoRunning = false;
    pomoIsBreak = false;
    pomoSeconds = 25 * 60;
    pomoTime.textContent = formatPomo(pomoSeconds);
    pomoTime.classList.remove("break");
    pomoStartPause.textContent = "▶";
});
