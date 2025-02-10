let vantaEffect = null;

function enableDayBackground() {
    const skyColors = [0x5c3c61, 0xf7d9aa, 0xf7d9aa, 0xb0e0e6, 0x5ca6ca];
    const cloudColors = [0xd49a89, 0xd49a89, 0xd49a89, 0x5e566b, 0x334d80];
    let randomIndex = Math.floor(Math.random() * cloudColors.length);
    let newCloudColor = cloudColors[randomIndex];
    let newSkyColor = skyColors[randomIndex];
    if (!vantaEffect) {
        vantaEffect = VANTA.CLOUDS2({
            el: "#vanta-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: window.innerHeight,
            minWidth: window.innerWidth,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xf7d9aa, // Initial warm background color
            skyColor: newSkyColor, //0xf7d9aa, // Initial sky color
            cloudColor: newCloudColor, // Cloud color remains unchanged
            speed: 0.6,
            texturePath: "./gallery/noise.png"
        });
    }
}




function enableNightBackground() {
    console.log("enableNightBackground", vantaEffect);
    if (!vantaEffect) {
        vantaEffect = VANTA.TRUNK({
            el: "#vanta-background", // **把动画应用到这个 div 上**
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: window.innerHeight,
            minWidth: window.innerWidth,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x2c3641
        });
    }
}

function disableBackground() {
    if (vantaEffect) {
        vantaEffect.destroy();
        vantaEffect = null;
    }
}

let shakeInterval;

// **点击切换白天模式**
document.getElementById("indexModeToggle").addEventListener("click", function () {
    if (document.body.classList.contains("night-mode")) {
        disableBackground();
        enableDayBackground();
        gsap.to(".fade-button", {
            opacity: 0,
            y: -20,
            duration: 0,
            ease: "power2.inOut",
            onComplete: () => {
                document.querySelectorAll(".fade-button").forEach(button => button.style.display = "none");
            }
        });
        if (isSwinging) {
            console.log("Waiting for swing to stop before shaking...");
            isShakingQueued = true; // Queue the shake effect
        } else {
            startLampShake(); // If no swing is active, start shaking immediately
        }
    } else {
        disableBackground();
        enableNightBackground();
        randomizeNeonEffect(); 
        document.querySelectorAll(".fade-button").forEach(button => button.style.display = "inline-block");
        gsap.fromTo(".fade-button", 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
        if (isSwinging) {
            console.log("Waiting for swing to stop before shaking...");
            isShakingQueued = true; // Queue the shake effect
        } else {
            clearInterval(shakeInterval); // 停止摇灯
        }
    }

    document.body.classList.toggle("day-mode");
    document.body.classList.toggle("night-mode");
});



header.addEventListener("touchmove", (e) => {
    movedY = e.touches[0].clientY - startY;

    if (movedY > 0 && movedY < 80) {
        gsap.to(header, { y: movedY * 0.5, opacity: 1 - movedY / 150, ease: "power1.out" });
    }
});

header.addEventListener("touchend", () => {
    gsap.to(header, { y: 0, opacity: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
});