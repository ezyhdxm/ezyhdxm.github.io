document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById("quote");
    const originalElement = document.getElementById("original");
    const songTitleElement = document.getElementById("song-title");
    const translationElement = document.getElementById("translation");
    const hiraganaElement = document.getElementById("hiragana");

    if (!quoteElement || !translationElement) return;

    let currentLyricIndex = -1;

    function showLyric(song, index) {
        currentLyricIndex = index;
        quoteElement.style.opacity = "0";
        setTimeout(() => {
            originalElement.innerHTML = song.lyrics.japanese[index];
            songTitleElement.innerHTML = "— " + song.title;
            translationElement.innerHTML = song.lyrics.chinese[index];
            hiraganaElement.innerHTML = song.lyrics.hiragana[index];
            quoteElement.appendChild(originalElement);
            quoteElement.appendChild(songTitleElement);
            quoteElement.appendChild(translationElement);
            quoteElement.appendChild(hiraganaElement);
            quoteElement.style.opacity = "1";
        }, 500);
    }

    async function handleLyricClick() {
        try {
            const allSongs = await window.lyricsLoader.loadAll();

            if (window.currentPlayingSong) {
                const song = allSongs.find(s => s.title === window.currentPlayingSong);
                if (song) {
                    const nextIndex = (currentLyricIndex + 1) % song.lyrics.japanese.length;
                    showLyric(song, nextIndex);
                    return;
                }
            }

            const pool = allSongs.filter(s => s.artist === "ヨルシカ");
            const song = pool[Math.floor(Math.random() * pool.length)];
            showLyric(song, Math.floor(Math.random() * song.lyrics.japanese.length));

        } catch (error) {
            console.error("Error loading lyrics:", error);
            quoteElement.innerHTML = "⚠️ 加载歌词失败...";
        }
    }

    window.showFirstLyricOf = async function (title) {
        try {
            const allSongs = await window.lyricsLoader.loadAll();
            const song = allSongs.find(s => s.title === title);
            if (song) showLyric(song, 0);
        } catch (e) {
            console.error("Error in showFirstLyricOf:", e);
        }
    };

    window.showRandomLyric = handleLyricClick;

    quoteElement.addEventListener("click", handleLyricClick);

    /* Mobile: tap outside lyrics to toggle hiragana/translation */

    if (window.matchMedia("(max-width: 768px)").matches) {
        let showText = 0;
        const container = document.querySelector(".container");

        document.addEventListener("click", function (event) {
            if (!container.contains(event.target)) {
                showText = 1 - showText;
                hiraganaElement.style.opacity = showText;
                translationElement.style.opacity = showText;
                songTitleElement.style.opacity = 0.5 + 0.5 * showText;
                originalElement.style.opacity = 1 - showText;
            }
        });
    }
});
