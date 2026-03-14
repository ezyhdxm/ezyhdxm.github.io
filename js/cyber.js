document.addEventListener("DOMContentLoaded", () => {
    const poemElement = document.getElementById("poem");
    const originalElement = document.getElementById("original");
    const songTitleElement = document.getElementById("song-title");
    const translationElement = document.getElementById("translation");
    const hiraganaElement = document.getElementById("hiragana");
    const terminal = document.querySelector(".terminal");

    if (!poemElement) return;

    let currentLyricIndex = -1;

    const errorMessages = [
        "FATAL: Neural link severed at 0x7F3A",
        "WARNING: Memory leak in sector 9",
        "ERR_CONNECTION_LOST: Host unreachable",
        "CRITICAL: Firewall breach detected",
        "SEGFAULT: Core dumped at 0xDEADBEEF",
        "ALERT: Unauthorized access attempt",
        "ERROR: Consciousness buffer overflow",
        "WARNING: Reality desync detected",
        "FATAL: Dream sequence corrupted",
        "ERR_TIMEOUT: Signal lost in the void",
        "PANIC: Kernel trap at 0xCAFEBABE",
        "WARNING: Temporal anomaly in thread 42",
        "ERROR: Identity matrix singular",
        "CRITICAL: Emotion module unresponsive",
        "FATAL: Synaptic overflow in node 7",
        "WARNING: Ghost process detected in PID 404",
        "ERR_DECODE: Corrupted memory fragment",
        "ALERT: Unauthorized dream injection",
        "CRITICAL: Soul.exe has stopped responding",
        "FATAL: Heartbeat daemon terminated",
    ];

    function randomError() {
        return errorMessages[Math.floor(Math.random() * errorMessages.length)];
    }

    function scrambleTerminal() {
        if (!terminal) return;
        const spans = terminal.querySelectorAll(".commandline-text");
        spans.forEach(span => { span.textContent = randomError(); });
    }

    function showLyric(song, index) {
        currentLyricIndex = index;
        poemElement.style.opacity = "0";
        setTimeout(() => {
            originalElement.innerHTML = song.lyrics.japanese[index];
            songTitleElement.innerHTML = "— " + song.title;
            translationElement.innerHTML = song.lyrics.chinese[index];
            hiraganaElement.innerHTML = song.lyrics.hiragana[index];
            poemElement.appendChild(hiraganaElement);
            poemElement.appendChild(originalElement);
            poemElement.appendChild(songTitleElement);
            poemElement.appendChild(translationElement);
            poemElement.style.opacity = "1";
        }, 200);

        poemElement.classList.add("glitch-click");
        setTimeout(() => poemElement.classList.remove("glitch-click"), 500);
    }

    async function handleClick() {
        try {
            const allSongs = await window.lyricsLoader.loadAll();

            if (window.currentBroadcastSong) {
                scrambleTerminal();
                const song = allSongs.find(s => s.title === window.currentBroadcastSong);
                if (song) {
                    const nextIndex = (currentLyricIndex + 1) % song.lyrics.japanese.length;
                    showLyric(song, nextIndex);
                    return;
                }
            }

            const pool = allSongs.filter(s => s.artist !== "ヨルシカ");
            const song = pool[Math.floor(Math.random() * pool.length)];
            showLyric(song, Math.floor(Math.random() * song.lyrics.japanese.length));

        } catch (error) {
            console.error("Error loading lyrics:", error);
        }
    }

    window.showFirstCyberLyric = async function (title) {
        try {
            const allSongs = await window.lyricsLoader.loadAll();
            const song = allSongs.find(s => s.title === title);
            if (song) {
                showLyric(song, 0);
                scrambleTerminal();
            }
        } catch (e) {
            console.error("Error in showFirstCyberLyric:", e);
        }
    };

    window.showRandomCyberLyric = handleClick;

    poemElement.addEventListener("click", handleClick);
});
