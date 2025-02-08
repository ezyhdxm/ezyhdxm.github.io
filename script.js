document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Document loaded!");

    const quoteElement = document.getElementById("quote");
    const songTitleElement = document.getElementById("song-title");
    const translationElement = document.getElementById("translation");
    const modeToggle = document.getElementById("modeToggle");
    const timeDisplay = document.getElementById("timeDisplay");
    const body = document.body;


    if (!quoteElement || !translationElement) {
        console.error("❌ Element not found: Make sure #quote and #translation exist in HTML.");
        return;
    }

    async function getRandomQuote() {
        try {
            console.log("Fetching lyrics.json...");
            const response = await fetch('lyrics.json');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const quotes = await response.json();
            console.log("Lyrics loaded:", quotes);

            let randomIndex = Math.floor(Math.random() * quotes.length);
            let randomQuote = quotes[randomIndex];

            quoteElement.style.opacity = "0";
            setTimeout(() => {
                quoteElement.innerHTML = randomQuote.lyrics;
                songTitleElement.innerHTML = "— " + randomQuote.song;
                translationElement.innerHTML = randomQuote.translation;
                quoteElement.appendChild(songTitleElement);
                quoteElement.appendChild(translationElement);
                quoteElement.style.opacity = "1";
            }, 500);

        } catch (error) {
            console.error("❌ Error loading lyrics.json:", error);
            quoteElement.innerHTML = "⚠️ 加载歌词失败...";
        }
    }

    // getRandomQuote(); // 初次加载
    // 点击时随机更换歌词
    quoteElement.addEventListener("click", getRandomQuote); // 点击切换歌词
});
