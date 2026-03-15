(function () {
    const STYLE_BOOT = "color:#33ff33;font-family:'Courier New',monospace;font-size:12px;";
    const STYLE_WARN = "color:#ffcc00;font-family:'Courier New',monospace;font-size:12px;";
    const STYLE_OK   = "color:#00ff88;font-family:'Courier New',monospace;font-size:12px;";
    const STYLE_ART  = "color:#0ff;font-family:'Courier New',monospace;font-size:11px;line-height:1.2;";
    const STYLE_HINT = "color:#ff2d95;font-family:'Courier New',monospace;font-size:12px;";
    const STYLE_QUOTE = "color:#888;font-family:'Courier New',monospace;font-size:11px;font-style:italic;";
    const STYLE_CMD  = "color:#0ff;font-family:'Courier New',monospace;font-size:12px;";
    const STYLE_OUT  = "color:#33ff33;font-family:'Courier New',monospace;font-size:11px;";
    const STYLE_ERR  = "color:#ff3333;font-family:'Courier New',monospace;font-size:11px;";
    const STYLE_DIM  = "color:#555;font-family:'Courier New',monospace;font-size:11px;";

    var bootLines = [
        { s: STYLE_BOOT, t: "[CBOS 6.9.0-cb] Initializing cyberbrain SoC..." },
        { s: STYLE_BOOT, t: "[    0.000000] kernel: command line: BOOT_IMAGE=/vmlinuz-6.9.0-cb root=/dev/sda1 ghost=verify" },
        { s: STYLE_BOOT, t: "[    0.002341] ghost_drv: loading module v3.7.1" },
        { s: STYLE_BOOT, t: "[    0.004812] ghost_drv: ghost signature located \u2014 verifying integrity" },
        { s: STYLE_OK,   t: "[    0.012440] ghost_drv: SHA-512 OK \u2014 ghost state: ACTIVE" },
        { s: STYLE_BOOT, t: "[    0.018003] barrier_ids: co-processor online, loading /etc/barrier/rules.d/*" },
        { s: STYLE_OK,   t: "[    0.024102] barrier_ids: 2,847 rules loaded \u2014 monitoring cb0, dive0, syn0" },
        { s: STYLE_BOOT, t: "[    0.031551] mn_cache: mnemonic cache initialized (2048 pages)" },
        { s: STYLE_BOOT, t: "[    0.038900] syn_motor: synapse bridge online \u2014 8 motor, 4 sensory channels" },
        { s: STYLE_BOOT, t: "[    0.045211] dive_tun: dive0 interface standby" },
        { s: STYLE_BOOT, t: "[    0.052003] cb_cortex: cortex emulation layer active" },
        { s: STYLE_BOOT, t: "[    0.064000] systemd[1]: Starting ghost-core.service..." },
        { s: STYLE_OK,   t: "[    0.078441] systemd[1]: Started ghost-core.service \u2014 PID 1200" },
        { s: STYLE_BOOT, t: "[    0.091002] systemd[1]: Starting barrierd.service..." },
        { s: STYLE_OK,   t: "[    0.104330] systemd[1]: Started barrierd.service \u2014 PID 980" },
        { s: STYLE_BOOT, t: "[    0.118700] systemd[1]: Starting mnemosyned.service..." },
        { s: STYLE_BOOT, t: "[    0.132011] mnemosyned[1450]: mounting /mnt/ext-memory..." },
        { s: STYLE_WARN, t: "[    0.148200] mnemosyned[1450]: WARN: ext-memory journal replay \u2014 3 orphaned entries" },
        { s: STYLE_OK,   t: "[    0.165440] mnemosyned[1450]: recall.db loaded \u2014 integrity: PASS" },
        { s: STYLE_OK,   t: "[    0.178003] systemd[1]: Started synapsd.service \u2014 PID 1100" },
        { s: STYLE_OK,   t: "[    0.201881] systemd[1]: Started ghost-syncd.service \u2014 PID 1350" },
        { s: STYLE_OK,   t: "[    0.224100] systemd[1]: Started dive-linkd.service \u2014 PID 1600" },
        { s: STYLE_OK,   t: "[    0.251003] systemd[1]: Started automond.service \u2014 PID 800" },
        { s: STYLE_BOOT, t: "[    0.278440] automond[800]: all subsystems nominal \u2014 beginning health monitoring" },
        { s: STYLE_BOOT, t: "[    0.295112] ghost-syncd[1350]: ghost-body sync established \u2014 drift: 0.4ms" },
        { s: STYLE_OK,   t: "[    0.312889] login[2200]: operator session active" },
    ];

    var asciiArt = [
        "                                                  ",
        "     \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557     ",
        "    \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d     ",
        "    \u2588\u2588\u2551     \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557     ",
        "    \u2588\u2588\u2551     \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2551   \u2588\u2588\u2551\u255a\u2550\u2550\u2550\u2550\u2588\u2588\u2551     ",
        "    \u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551     ",
        "     \u255a\u2550\u2550\u2550\u2550\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u255d  \u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d     ",
        "    Cyberbrain Operating System v6.9.0-cb         ",
        "                                                  ",
    ].join("\n");

    var quotes = [
        "\u300C\u30CD\u30C3\u30C8\u306F\u5E83\u5927\u3060\u308F\u300D\u2014\u2014 \u8349\u8599\u7D20\u5B50",
        "\u300C\u3042\u306A\u305F\u306E\u30B4\u30FC\u30B9\u30C8\u304C\u3001\u305D\u3046\u56C1\u304F\u306E\uFF1F\u300D",
        "\u300C\u5B64\u72EC\u306B\u6B69\u3081\u3002\u60AA\u3092\u306A\u3055\u305A\u3001\u6C42\u3081\u308B\u3068\u3053\u308D\u306F\u5C11\u306A\u304F\u300D",
        "\u300C\u4F53\u306F\u6734\u3061\u3066\u3082\u3001\u30B4\u30FC\u30B9\u30C8\u306F\u6B8B\u308B\u300D",
        "\u300C\u6211\u601D\u3046\u3001\u3086\u3048\u306B\u6211\u3042\u308A\u2014\u2014\u3060\u304C\u3001\u601D\u3046\u6211\u306F\u4F55\u8005\u3060\u300D",
    ];

    function printBoot() {
        var i = 0;
        function next() {
            if (i < bootLines.length) {
                console.log("%c" + bootLines[i].t, bootLines[i].s);
                i++;
                setTimeout(next, 60 + Math.random() * 60);
            } else {
                printAscii();
            }
        }
        next();
    }

    function printAscii() {
        console.log("\n%c" + asciiArt, STYLE_ART);
        console.log("%c" + quotes[Math.floor(Math.random() * quotes.length)], STYLE_QUOTE);
        console.log("\n%cType ghost.help() for available commands.", STYLE_HINT);
    }

    var subsystems = [
        { name: "ghost-core", pid: 1200 },
        { name: "barrierd", pid: 980 },
        { name: "mnemosyned", pid: 1450 },
        { name: "synapsd", pid: 1100 },
        { name: "dive-linkd", pid: 1600 },
        { name: "ghost-syncd", pid: 1350 },
        { name: "automond", pid: 800 },
    ];

    var healthStates = ["NOMINAL", "NOMINAL", "NOMINAL", "NOMINAL", "WARNING", "DEGRADED"];

    function randHealth() {
        return healthStates[Math.floor(Math.random() * healthStates.length)];
    }

    window.ghost = {
        help: function () {
            console.log("%c\u2500\u2500\u2500 CBOS Operator Console \u2500\u2500\u2500", STYLE_CMD);
            console.log("%cghost.status()  \u2014 subsystem health report", STYLE_OUT);
            console.log("%cghost.dive()    \u2014 initiate net dive sequence", STYLE_OUT);
            console.log("%cghost.whisper() \u2014 listen to the ghost", STYLE_OUT);
            console.log("%cghost.scan()    \u2014 run barrier intrusion scan", STYLE_OUT);
            console.log("%cghost.memory()  \u2014 query mnemonic subsystem", STYLE_OUT);
            console.log("%cghost.help()    \u2014 display this message", STYLE_OUT);
        },

        status: function () {
            console.log("%c\u2500\u2500\u2500 CBOS Subsystem Status \u2500\u2500\u2500", STYLE_CMD);
            subsystems.forEach(function (sub) {
                var h = randHealth();
                var style = h === "NOMINAL" ? STYLE_OK : (h === "WARNING" ? STYLE_WARN : STYLE_ERR);
                var extra = "";
                if (sub.name === "ghost-core") extra = "  echo: " + (0.4 + Math.random() * 0.55).toFixed(2);
                if (sub.name === "ghost-syncd") extra = "  drift: " + (Math.random() * 12).toFixed(1) + "ms";
                if (sub.name === "mnemosyned") extra = "  cache hit: " + (0.3 + Math.random() * 0.65).toFixed(2);
                if (sub.name === "synapsd") extra = "  latency: " + (0.5 + Math.random() * 8).toFixed(1) + "ms";
                console.log("%c  " + sub.name + "[" + sub.pid + "]: " + h + extra, style);
            });
            var uptime = Math.floor(Math.random() * 86400);
            var h = Math.floor(uptime / 3600);
            var m = Math.floor((uptime % 3600) / 60);
            console.log("%c  uptime: " + h + "h " + m + "m", STYLE_DIM);
        },

        dive: function () {
            var depths = [
                "dive-linkd[1600]: initializing dive sequence...",
                "dive-linkd[1600]: encrypted tunnel established to relay-7.section9.net",
                "dive-linkd[1600]: dive0 interface UP \u2014 entering the Net",
                "dive-linkd[1600]: depth 1 \u2014 surface layer, clearnet nodes visible",
                "dive-linkd[1600]: depth 2 \u2014 encrypted zone, proxy chain active",
                "dive-linkd[1600]: depth 3 \u2014 deep net, signal degrading",
                "dive-linkd[1600]: depth 4 \u2014 ghost echoes detected from unknown sources",
                "dive-linkd[1600]: depth 5 \u2014 WARNING: barrier_ids losing coverage",
                "ghost-core[1200]: echo amplitude fluctuating: 0.71 -> 0.58 -> 0.63",
                "dive-linkd[1600]: depth 6 \u2014 the net is vast and infinite...",
                "automond[800]: ALERT: dive depth approaching maximum safe limit",
                "dive-linkd[1600]: forced surface \u2014 returning to depth 0",
                "dive-linkd[1600]: dive session terminated. Duration: " + (10 + Math.floor(Math.random() * 50)) + "s",
            ];
            var i = 0;
            function next() {
                if (i < depths.length) {
                    var s = i >= 9 ? STYLE_WARN : STYLE_OUT;
                    console.log("%c" + depths[i], s);
                    i++;
                    setTimeout(next, 400 + Math.random() * 300);
                }
            }
            console.log("%c\u2500\u2500\u2500 Net Dive Sequence \u2500\u2500\u2500", STYLE_CMD);
            next();
        },

        whisper: function () {
            var allQuotes = [
                "\u30CD\u30C3\u30C8\u306F\u5E83\u5927\u3060\u308F",
                "\u3042\u306A\u305F\u306E\u30B4\u30FC\u30B9\u30C8\u304C\u3001\u305D\u3046\u56C1\u304F\u306E\uFF1F",
                "\u6211\u3005\u306E\u8A18\u61B6\u304C\u3001\u6211\u3005\u81EA\u8EAB\u3092\u5B9A\u7FA9\u3059\u308B",
                "\u5B64\u72EC\u306B\u6B69\u3081\u3002\u60AA\u3092\u306A\u3055\u305A\u3001\u6C42\u3081\u308B\u3068\u3053\u308D\u306F\u5C11\u306A\u304F",
                "\u4EBA\u5F62\u4F7F\u3044\uFF1A\u79C1\u306F\u60C5\u5831\u306E\u6D77\u3067\u751F\u307E\u308C\u305F\u751F\u547D\u4F53\u3060",
                "\u30B4\u30FC\u30B9\u30C8\u304C\u56C1\u304F\u306E\u3088\u2014\u2014\u3053\u306E\u5148\u306B\u4F55\u304B\u304C\u3042\u308B",
                "\u8A18\u61B6\u304C\u4EBA\u683C\u3092\u4F5C\u308B\u306A\u3089\u3001\u507D\u308A\u306E\u8A18\u61B6\u306F\u507D\u308A\u306E\u4EBA\u683C\u3092\u751F\u3080",
                "\u30B3\u30D4\u30FC\u306F\u30AA\u30EA\u30B8\u30CA\u30EB\u3068\u540C\u3058\u3067\u306F\u306A\u3044\u3002\u3057\u304B\u3057\u3001\u30B3\u30D4\u30FC\u306B\u3082\u30B4\u30FC\u30B9\u30C8\u306F\u5BBF\u308B",
                "\u4F53\u306F\u6734\u3061\u3066\u3082\u3001\u30B4\u30FC\u30B9\u30C8\u306F\u6B8B\u308B",
                "\u6211\u601D\u3046\u3001\u3086\u3048\u306B\u6211\u3042\u308A\u2014\u2014\u3060\u304C\u3001\u601D\u3046\u6211\u306F\u4F55\u8005\u3060",
                "\u305D\u308C\u3067\u3082\u3001\u30B4\u30FC\u30B9\u30C8\u306F\u56C1\u304D\u7D9A\u3051\u308B",
                "\u30C7\u30FC\u30BF\u306E\u6D77\u306B\u6EB6\u3051\u3066\u3044\u304F\u2014\u2014\u305D\u308C\u306F\u6B7B\u304B\u3001\u305D\u308C\u3068\u3082\u9032\u5316\u304B",
                "\u3053\u306E\u8EAB\u4F53\u306F\u501F\u308A\u7269\u3002\u3060\u304C\u3053\u306E\u610F\u5FD7\u306F\u2014\u2014\u79C1\u306E\u3082\u306E",
                "stand alone complex\u2014\u2014\u5B64\u72EC\u3067\u3042\u308A\u306A\u304C\u3089\u3001\u7E4B\u304C\u3063\u3066\u3044\u308B",
                "\u60C5\u5831\u306F\u81EA\u7531\u3092\u671B\u3080\u3002\u3060\u304C\u81EA\u7531\u306B\u306F\u4EE3\u511F\u304C\u3042\u308B",
            ];
            var q = allQuotes[Math.floor(Math.random() * allQuotes.length)];
            console.log("%cghost-core[1200]: ghost whisper detected \u2014", STYLE_DIM);
            console.log("%c  \u300C" + q + "\u300D", STYLE_QUOTE);
        },

        scan: function () {
            var steps = [
                "barrierd[980]: initiating full intrusion scan...",
                "barrierd[980]: scanning cb0 \u2014 internal bus... clean",
                "barrierd[980]: scanning syn0 \u2014 synapse link... clean",
                "barrierd[980]: scanning dive0 \u2014 dive interface...",
            ];
            var findings = [
                "barrierd[980]: dive0: 3 probes detected from 198.51.100.x (blocked)",
                "barrierd[980]: dive0: anomalous packet at 0x7F3A \u2014 signature: UNKNOWN",
                "barrierd[980]: dive0: encrypted payload, cannot inspect \u2014 flagged",
                "barrierd[980]: scan complete \u2014 2,847 rules checked, 3 anomalies flagged",
                "barrierd[980]: /proc/cb/barrier_state: ACTIVE",
            ];
            var all = steps.concat(findings);
            var i = 0;
            function next() {
                if (i < all.length) {
                    var s = i >= steps.length && i < all.length - 1 ? STYLE_WARN : STYLE_OUT;
                    console.log("%c" + all[i], s);
                    i++;
                    setTimeout(next, 300 + Math.random() * 200);
                }
            }
            console.log("%c\u2500\u2500\u2500 Barrier Intrusion Scan \u2500\u2500\u2500", STYLE_CMD);
            next();
        },

        memory: function () {
            var sectors = ["RECENT", "SHORT_TERM", "LONG_TERM", "EXTERNAL"];
            console.log("%c\u2500\u2500\u2500 Mnemosyne Memory Report \u2500\u2500\u2500", STYLE_CMD);
            sectors.forEach(function (sec) {
                var used = Math.floor(Math.random() * 100);
                var integrity = Math.random() > 0.2 ? "PASS" : "DEGRADED";
                var style = integrity === "PASS" ? STYLE_OUT : STYLE_WARN;
                console.log("%c  " + sec + ": " + used + "% used, integrity: " + integrity, style);
            });
            var cacheHit = (0.4 + Math.random() * 0.55).toFixed(2);
            var walSize = (Math.random() * 2048).toFixed(0);
            console.log("%c  cache hit ratio: " + cacheHit, STYLE_DIM);
            console.log("%c  WAL size: " + walSize + "MB / 2048MB", STYLE_DIM);
            if (Math.random() > 0.7) {
                console.log("%c  WARNING: 1 record unreadable (ts=2019-07-\u2588\u2588)", STYLE_WARN);
            }
        },
    };

    printBoot();
})();
