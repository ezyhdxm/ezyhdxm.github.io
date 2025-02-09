let snowInterval; // Variable to store the setInterval ID

function createSnowflakes() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.innerHTML = "❄";

    // Random size & position
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.fontSize = Math.random() * 8 + 8 + "px";
    snowflake.style.animationDuration = Math.random() * 5 + 3 + "s";

    document.body.appendChild(snowflake);

    // Remove after animation completes
    setTimeout(() => {
        snowflake.style.opacity = "0"; // Fade out before removing
        setTimeout(() => snowflake.remove(), 1000);
    }, 5000);
}

// **🌟 Start snowfall**
function startSnowFall() {
    if (!snowInterval) {
        snowInterval = setInterval(createSnowflakes, 200);
    }
}

// **❄️ Stop snowfall**
function stopSnowFall() {
    clearInterval(snowInterval);
    snowInterval = null;

    // Fade out existing snowflakes before removing them
    document.querySelectorAll(".snowflake").forEach(snowflake => {
        snowflake.style.transition = "opacity 3s ease-out";
        snowflake.style.opacity = "0";
        setTimeout(() => {
            snowflake.style.opacity = "0"; // Fade out before removing
            setTimeout(() => snowflake.remove(), 3000);
        }, 6000);
    });
}

// **Start snowfall on page load**
//