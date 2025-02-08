document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Document loaded!");

    const quoteElement = document.getElementById("quote");
    const originalElement = document.getElementById("original");
    const songTitleElement = document.getElementById("song-title");
    const translationElement = document.getElementById("translation");
    const hiraganaElement = document.getElementById("hiragana");
    // const modeToggle = document.getElementById("modeToggle");
    // const timeDisplay = document.getElementById("timeDisplay");
    // const body = document.body;


    if (!quoteElement || !translationElement) {
        console.error("❌ Element not found: Make sure #quote and #translation exist in HTML.");
        return;
    }

    async function getRandomQuote() {
        try {
            console.log("Fetching lyrics_with_hiragana.json...");
            const response = await fetch('lyrics_with_hiragana.json');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const quotes = await response.json();
            console.log("Lyrics loaded:", quotes);
            
            let randomIndex = Math.floor(Math.random() * quotes.lyrics.japanese.length);
            // let randomQuote = quotes[randomIndex];

            quoteElement.style.opacity = "0";
            setTimeout(() => {
                originalElement.innerHTML = quotes.lyrics.japanese[randomIndex];
                songTitleElement.innerHTML = "— " + quotes.title;
                translationElement.innerHTML = quotes.lyrics.chinese[randomIndex];
                hiraganaElement.innerHTML = quotes.lyrics.hiragana[randomIndex];
                quoteElement.appendChild(originalElement);
                quoteElement.appendChild(songTitleElement);
                quoteElement.appendChild(translationElement);
                quoteElement.appendChild(hiraganaElement);
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
