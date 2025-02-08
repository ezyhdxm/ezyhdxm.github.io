const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// 调整画布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(0);

// 定义字符
const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const chars = matrixChars.split("");

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px '3270 Nerd Font', monospace";

    for (let i = 0; i < drops.length; i++) {
        let text = chars[Math.floor(Math.random() * chars.length)];
        let x = i * fontSize;
        let y = drops[i] * fontSize;
        
        // **随机给部分字符添加 glitch 效果**
        if (Math.random() < 0.1) { // 10% 概率发生 glitch
            ctx.fillStyle = "#ff0000";
            text = "⚠";
            ctx.fillText(text, x, y);
            ctx.fillStyle = "#00ff00";
        } else {
            ctx.fillText(text, x, y);
        }

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);
