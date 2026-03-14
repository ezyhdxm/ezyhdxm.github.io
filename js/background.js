let vantaEffect = null;

function initBackground() {
    if (!vantaEffect) {
        vantaEffect = VANTA.TRUNK({
            el: "#vanta-background",
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

function setThemeColors(bgColor, lineColor) {
    if (!vantaEffect) return;
    vantaEffect.setOptions({ backgroundColor: bgColor, color: lineColor });
    vantaEffect.restart();
}

function setDayColors() {
    setThemeColors(0xd6c4b0, 0x8B6B4A);
}

function setNightColors() {
    setThemeColors(0x2c3641, 0x983E3F);
}

document.getElementById("indexModeToggle").addEventListener("click", function () {
    if (document.body.classList.contains("night-mode")) {
        setDayColors();

        gsap.to(".fade-button", {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: function () {
                gsap.set(".fade-button", { opacity: 1, y: 0 });
                gsap.fromTo(".fade-button",
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 }
                );
            }
        });

        if (isSwinging) {
            isShakingQueued = true;
        } else {
            startLampShake();
        }
    } else {
        setNightColors();
        randomizeNeonEffect();

        gsap.fromTo(".fade-button",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 }
        );
    }

    document.body.classList.toggle("day-mode");
    document.body.classList.toggle("night-mode");
});

const headerEl = document.getElementById("header");
let touchStartY = 0;

if (headerEl) {
    headerEl.addEventListener("touchstart", function (e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    headerEl.addEventListener("touchmove", function (e) {
        const movedY = e.touches[0].clientY - touchStartY;
        if (movedY > 0 && movedY < 80) {
            gsap.to(headerEl, { y: movedY * 0.5, opacity: 1 - movedY / 150, ease: "power1.out" });
        }
    });

    headerEl.addEventListener("touchend", function () {
        gsap.to(headerEl, { y: 0, opacity: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
    });
}
