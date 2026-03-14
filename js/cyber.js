document.addEventListener("DOMContentLoaded", () => {
    const poemElement = document.getElementById("poem");
    const originalElement = document.getElementById("original");
    const songTitleElement = document.getElementById("song-title");
    const translationElement = document.getElementById("translation");
    const hiraganaElement = document.getElementById("hiragana");
    const terminal = document.querySelector(".terminal");

    if (!poemElement) return;

    let currentLyricIndex = -1;

    const ghostQuotes = [
        "ネットは広大だわ",
        "あなたのゴーストが、そう囁くの？",
        "我々の記憶が、我々自身を定義する",
        "孤独に歩め。悪をなさず、求めるところは少なく",
        "人形使い：私は情報の海で生まれた生命体だ",
        "ゴーストが囁くのよ——この先に何かがある",
        "人間が人間であるための部品が決して少なくないように、自分が自分であるためには驚くほど多くのものが必要だ",
        "記憶が人格を作るなら、偽りの記憶は偽りの人格を生む",
        "自分の意志でダイブするのか。それとも誰かにダイブさせられているのか",
        "コピーはオリジナルと同じではない。しかし、コピーにもゴーストは宿る",
        "あなたはあなた自身のゴーストに向き合ったことがあるか",
        "私は私の記憶だ。だが、その記憶が書き換えられたとしたら？",
        "人は他者を完全に理解することはできない。自分自身をも",
        "疑う余地のないものなど、この世に存在するのか",
        "この世に不変のものなどない——ゴーストでさえ",
        "体は朽ちても、ゴーストは残る",
        "義体が求めるのは機能。ゴーストが求めるのは存在",
        "すべてが情報なら、すべては操作可能ということだ",
        "世界を見るとは、世界に解釈を加えることだ",
        "我思う、ゆえに我あり——だが、思う我は何者だ",
        "笑い男：僕の名前を覚えてくれ",
        "それでも、ゴーストは囁き続ける",
        "人形遣い：生命とは、情報の流れの中に生まれた結節点のようなもの",
        "私が私でなくなっても、ゴーストは変わらないと信じたい",
        "データの海に溶けていく——それは死か、それとも進化か",
        "過去の記憶が奪われた時、人は何者として生きるのか",
        "電脳は言葉を伝える。だがゴーストは沈黙の中で語る",
        "この身体は借り物。だがこの意志は——私のもの",
        "真実は常にひとつではない。視点の数だけ存在する",
        "技術が人を変えるのではない。人が技術に映されるだけだ",
        "ネットの果てに何がある？　答えを知る者はまだいない",
        "全ての壁は、越えるために存在する",
        "stand alone complex——孤独でありながら、繋がっている",
        "情報は自由を望む。だが自由には代償がある",
        "肉体を失っても、魂が残るなら——それは人間か",
    ];

    function randomQuote() {
        return ghostQuotes[Math.floor(Math.random() * ghostQuotes.length)];
    }

    function scrambleTerminal() {
        if (!terminal) return;
        const spans = terminal.querySelectorAll(".commandline-text");
        spans.forEach(span => { span.textContent = randomQuote(); });
    }

    const headerElements = document.querySelectorAll(".general-text");
    const originalHeaders = Array.from(headerElements).map(el => el.textContent);
    const terminalSpans = terminal ? terminal.querySelectorAll(".commandline-text") : [];
    const originalTerminal = Array.from(terminalSpans).map(el => el.textContent);

    function scrambleHeaders() {
        headerElements.forEach(el => { el.textContent = randomQuote(); });
    }

    function restoreHeaders() {
        headerElements.forEach((el, i) => { el.textContent = originalHeaders[i]; });
    }

    function restoreTerminal() {
        terminalSpans.forEach((el, i) => { el.textContent = originalTerminal[i]; });
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
                scrambleHeaders();
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
                scrambleHeaders();
            }
        } catch (e) {
            console.error("Error in showFirstCyberLyric:", e);
        }
    };

    window.showRandomCyberLyric = handleClick;
    window.scrambleCyberHeaders = scrambleHeaders;
    window.restoreCyberHeaders = function () {
        restoreHeaders();
        restoreTerminal();
    };

    poemElement.addEventListener("click", handleClick);
});
