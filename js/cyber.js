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

    const terminalErrors = [
        // ghost-core.service — consciousness kernel
        "ghost-core[1200]: integrity check failed — hash mismatch on /sys/ghost/integrity",
        "ghost-core[1200]: echo amplitude dropped to 0.31 (threshold: 0.40)",
        "ghost-core[1200]: WARNING: boundary value at /sys/ghost/boundary below minimum",
        "kernel: [47293.812] ghost_drv: page fault at 0xffff8800cb000a4f in ghost_verify()",
        "systemd[1]: ghost-core.service: watchdog timeout, restarting...",
        "kernel: [47301.004] ghost_drv: BUG: ghost state transitioned to FRAGMENTING",
        "ghost-core[1200]: CRITICAL: /proc/cb/ghost_state changed ACTIVE -> FRAGMENTING",
        "ghost-core[1200]: echo signal lost for 8.2s — attempting re-acquisition",
        // mnemosyned — memory subsystem
        "mnemosyned[1450]: WAL overflow — /var/lib/mnemosyne/wal/ exceeds 2GB limit",
        "mnemosyned[1450]: recall.db: checksum failed on block 4091, sector LONG_TERM",
        "mnemosyned[1450]: cache miss ratio 0.87 — mn_cache thrashing detected",
        "kernel: [51882.339] mn_cache: use-after-free in recall_fragment+0x1c/0x58",
        "mnemosyned[1450]: external bank /mnt/ext-memory unmounted unexpectedly",
        "mnemosyned[1450]: WARN: record ts=2019-07-██ unreadable, skipping",
        "mnemosyne-fsck[8012]: /var/lib/mnemosyne/recall.db: 7 orphaned entries cleared",
        "mnemosyned[1450]: ERROR: write to LONG_TERM rejected — device read-only",
        "mnemosyned[1450]: access.log: 14 unauthorized read attempts from uid 0",
        // barrierd — security firewall
        "barrierd[980]: intrusion attempt on dive0 from 198.51.100.0 — signature unknown",
        "barrierd[980]: rule chain INPUT_GHOST: 3 packets dropped (ghost-hack vector)",
        "barrierd[980]: WARNING: /etc/barrier/whitelist modified without authorization",
        "barrierd[980]: co-processor timeout after 5000ms — falling back to software IDS",
        "kernel: [58201.773] barrier_ids: anomalous pattern on cb0:9000, flagged for review",
        "barrierd[980]: ALERT: /proc/cb/barrier_state changed ACTIVE -> DEGRADED",
        "barrierd[980]: signature database /etc/barrier/rules.d/viral.rules corrupted",
        // synapsd — prosthetic shell control
        "synapsd[1100]: latency on /dev/synapse/motor3 spiked to 47ms (limit: 2ms)",
        "synapsd[1100]: channel desync between motor0 and sensory1 — recalibrating",
        "synapsd[1100]: WARNING: phantom signal on /dev/synapse/sensory2",
        "kernel: [63440.812] syn_motor: feedback loop detected on channel 3, dampening",
        "synapsd[1100]: calibration drift on motor0-motor7 exceeds 12% — manual reset required",
        // dive-linkd — network dive interface
        "dive-linkd[1600]: tunnel to relay-7.section9.net collapsed — ECONNRESET",
        "dive-linkd[1600]: /proc/cb/dive_depth unexpectedly at 6 — forced surface initiated",
        "dive-linkd[1600]: WARNING: session.sock orphaned — operator consciousness not found",
        "dive-linkd[1600]: route to deep-net blackholed at hop 4, renegotiating",
        "kernel: [72019.551] dive_tun: encrypted channel cb0->dive0 integrity failure",
        "dive-linkd[1600]: CRITICAL: dive depth overflow (7 -> 8), emergency disconnect",
        // ghost-syncd — ghost/body sync
        "ghost-syncd[1350]: sync drift 340ms — approaching DRIFTING threshold (500ms)",
        "ghost-syncd[1350]: /sys/ghost/bind_token expires in 180s — renewal failed",
        "ghost-syncd[1350]: WARNING: /sys/ghost/sync_state changed SYNCED -> DRIFTING",
        "ghost-syncd[1350]: bind_token expired — shell binding lost, rebinding...",
        "ghost-syncd[1350]: ERROR: rebind failed — target shell not responding on syn0",
        // automond — system monitor
        "automond[800]: ghost-core health: DEGRADED (echo: 0.29, boundary: UNSTABLE)",
        "automond[800]: mnemosyned health: WARNING (cache miss: 0.91, WAL: 89% full)",
        "automond[800]: 4 of 6 subsystems reporting anomalies — escalating to operator",
        "automond[800]: emergency ghost backup initiated to /mnt/ext-memory/ghost.bak",
        "automond[800]: ALERT: ghost backup failed — external bank not mounted",
        // kernel / boot / general system
        "kernel: [82140.221] RIP: 0010:cb_cortex_tick+0x47/0xe0 [cb_cortex]",
        "kernel: [82140.553] Call Trace: ghost_drv_irq+0x2a/0x40 -> cb_cortex_tick+0x47",
        "systemd[1]: mnemosyned.service: Main process exited, code=dumped, status=11/SEGV",
        "kernel: [84932.001] cb_cortex: clocksource unstable — drift exceeds 500ppm",
        "systemd-journald[312]: /var/log/journal: No space left on device",
        "GRUB-CB: WARNING: ghost_drv signature check failed — booting anyway",
        "login[2200]: pam_ghost(login:auth): operator ghost signature unverifiable",
    ];

    function scrambleTerminal() {
        if (!terminal) return;
        const spans = terminal.querySelectorAll(".commandline-text");
        spans.forEach(span => {
            span.textContent = terminalErrors[Math.floor(Math.random() * terminalErrors.length)];
        });
    }

    const h1Element = document.querySelector("h1.general-text");
    const headerElements = document.querySelectorAll(".general-text");
    const originalHeaders = Array.from(headerElements).map(el => el.textContent);
    const terminalSpans = terminal ? terminal.querySelectorAll(".commandline-text") : [];
    const originalTerminal = Array.from(terminalSpans).map(el => el.textContent);
    let flashTimer = null;

    function flashQuote() {
        if (!h1Element || window.currentBroadcastSong) return;
        h1Element.textContent = randomQuote();
        h1Element.style.opacity = "1";
        clearTimeout(flashTimer);
        flashTimer = setTimeout(() => { h1Element.style.opacity = "0"; }, 1200);
    }

    function cancelFlash() {
        clearTimeout(flashTimer);
        if (h1Element) h1Element.style.opacity = "";
    }

    function restoreHeaders() {
        cancelFlash();
        headerElements.forEach((el, i) => {
            el.textContent = originalHeaders[i];
            el.style.opacity = "";
        });
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
                const song = allSongs.find(s => s.title === window.currentBroadcastSong);
                if (song) {
                    const nextIndex = (currentLyricIndex + 1) % song.lyrics.japanese.length;
                    showLyric(song, nextIndex);
                    return;
                }
            }

            flashQuote();
            const pool = allSongs.filter(s => s.artist !== "ヨルシカ");
            const song = pool[Math.floor(Math.random() * pool.length)];
            showLyric(song, Math.floor(Math.random() * song.lyrics.japanese.length));

        } catch (error) {
            console.error("Error loading lyrics:", error);
        }
    }

    window.showFirstCyberLyric = async function (title) {
        try {
            cancelFlash();
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
    window.restoreCyberHeaders = function () {
        restoreHeaders();
        restoreTerminal();
    };

    poemElement.addEventListener("click", handleClick);
});
