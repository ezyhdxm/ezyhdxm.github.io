const lampContainer = document.getElementById("lamp-container");
const lampBulb = document.getElementById("lamp-bulb");
const lampLight = document.getElementById("lamp-light");

let isLampOn = false;
let isDragging = false;
let startX = 0;
let lastMouseX = 0;

let angle = 0;
let angularVelocity = 0;
let angularAcceleration = 0;
const gravity = 0.5;
const damping = 0.995;
const angleThreshold = 0.005;
let animationFrame;

function startDrag(event) {
    isDragging = true;
    startX = event.touches ? event.touches[0].clientX : event.clientX;
    lastMouseX = startX;
    angularVelocity = 0;

    document.addEventListener(event.touches ? "touchmove" : "mousemove", onDrag);
    document.addEventListener(event.touches ? "touchend" : "mouseup", onRelease);
}

function onDrag(event) {
    if (!isDragging) return;

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX;

    angle = Math.max(-60, Math.min(60, deltaX * 0.5));
    lampContainer.style.transform = `rotate(${angle}deg)`;

    angularVelocity = (clientX - lastMouseX) * 0.05;
    lastMouseX = clientX;
}

function onRelease(event) {
    isDragging = false;
    document.removeEventListener(event.touches ? "touchmove" : "mousemove", onDrag);
    document.removeEventListener(event.touches ? "touchend" : "mouseup", onRelease);

    cancelAnimationFrame(animationFrame);
    startSwing();
}

let isSwinging = false;

function startLampShake() {
    clearInterval(shakeInterval);

    function sway() {
        const randomAngle = (Math.random() - 0.5) * 15;
        const duration = Math.random() * 1.5 + 1;

        gsap.to("#lamp-container", {
            rotation: randomAngle,
            duration: duration,
            ease: "sine.inOut",
            yoyo: true,
            onComplete: () => {
                if (Math.random() > 0.7 && !isSwinging) {
                    angle = randomAngle;
                    isSwinging = true;
                    startSwing();
                } else {
                    sway();
                }
            }
        });
    }
    sway();
}

let isShakingQueued = false;

function startSwing(callback) {
    isSwinging = true;

    function swing() {
        angularAcceleration = -gravity * Math.sin(angle * (Math.PI / 180));
        angularVelocity += angularAcceleration;
        angularVelocity *= damping;
        angle += angularVelocity;

        if (Math.abs(angle) < angleThreshold && Math.abs(angularVelocity) < angleThreshold) {
            lampContainer.style.transform = `rotate(0deg)`;
            isSwinging = false;
            if (callback) callback();
            return;
        }

        if (angle > 60) { angle = 60; angularVelocity *= -0.7; }
        if (angle < -60) { angle = -60; angularVelocity *= -0.7; }

        lampContainer.style.transform = `rotate(${angle}deg)`;
        animationFrame = requestAnimationFrame(swing);
    }

    swing();
}

lampBulb.addEventListener("mousedown", startDrag);
lampBulb.addEventListener("touchstart", startDrag, { passive: true });

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

let flickerInterval;

function startFlicker() {
    flickerInterval = setInterval(() => {
        if (Math.random() > 0.7) {
            lampLight.style.opacity = String(Math.random() * 0.8 + 0.2);
            lampBulb.style.boxShadow = `0 0 ${Math.random() * 20 + 5}px rgba(255, 204, 0, 0.8)`;
        }
    }, 400);
}

function stopFlicker() {
    clearInterval(flickerInterval);
    lampLight.style.opacity = "0";
    lampBulb.style.boxShadow = "none";
}

const lightColors = [
    { bulb: "#FFEFD5", glow: "rgba(255, 230, 180, 0.9)" },
    { bulb: "#FFD700", glow: "rgba(255, 210, 100, 0.9)" },
    { bulb: "#87CEFA", glow: "rgba(135, 206, 250, 0.9)" },
    { bulb: "#FF69B4", glow: "rgba(255, 105, 180, 0.8)" }
];

let currentLightIndex = 0;

lampBulb.addEventListener("click", function () {
    currentLightIndex = (currentLightIndex + 1) % lightColors.length;
    const newColor = lightColors[currentLightIndex];
    lampBulb.style.background = newColor.bulb;
    lampLight.style.background = `radial-gradient(circle, ${newColor.glow} 0%, transparent 100%)`;
});

document.body.classList.add("night-mode");
initBackground();

function randomizeNeonEffect() {
    if (!document.body.classList.contains("night-mode")) return;

    document.querySelectorAll("#main > a").forEach(button => {
        const randomOpacity = Math.random() * 0.8 + 0.2;
        const randomBlur = Math.random() * 4 + 1;
        button.style.setProperty("--neon-opacity", randomOpacity);
        button.style.setProperty("--neon-blur", `${randomBlur}px`);
    });

    setTimeout(randomizeNeonEffect, Math.random() * 1500 + 500);
}
