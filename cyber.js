document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Document loaded!");

    const poemElement = document.getElementById("poem");

    if (!poemElement) {
        console.error("❌ Element not found: Make sure #poem exists in HTML.");
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

            poemElement.style.opacity = "0";
            setTimeout(() => {
                poemElement.innerHTML = `${randomQuote.lyrics}<br>— ${randomQuote.song}`;
                poemElement.style.opacity = "1";
            }, 200);

            // 添加更强的 Glitch 效果
            poemElement.classList.add("glitch-click");

            // 500ms 后移除 Glitch 效果
            setTimeout(() => {
                poemElement.classList.remove("glitch-click");
            }, 500);

        } catch (error) {
            console.error("❌ Error loading lyrics.json:", error);
            poemElement.innerHTML = "⚠️ 加载歌词失败...";
        }
    }

    // getRandomQuote(); // 初次加载
    poemElement.addEventListener("click", getRandomQuote); // 点击切换歌词
});
