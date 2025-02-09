// 🎇 吊灯交互
const lampContainer = document.getElementById("lamp-container");
const lampBulb = document.getElementById("lamp-bulb");
const lampLight = document.getElementById("lamp-light");

let isLampOn = false;
let isDragging = false;
let startX = 0;
let lastMouseX = 0;

// 🔥 摆动参数
let angle = 0; // 角度
let angularVelocity = 0; // 角速度
let angularAcceleration = 0; // 角加速度
const gravity = 0.05; // 重力系数（影响摆动速度）
const damping = 0.995; // 阻尼系数（影响能量衰减）
const angleThreshold = 0.1; // 角度阈值（当角度小于此值时停止）
let animationFrame; // 记录动画帧

// 🖱️ 监听拖拽灯泡事件
lampBulb.addEventListener("mousedown", function (event) {
    isDragging = true;
    startX = event.clientX;
    lastMouseX = event.clientX;
    angularVelocity = 0;

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", onRelease);
});

// 🎯 拖拽灯泡时
function onDrag(event) {
    if (!isDragging) return;

    let deltaX = event.clientX - startX;
    angle = Math.max(-45, Math.min(45, deltaX * 0.5)); // 限制角度范围 -45° ~ 45°
    lampContainer.style.transform = `rotate(${angle}deg)`;

    // 计算速度（用于松手后的惯性）
    angularVelocity = (event.clientX - lastMouseX) * 0.05;
    lastMouseX = event.clientX;
}

// ✋ 释放灯泡后，它会自然摆动
function onRelease() {
    isDragging = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", onRelease);

    cancelAnimationFrame(animationFrame);
    startSwing();
}

// 🏗️ 物理摆动（基于真实钟摆公式 + 角度阈值）
function startSwing() {
    function swing() {
        // 计算角加速度（基于钟摆公式：a = -sin(θ) * 重力）
        angularAcceleration = (-gravity * Math.sin(angle * (Math.PI / 180)));

        // 速度 + 加速度
        angularVelocity += angularAcceleration;
        angularVelocity *= damping; // 阻尼衰减，防止无限摆动
        angle += angularVelocity;

        // **🌟 关键改进：当角度足够小，直接停止**
        if (Math.abs(angle) < angleThreshold && Math.abs(angularVelocity) < 0.005) {
            lampContainer.style.transform = `rotate(0deg)`;
            return; // 停止动画
        }

        // **保持角度范围**
        if (angle > 45) {
            angle = 45;
            angularVelocity *= -0.7; // 反向摆动
        }
        if (angle < -45) {
            angle = -45;
            angularVelocity *= -0.7;
        }

        lampContainer.style.transform = `rotate(${angle}deg)`;
        animationFrame = requestAnimationFrame(swing);
    }

    swing();
}

// 💡 双击灯泡可以开关灯
lampBulb.addEventListener("dblclick", function () {
    isLampOn = !isLampOn;
    if (isLampOn) {
        lampContainer.classList.add("lit");
        startFlicker();
    } else {
        lampContainer.classList.remove("lit");
        stopFlicker();
    }
});

// 🌟 让灯泡柔和闪烁
let flickerInterval;
function startFlicker() {
    flickerInterval = setInterval(() => {
        if (Math.random() > 0.7) {
            lampLight.style.opacity = Math.random() * 0.8 + 0.2;
            lampBulb.style.boxShadow = `0 0 ${Math.random() * 15 + 5}px rgba(255, 204, 0, 0.8)`;
        }
    }, 400);
}

// 💡 停止闪烁
function stopFlicker() {
    clearInterval(flickerInterval);
    lampLight.style.opacity = 0;
    lampBulb.style.boxShadow = "none";
}


// **不同灯光颜色**
const lightColors = [
    { bulb: "#FFEFD5", glow: "rgba(255, 230, 180, 0.9)" }, // 🌟 温暖黄光
    { bulb: "#FFD700", glow: "rgba(255, 210, 100, 0.9)" }, // 🌟 金黄灯
    { bulb: "#87CEFA", glow: "rgba(135, 206, 250, 0.9)" }, // 🌊 冷蓝光
    { bulb: "#FF69B4", glow: "rgba(255, 105, 180, 0.8)" }  // 💖 霓虹粉
];

let currentLightIndex = 0;

// **点击灯泡改变颜色**
document.getElementById("lamp-bulb").addEventListener("click", function () {
    currentLightIndex = (currentLightIndex + 1) % lightColors.length; // 切换颜色
    let newColor = lightColors[currentLightIndex];

    // **更改灯泡颜色**
    document.getElementById("lamp-bulb").style.background = newColor.bulb;
    
    // **更改灯光颜色**
    document.getElementById("lamp-light").style.background = `radial-gradient(circle, ${newColor.glow} 0%, transparent 100%)`;
});


document.body.classList.add("night-mode");
enableNightBackground(); 
//startFallingLeaves(); // 启动落叶



// 🚀 让按钮的重影效果随机忽明忽暗
function randomizeNeonEffect() {
    if (!document.body.classList.contains("night-mode")) return;

    document.querySelectorAll("#main > a").forEach(button => {
        const shadow = button.querySelector("::before");
        
        // 随机透明度（0.2 - 1）
        const randomOpacity = Math.random() * 0.8 + 0.2;

        // 随机模糊（1px - 5px）
        const randomBlur = Math.random() * 4 + 1;

        // 应用样式变化
        button.style.setProperty("--neon-opacity", randomOpacity);
        button.style.setProperty("--neon-blur", `${randomBlur}px`);
    });

    // 随机间隔调用（0.5s - 2s 之间）
    setTimeout(randomizeNeonEffect, Math.random() * 1500 + 500);
}
