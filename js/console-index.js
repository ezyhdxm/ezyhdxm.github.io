(function () {
    var S1 = "color:#D49A89;font-family:'Georgia','EB Garamond',serif;font-size:14px;letter-spacing:2px;";
    var S2 = "color:#8B7D6B;font-family:'Georgia','EB Garamond',serif;font-size:12px;font-style:italic;";
    var S3 = "color:#555;font-family:'Georgia','EB Garamond',serif;font-size:11px;";
    var S_HINT = "color:#D49A89;font-family:'Courier New',monospace;font-size:11px;";
    var S_PROMPT = "color:#8B7D6B;font-family:'Courier New',monospace;font-size:12px;";
    var S_OUT = "color:#555;font-family:'Courier New',monospace;font-size:11px;";
    var S_DIR = "color:#6A8EAE;font-family:'Courier New',monospace;font-size:11px;font-weight:bold;";
    var S_FILE = "color:#888;font-family:'Courier New',monospace;font-size:11px;";
    var S_WARN = "color:#C49060;font-family:'Courier New',monospace;font-size:11px;";
    var S_ERR = "color:#B05050;font-family:'Courier New',monospace;font-size:11px;";
    var S_OK = "color:#6EAA6E;font-family:'Courier New',monospace;font-size:12px;font-weight:bold;";
    var S_GATE = "color:#D49A89;font-family:'Courier New',monospace;font-size:12px;";

    var art = [
        "",
        "    \u2502  \u2502",
        "    \u2502  \u2502",
        "    \u2534\u2500\u2500\u2534",
        "    \u250C\u2500\u2500\u2510",
        "    \u2502  \u2502",
        "    \u2502  \u2502",
        "",
    ].join("\n");

    console.log("%c" + art, S1);
    console.log("%cYou found the back door. Welcome, curious one.", S2);
    console.log(
        "%c\u201CThe details are not the details. They make the design.\u201D \u2014 Charles Eames",
        S3
    );
    console.log("\n%cSomething stirs beneath the surface. Try: cbos.terminal()", S_HINT);

    // -- Question bank --

    var questions = null;
    var currentQuestion = null;

    function loadQuestions() {
        return fetch("assets/quant/questions.json")
            .then(function (r) { return r.json(); })
            .then(function (data) {
                questions = data;
                pickQuestion();
            })
            .catch(function () {
                questions = [{
                    id: "fallback",
                    question: [
                        "A stick of length 1 is broken at two",
                        "points chosen uniformly at random.",
                        "What is the probability that the three",
                        "pieces can form a triangle?"
                    ],
                    answer: 0.25,
                    tolerance: 0.01,
                    hint: "Each piece must be less than 1/2.",
                    difficulty: "medium",
                    category: "probability"
                }];
                pickQuestion();
            });
    }

    function pickQuestion() {
        if (!questions || !questions.length) return;
        currentQuestion = questions[Math.floor(Math.random() * questions.length)];
        updateGatewayFile();
    }

    function updateGatewayFile() {
        if (!currentQuestion) return;
        var text =
            "\u2500\u2500\u2500 ACCESS DENIED \u2500\u2500\u2500\n" +
            "Authorization required to proceed.\n" +
            "To unlock, prove you can think.\n\n" +
            "[" + currentQuestion.difficulty.toUpperCase() + " | " + currentQuestion.category + "]\n\n" +
            "QUESTION:\n" +
            currentQuestion.question.join("\n") + "\n\n" +
            "Answer with a number.\n" +
            "Type:  cbos.unlock( your_answer )\n" +
            "Stuck? cbos.hint()  |  New question? cbos.reroll()";
        fs.etc.barrier["gateway.locked"] = text;
    }

    // -- Filesystem --

    var fs = {
        home: {
            operator: {
                ".profile": "ghost echo: 0.72 | shell: /bin/cbsh",
                "notes.txt": "The barrier holds. But not forever.\nSomething is listening on /var/log/barrier/.\nI should check the intrusion log.",
            },
        },
        sys: {
            ghost: {
                integrity: "SHA-512: a4f8e92d...c031b7a0 \u2014 VALID",
                echo: "0.72",
                boundary: "STABLE (last checked 14s ago)",
            },
        },
        var: {
            log: {
                barrier: {
                    "intrusion.log":
                        "[2026-03-14 02:14:07] barrierd[980]: probe on dive0 from 198.51.100.7 \u2014 blocked\n" +
                        "[2026-03-14 02:14:08] barrierd[980]: signature match: LAUGHING_MAN variant\n" +
                        "[2026-03-14 02:14:09] barrierd[980]: NOTE: gateway authorization pending \u2014 see /etc/barrier/gateway.locked",
                },
            },
        },
        etc: {
            barrier: {
                whitelist: "operator (UID 1000) \u2014 TRUSTED\nghost   (UID  500) \u2014 TRUSTED",
                "gateway.locked": "\u2500\u2500\u2500 ACCESS DENIED \u2500\u2500\u2500\nLoading question bank...\nRun cbos.terminal() to begin.",
            },
        },
        tmp: {
            dive: {
                ".hidden": "You're getting closer.\nThe gate is in /etc/barrier/.",
            },
        },
    };

    // Load questions immediately
    loadQuestions();

    // -- Path utilities --

    var cwd = "/home/operator";

    function resolve(path) {
        if (!path) return cwd;
        var base = path.charAt(0) === "/" ? [] : cwd.split("/").filter(Boolean);
        var parts = path.split("/").filter(Boolean);
        for (var i = 0; i < parts.length; i++) {
            if (parts[i] === "..") base.pop();
            else if (parts[i] !== ".") base.push(parts[i]);
        }
        return "/" + base.join("/");
    }

    function lookup(path) {
        var parts = path.split("/").filter(Boolean);
        var node = fs;
        for (var i = 0; i < parts.length; i++) {
            if (node == null || typeof node !== "object") return undefined;
            node = node[parts[i]];
        }
        return node;
    }

    function isDir(node) {
        return node != null && typeof node === "object";
    }

    // -- Commands --

    function cmdLs(args) {
        var target = resolve(args);
        var node = lookup(target);
        if (node === undefined) {
            console.log("%ccbsh: ls: " + args + ": No such file or directory", S_ERR);
            return;
        }
        if (!isDir(node)) {
            console.log("%c" + args, S_FILE);
            return;
        }
        var keys = Object.keys(node);
        var dirs = [];
        var files = [];
        for (var i = 0; i < keys.length; i++) {
            if (isDir(node[keys[i]])) dirs.push(keys[i] + "/");
            else files.push(keys[i]);
        }
        if (dirs.length) console.log("%c" + dirs.join("  "), S_DIR);
        if (files.length) console.log("%c" + files.join("  "), S_FILE);
        if (!dirs.length && !files.length) console.log("%c(empty)", S_OUT);
    }

    function cmdCd(args) {
        if (!args) { cwd = "/home/operator"; return; }
        var target = resolve(args);
        var node = lookup(target);
        if (node === undefined) {
            console.log("%ccbsh: cd: " + args + ": No such file or directory", S_ERR);
            return;
        }
        if (!isDir(node)) {
            console.log("%ccbsh: cd: " + args + ": Not a directory", S_ERR);
            return;
        }
        cwd = target;
    }

    function cmdCat(args) {
        if (!args) { console.log("%ccbsh: cat: missing operand", S_ERR); return; }
        var target = resolve(args);
        var node = lookup(target);
        if (node === undefined) {
            console.log("%ccbsh: cat: " + args + ": No such file or directory", S_ERR);
            return;
        }
        if (isDir(node)) {
            console.log("%ccbsh: cat: " + args + ": Is a directory", S_ERR);
            return;
        }
        var lines = node.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var style = S_OUT;
            if (lines[i].indexOf("ACCESS DENIED") !== -1) style = S_ERR;
            else if (lines[i].indexOf("QUESTION") !== -1 || lines[i].indexOf("cbos.unlock") !== -1 || lines[i].indexOf("cbos.hint") !== -1) style = S_GATE;
            else if (lines[i].indexOf("WARNING") !== -1 || lines[i].indexOf("NOTE") !== -1) style = S_WARN;
            console.log("%c" + lines[i], style);
        }
    }

    function cmdPwd() { console.log("%c" + cwd, S_OUT); }
    function cmdWhoami() { console.log("%coperator", S_OUT); }
    function cmdHelp() {
        console.log("%c\u2500\u2500\u2500 cbsh \u2500\u2500\u2500", S_PROMPT);
        console.log("%c  ls [path]    list directory", S_OUT);
        console.log("%c  cd [path]    change directory", S_OUT);
        console.log("%c  cat <file>   read file", S_OUT);
        console.log("%c  pwd          print working directory", S_OUT);
        console.log("%c  whoami       current user", S_OUT);
        console.log("%c  clear        clear console", S_OUT);
        console.log("%c  help         show this message", S_OUT);
    }

    function runCmd(input) {
        var trimmed = input.trim();
        if (!trimmed) return;
        var spaceIdx = trimmed.indexOf(" ");
        var cmd = spaceIdx === -1 ? trimmed : trimmed.substring(0, spaceIdx);
        var args = spaceIdx === -1 ? "" : trimmed.substring(spaceIdx + 1).trim();

        switch (cmd) {
            case "ls": cmdLs(args); break;
            case "cd": cmdCd(args); break;
            case "cat": cmdCat(args); break;
            case "pwd": cmdPwd(); break;
            case "whoami": cmdWhoami(); break;
            case "help": cmdHelp(); break;
            case "clear": console.clear(); break;
            default:
                console.log("%ccbsh: command not found: " + cmd, S_ERR);
        }
    }

    // -- Terminal entry point --

    var terminalActive = false;

    window.cbos = window.cbos || {};

    window.cbos.terminal = function () {
        if (terminalActive) {
            console.log("%cTerminal already active. Use cbos.cmd('command') to run commands.", S_PROMPT);
            return;
        }
        terminalActive = true;
        console.log("%c\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", S_PROMPT);
        console.log("%cCBOS 6.9.0-cb | /bin/cbsh", S_PROMPT);
        console.log("%cLogged in as: operator (UID 1000)", S_OUT);
        console.log("%c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", S_PROMPT);
        console.log("%cUse cbos.cmd('command') to run shell commands.", S_OUT);
        console.log("%cType cbos.cmd('help') to see available commands.\n", S_OUT);
    };

    window.cbos.cmd = function (input) {
        if (!terminalActive) {
            console.log("%cNo active terminal. Run cbos.terminal() first.", S_ERR);
            return;
        }
        console.log("%coperator@cbos:" + cwd + "$ " + input, S_PROMPT);
        runCmd(input);
    };

    // -- Unlock / quant puzzle --

    window.cbos.unlock = function (val) {
        if (!currentQuestion) {
            console.log("%cbarrierd[980]: question bank not loaded \u2014 try again in a moment", S_ERR);
            return;
        }
        var n = parseFloat(val);
        if (isNaN(n)) {
            console.log("%cbarrierd[980]: invalid input \u2014 numeric value required", S_ERR);
            return;
        }
        var tol = currentQuestion.tolerance || 0.01;
        if (Math.abs(n - currentQuestion.answer) <= tol) {
            console.log("%c", "padding:0");
            console.log("%c\u2588\u2588\u2588 ACCESS GRANTED \u2588\u2588\u2588", S_OK);
            console.log("%cbarrierd[980]: authorization verified \u2014 gateway unlocked", S_OK);
            console.log("%cQuestion: " + currentQuestion.id + " [" + currentQuestion.difficulty + "] \u2014 SOLVED", S_OUT);
            console.log("%cdive-linkd[1600]: establishing tunnel to deep-net...", S_GATE);
            console.log("%cRedirecting in 3 seconds...", S_GATE);
            console.log("%cOr type cbos.reroll() to try another question.", S_OUT);
            setTimeout(function () {
                console.log("%cghost-core[1200]: \u30CD\u30C3\u30C8\u306F\u5E83\u5927\u3060\u308F", S_OK);
                window.location.href = "cyberpunk.html";
            }, 3000);
        } else {
            console.log("%cbarrierd[980]: authorization failed \u2014 incorrect response", S_ERR);
        }
    };

    window.cbos.hint = function () {
        if (!currentQuestion) {
            console.log("%cNo active question.", S_ERR);
            return;
        }
        console.log("%c\u2500\u2500\u2500 HINT \u2500\u2500\u2500", S_WARN);
        console.log("%c" + currentQuestion.hint, S_WARN);
    };

    window.cbos.reroll = function () {
        if (!questions || questions.length < 2) {
            console.log("%cNo other questions available.", S_ERR);
            return;
        }
        var prev = currentQuestion;
        while (currentQuestion === prev) {
            pickQuestion();
        }
        console.log("%cbarrierd[980]: gateway question rotated", S_OUT);
        console.log("%cNew question loaded [" + currentQuestion.difficulty + " | " + currentQuestion.category + "]", S_OUT);
        console.log("%cType cbos.cmd('cat /etc/barrier/gateway.locked') to read it.", S_OUT);
    };
})();
