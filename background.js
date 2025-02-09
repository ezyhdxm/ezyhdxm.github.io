let vantaEffect = null;

function enableDayBackground() {
    const skyColors = [0x5c3c61, 0xf7d9aa, 0xf7d9aa, 0xb0e0e6];
    const cloudColors = [0xd49a89, 0xd49a89, 0xd49a89, 0x5e566b];
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

// **点击切换白天模式**
document.getElementById("indexModeToggle").addEventListener("click", function () {
    if (document.body.classList.contains("night-mode")) {
        disableBackground();
        enableDayBackground();
        stopSnowFall();
    } else {
        disableBackground();
        enableNightBackground();
        randomizeNeonEffect(); 
    }

    document.body.classList.toggle("day-mode");
    document.body.classList.toggle("night-mode");
});