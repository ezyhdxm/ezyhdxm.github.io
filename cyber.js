document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Document loaded!");

    const poemElement = document.getElementById("poem");
    const originalElement = document.getElementById("original");
    const songTitleElement = document.getElementById("song-title");
    const translationElement = document.getElementById("translation");
    const hiraganaElement = document.getElementById("hiragana");

    if (!poemElement) {
        console.error("❌ Element not found: Make sure #poem exists in HTML.");
        return;
    }

    async function getRandomQuote() {
        try {
            console.log("Fetching lyrics.json...");
            const response = await fetch('assets/lyrics/cyber.json');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const quotes = await response.json();
            console.log("Lyrics loaded:", quotes);

            
            let randomSong = Math.floor(Math.floor(Math.random() * quotes.song.length));
            let randomIndex = Math.floor(Math.random() * quotes.song[randomSong].lyrics.japanese.length);
            
            poemElement.style.opacity = "0";
            setTimeout(() => {
                originalElement.innerHTML = quotes.song[randomSong].lyrics.japanese[randomIndex];
                songTitleElement.innerHTML = "— " + quotes.song[randomSong].title;
                translationElement.innerHTML = quotes.song[randomSong].lyrics.chinese[randomIndex];
                hiraganaElement.innerHTML = quotes.song[randomSong].lyrics.hiragana[randomIndex];
                poemElement.appendChild(hiraganaElement);
                poemElement.appendChild(originalElement);
                poemElement.appendChild(songTitleElement);
                poemElement.appendChild(translationElement);
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
