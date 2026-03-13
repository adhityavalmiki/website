(function () {
    const overlay = document.getElementById("welcomeOverlay");

    if (overlay) {
        if (sessionStorage.getItem("welcomeDone")) {
            overlay.style.display = "none";
        } else {
            const nameInput = document.getElementById("nameInput");
            const enterBtn = document.getElementById("enterBtn");
            const greetingStage = document.getElementById("greetingStage");
            const greetingName = document.getElementById("greetingName");
            const continueBtn = document.getElementById("continueBtn");
            const bootSequence = document.getElementById("bootSequence");
            const inputStage = document.getElementById("inputStage");

            if (nameInput && enterBtn && greetingStage && greetingName && continueBtn && bootSequence && inputStage) {
                const bootLines = [
                    "root@adhitya:~# ./secure_boot.exe",
                    "[ok] loading terminal interface modules",
                    "[ok] initializing neon grid",
                    "[ok] syncing portfolio nodes",
                    "[wait] operator authentication required"
                ];

                function typeOverlayLine(text, done) {
                    const line = document.createElement("p");
                    line.className = "boot-line boot-line--typed";
                    bootSequence.appendChild(line);

                    let index = 0;
                    function step() {
                        line.textContent = text.slice(0, index);
                        index += 1;

                        if (index <= text.length) {
                            bootSequence.scrollTop = bootSequence.scrollHeight;
                            setTimeout(step, 18);
                            return;
                        }

                        line.classList.remove("boot-line--typed");
                        if (done) {
                            done();
                        }
                    }

                    step();
                }

                function revealAuth() {
                    const authRow = document.createElement("div");
                    authRow.className = "boot-auth-row";
                    authRow.innerHTML = '<span class="boot-auth-label">root@adhitya:~#</span><span class="boot-line">enter_name</span>';
                    bootSequence.appendChild(authRow);
                    inputStage.classList.add("visible");
                    nameInput.focus();
                }

                (function runBoot(index) {
                    if (index >= bootLines.length) {
                        setTimeout(revealAuth, 180);
                        return;
                    }

                    typeOverlayLine(bootLines[index], function () {
                        setTimeout(function () {
                            runBoot(index + 1);
                        }, 140);
                    });
                })(0);

                nameInput.addEventListener("keydown", function (event) {
                    if (event.key === "Enter") {
                        enterBtn.click();
                    }
                });

                enterBtn.addEventListener("click", function () {
                    const name = nameInput.value.trim();

                    if (!name) {
                        nameInput.value = "";
                        nameInput.placeholder = "identity required";
                        nameInput.style.borderColor = "#ff5f56";
                        setTimeout(function () {
                            nameInput.placeholder = "enter operator name";
                            nameInput.style.borderColor = "";
                        }, 1100);
                        return;
                    }

                    greetingName.textContent = name;
                    overlay.classList.add("show-greeting");
                    greetingStage.classList.add("visible");
                });

                continueBtn.addEventListener("click", function () {
                    sessionStorage.setItem("welcomeDone", "yes");
                    overlay.classList.add("fade-out");
                    overlay.addEventListener("transitionend", function () {
                        overlay.style.display = "none";
                    }, { once: true });
                });
            }
        }
    }

    const typingTarget = document.querySelector(".typing-text");

    if (typingTarget) {
        const words = [
            "red team visuals",
            "secure interface systems",
            "reconnaissance workflows",
            "terminal-first design"
        ];
        let wordIndex = 0;
        let letterIndex = 0;
        let deleting = false;

        function tick() {
            const word = words[wordIndex];
            typingTarget.textContent = word.slice(0, letterIndex);

            if (!deleting && letterIndex < word.length) {
                letterIndex += 1;
                setTimeout(tick, 55);
                return;
            }

            if (!deleting && letterIndex === word.length) {
                deleting = true;
                setTimeout(tick, 1200);
                return;
            }

            if (deleting && letterIndex > 0) {
                letterIndex -= 1;
                setTimeout(tick, 35);
                return;
            }

            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(tick, 220);
        }

        tick();
    }

    if (typeof NProgress !== "undefined") {
        NProgress.start();
        window.addEventListener("load", function () {
            NProgress.done();
        });
    }

    const terminalForm = document.getElementById("terminalForm");
    const terminalInput = document.getElementById("terminalCommand");
    const terminalHistory = document.getElementById("terminalHistory");
    const terminalPrompt = document.getElementById("terminalPrompt");
    const terminalWindowTitle = document.getElementById("terminalWindowTitle");

    if (terminalForm && terminalInput && terminalHistory && terminalPrompt && terminalWindowTitle) {
        const shellState = {
            cwd: "~",
            user: "root",
            host: "adhitya",
            history: [],
            historyIndex: 0,
            lastExitCode: 0
        };

        const directories = {
            "~": ["about", "projects", "contact", "profile.txt", "github.txt", "mission.txt", "readme.txt"],
            "~/about": ["profiledump.txt", "stackoverview.txt"],
            "~/projects": ["projects.txt", "Flixora.txt", "HabitTrackerAndroid.txt"],
            "~/contact": ["instagram.txt"]
        };

        const files = {
            "~/readme.txt": "Welcome to the Adhitya portfolio shell.\nTry: help, ls, pwd, cd projects, cat flixora.txt",
            "~/mission.txt": "Exploring ethical hacking, security tooling, and terminal-driven development.",
            "~/github.txt": "https://github.com/adhityavalmiki",
            "~/profile.txt": "Ketha Adhitya Valmiki\nFinal-year CSE Diploma student\nCybersecurity learner | Linux enthusiast | Builder",
            "~/about/profiledump.txt": "Profile Dump\n\n</> Origin Story\nThe journey started in 2022 with web development and expanded into cybersecurity, system tooling, and interface customization. The core pattern has stayed the same: build something real, take it apart, and come back with a better version.\n\n{ } What I Build\nBeyond security, I craft real products - streaming platforms, habit trackers, and web apps. I leverage AI assistance to move fast without cutting quality. My stack includes C, Java, Python, HTML/CSS/JS, and React Native for mobile.\n\n# Mission\nBridging offensive security thinking with hands-on software engineering. Learning how attackers operate so I can build things that resist attack.\n\n>_ Operating Focus\n- Ethical hacking labs and foundational security practice\n- Frontend interfaces with sharper visual identity and stronger UX control\n- Linux-first workflows, especially Kali Linux, for learning and experimentation\n- Project work that turns ideas into visible, testable outcomes\n\n// Off-Screen Mode\n- Gym Workouts and Boxing Practice\n- Cooking for Balanced Nutrition\n- Reading Books on Growth and Mindset",
            "~/about/stackoverview.txt": "Stack Overview\n\n001 / Frontend - Interface Engineering\n- HTML5 for solid semantic structure and consistent page architecture\n- CSS3 for custom layouts, visual systems, motion, and dark UI work\n- JavaScript for interaction, flow control, and interface behavior\n- Tailwind CSS for fast component work when the project calls for speed\n\n002 / Backend - Logic Layer\n- Node.js for lightweight application logic and tooling workflows\n- Python for scripts, utilities, and quick automation experiments\n- PHP basics for small projects or legacy environments\n- Problem-solving through iterative builds and practical debugging\n\n003 / Cyber - Security Practice\n- Linux CLI confidence and terminal-driven workflow habits\n- Nmap, Hydra, and Wireshark familiarity for lab-based learning\n- Burp Suite for web testing and request analysis workflows\n- TryHackMe labs for structured, hands-on security practice\n\n004 / Tools - Build Environment\n- Git and GitHub for version control and project history\n- VS Code as the daily development and editing environment\n- Figma for planning layouts before the build phase starts\n- AI tools for prompt-assisted speed and exploration",
            "~/projects/projects.txt": "Projects Overview\n\nFlixora\n- Cross-platform streaming companion application\n- Lets users explore anime, movies, web series, and manga using integrated external APIs\n- Stack: Android, React\n- Focus: content discovery, watch flow, and product-style UI\n\nHabit Tracker Android\n- Productivity mobile application for building positive habits\n- Lets users create habits, track completion, view streaks, and analyze consistency over time\n- Stack: Android, Java/Kotlin, SQLite, Material UI Components\n- Focus: daily routines, progress analysis, and self-improvement\n\nUse: more Flixora.txt\nUse: more HabitTrackerAndroid.txt",
            "~/projects/Flixora.txt": "Flixora\n\nOverview:\nFlixora is a cross-platform streaming companion application that lets users explore anime, movies, web series, and manga by using integrated external APIs inside one unified experience.\n\nProject Breakdown:\n- Type: Cross-platform streaming companion app\n- Languages: JavaScript, HTML, CSS\n- Stack: Android, React\n- Uses: external content APIs, cross-platform UI flow, content browsing and streaming navigation\n\nBuild Notes:\n- Focused on usability, content discovery, and a product feel\n- Built as a cleaner streaming companion rather than a basic media listing interface\n- Created with a product-style experience focused on navigation flow and watch experience.",
            "~/projects/HabitTrackerAndroid.txt": "Habit Tracker Android\n\nOverview:\nHabit Tracker Android is a productivity mobile application designed to help users build positive habits and maintain consistency in their daily routines. The app allows users to create habits, track progress, and analyze performance over time.\n\nFeatures:\n- Create new habits\n- Define habit description or goal\n- Set habit frequency as daily or weekly\n- Mark habits as completed\n- Maintain a history of completed habits\n- Track consistency over time\n- View all tracked habits\n- Analyze performance for each habit\n- Check habit logs and completion dates\n- Identify longest streaks\n- Display current streak and longest streak\n\nTech Stack:\n- Android (Java/Kotlin)\n- SQLite / Local Storage\n- Android Studio\n- Material UI Components\n\nPurpose:\nHelps users monitor daily activities, measure progress, and improve consistency through structured habit tracking.",
            "~/contact/instagram.txt": "Instagram: https://www.instagram.com/adhitya.valmiki",
            "~/contact/telegram.txt": "Telegram: https://t.me/Adhityavalmiki",
            "~/contact/github.txt": "GitHub: https://github.com/adhityavalmiki"
        };

        const baseCommands = ["help", "clear", "reset", "pwd", "ls", "ll", "cd", "cat", "more", "tree", "history", "whoami", "date", "neofetch", "open", "man", "find", "status", "home", "about", "projects", "contact", "github"];

        const manPages = {
            ls: "ls - list directory contents",
            cd: "cd [dir] - change the current directory",
            cat: "cat [file] - print file contents",
            more: "more [file] - print file contents page by page",
            tree: "tree [dir] - print directory structure",
            open: "open [home|about|projects|contact|github] - open a route",
            status: "status - show shell status information",
            find: "find [term] - search portfolio files and directories"
        };

        function parseArgs(input) {
            const matches = input.match(/"[^"]*"|'[^']*'|\S+/g) || [];
            return matches.map(function (part) {
                return part.replace(/^['"]|['"]$/g, "");
            });
        }

        function currentPrompt() {
            return shellState.user + "@" + shellState.host + ":" + shellState.cwd + "#";
        }

        function updatePrompt() {
            const promptText = currentPrompt();
            terminalPrompt.textContent = promptText;
            terminalWindowTitle.textContent = promptText;
        }

        function normalizePath(inputPath) {
            if (!inputPath || inputPath === "~") {
                return "~";
            }

            if (inputPath === "/") {
                return "~";
            }

            if (inputPath.startsWith("/")) {
                return "~/" + inputPath.replace(/^\/+|\/+$/g, "");
            }

            const parts = shellState.cwd === "~" ? [] : shellState.cwd.replace(/^~\//, "").split("/");
            inputPath.split("/").forEach(function (part) {
                if (!part || part === ".") {
                    return;
                }

                if (part === "..") {
                    parts.pop();
                    return;
                }

                parts.push(part);
            });

            return parts.length ? "~/" + parts.join("/") : "~";
        }

        function pathDisplay(path) {
            return path === "~" ? "/" : "/" + path.replace(/^~\//, "");
        }

        function parentPath(path) {
            if (path === "~") {
                return null;
            }
            const parts = path.replace(/^~\//, "").split("/");
            parts.pop();
            return parts.length ? "~/" + parts.join("/") : "~";
        }

        function resolveEntry(inputPath) {
            const path = normalizePath(inputPath);
            if (directories[path]) {
                return { path: path, type: "dir" };
            }
            if (Object.prototype.hasOwnProperty.call(files, path)) {
                return { path: path, type: "file" };
            }
            return null;
        }

        function listDirectory(path) {
            const known = new Set(directories[path] || []);
            const prefix = path === "~" ? "~/" : path + "/";

            Object.keys(directories).forEach(function (entryPath) {
                if (entryPath.startsWith(prefix)) {
                    const rest = entryPath.slice(prefix.length);
                    if (rest && !rest.includes("/")) {
                        known.add(rest);
                    }
                }
            });

            Object.keys(files).forEach(function (entryPath) {
                if (entryPath.startsWith(prefix)) {
                    const rest = entryPath.slice(prefix.length);
                    if (rest && !rest.includes("/")) {
                        known.add(rest);
                    }
                }
            });

            return Array.from(known).sort(function (a, b) {
                return a.localeCompare(b);
            });
        }

        function addDir(path) {
            if (!directories[path]) {
                directories[path] = [];
            }
            const parent = parentPath(path);
            const name = path.split("/").pop();
            if (parent && directories[parent] && !directories[parent].includes(name)) {
                directories[parent].push(name);
            }
        }

        function addFile(path, content) {
            files[path] = content || "";
            const parent = parentPath(path);
            const name = path.split("/").pop();
            if (parent && directories[parent] && !directories[parent].includes(name)) {
                directories[parent].push(name);
            }
        }

        function removeEntry(path) {
            const parent = parentPath(path);
            const name = path.split("/").pop();

            if (directories[path]) {
                directories[path].slice().forEach(function (child) {
                    removeEntry(path === "~" ? "~/" + child : path + "/" + child);
                });
                delete directories[path];
            }

            if (Object.prototype.hasOwnProperty.call(files, path)) {
                delete files[path];
            }

            if (parent && directories[parent]) {
                directories[parent] = directories[parent].filter(function (entry) {
                    return entry !== name;
                });
            }
        }

        function renderLs(path, longFormat) {
            const entries = listDirectory(path);
            if (!longFormat) {
                return [entries.join("  ")];
            }

            return entries.map(function (entry) {
                const childPath = path === "~" ? "~/" + entry : path + "/" + entry;
                const kind = directories[childPath] ? "drwxr-xr-x" : "-rw-r--r--";
                return kind + "  root root  4096  " + entry;
            });
        }

        function renderTree(path, depth) {
            const entries = listDirectory(path);
            const lines = [];

            entries.forEach(function (entry, index) {
                const childPath = path === "~" ? "~/" + entry : path + "/" + entry;
                const pointer = index === entries.length - 1 ? "`-- " : "|-- ";
                lines.push((depth ? "|   ".repeat(depth - 1) : "") + pointer + entry);

                if (directories[childPath]) {
                    renderTree(childPath, depth + 1).forEach(function (line) {
                        lines.push(line);
                    });
                }
            });

            return lines;
        }

        function appendEntry(promptText, command, lines, variant) {
            const block = document.createElement("div");
            block.className = "terminal-block";

            const commandLine = document.createElement("p");
            commandLine.className = "terminal-line";
            commandLine.innerHTML = '<span class="prompt">' + promptText + "</span> " + command;
            block.appendChild(commandLine);

            lines.forEach(function (line) {
                const responseLine = document.createElement("p");
                responseLine.className = "terminal-response";

                if (variant) {
                    responseLine.classList.add("terminal-response--" + variant);
                }

                responseLine.textContent = line;
                block.appendChild(responseLine);
            });

            terminalHistory.insertBefore(block, terminalForm);
            terminalHistory.scrollTop = terminalHistory.scrollHeight;
            terminalInput.focus();
        }

        function runCommand(rawCommand) {
            const parts = parseArgs(rawCommand);
            const name = (parts[0] || "").toLowerCase();
            const args = parts.slice(1);

            if (name === "help") {
                return {
                    lines: [
                        "GNU bash, version 5.2.21(1)-release (x86_64-portfolio-linux)",
                        "help      show available commands",
                        "clear     clear terminal output",
                        "reset     clear output and reset shell to home",
                        "pwd       print current directory",
                        "ls        list directory contents",
                        "ll        list directory contents in long format",
                        "cd        change current directory",
                        "cat       print file contents",
                        "more      print large file content in pages",
                        "tree      show directory structure",
                        "history   show command history",
                        "whoami    print current user",
                        "date      show current date and time",
                        "neofetch  show system-style summary",
                        "open      open a website route or GitHub",
                        "man       show command manual text",
                        "find      search for files and directories",
                        "status    show shell state info",
                        "home      shortcut to open home page",
                        "about     shortcut to open about page",
                        "projects  shortcut to open projects page",
                        "contact   shortcut to open contact page",
                        "github    shortcut to open GitHub page",
                        "exit      reset terminal session"
                    ]
                };
            }

            if (name === "clear") {
                Array.from(terminalHistory.querySelectorAll(".terminal-block")).forEach(function (block) {
                    block.remove();
                });
                return { lines: [] };
            }

            if (name === "reset") {
                Array.from(terminalHistory.querySelectorAll(".terminal-block")).forEach(function (block) {
                    block.remove();
                });
                shellState.cwd = "~";
                shellState.lastExitCode = 0;
                updatePrompt();
                return { lines: [] };
            }

            if (name === "pwd") {
                return { lines: [pathDisplay(shellState.cwd)] };
            }

            if (name === "status") {
                return {
                    lines: [
                        "user=" + shellState.user,
                        "host=" + shellState.host,
                        "cwd=" + pathDisplay(shellState.cwd),
                        "last_exit=" + shellState.lastExitCode
                    ]
                };
            }

            if (name === "ls" || name === "ll") {
                const target = args[0] ? resolveEntry(args[0]) : { path: shellState.cwd, type: "dir" };

                if (!target || target.type !== "dir") {
                    return { lines: ["ls: cannot access '" + (args[0] || shellState.cwd) + "': No such file or directory"], variant: "error" };
                }

                return { lines: renderLs(target.path, name === "ll") };
            }

            if (name === "cd") {
                const destination = args[0] || "~";
                const target = resolveEntry(destination);

                if (!target || target.type !== "dir") {
                    return { lines: ["cd: " + destination + ": No such file or directory"], variant: "error" };
                }

                shellState.cwd = target.path;
                updatePrompt();
                return { lines: [] };
            }

            if (name === "cat") {
                if (!args[0]) {
                    return { lines: ["cat: missing operand"], variant: "error" };
                }

                const target = resolveEntry(args[0]);

                if (!target || target.type !== "file") {
                    return { lines: ["cat: " + args[0] + ": No such file"], variant: "error" };
                }

                return { lines: [files[target.path]] };
            }

            if (name === "more") {
                if (!args[0]) {
                    return { lines: ["more: missing file operand"], variant: "error" };
                }

                const target = resolveEntry(args[0]);

                if (!target || target.type !== "file") {
                    return { lines: ["more: " + args[0] + ": No such file"], variant: "error" };
                }

                const rows = files[target.path].split("\n");
                const pageSize = 8;
                const output = [];

                for (let index = 0; index < rows.length; index += pageSize) {
                    output.push(rows.slice(index, index + pageSize).join("\n"));
                    if (index + pageSize < rows.length) {
                        output.push("--More--");
                    }
                }

                return { lines: output, variant: "muted" };
            }

            if (name === "tree") {
                const startPath = args[0] ? normalizePath(args[0]) : shellState.cwd;

                if (!directories[startPath]) {
                    return { lines: ["tree: " + (args[0] || pathDisplay(shellState.cwd)) + ": No such directory"], variant: "error" };
                }

                return { lines: [pathDisplay(startPath)].concat(renderTree(startPath, 1)) };
            }

            if (name === "find") {
                if (!args[0]) {
                    return { lines: ["find: missing search term"], variant: "error" };
                }

                const results = Object.keys(directories)
                    .concat(Object.keys(files))
                    .filter(function (entry) {
                        return entry.includes(args[0]);
                    })
                    .map(pathDisplay);

                return { lines: results.length ? results : [""] };
            }

            if (name === "history") {
                return {
                    lines: shellState.history.map(function (entry, index) {
                        return String(index + 1).padStart(4, " ") + "  " + entry;
                    })
                };
            }

            if (name === "whoami") {
                return { lines: [shellState.user] };
            }

            if (name === "date") {
                return { lines: [new Date().toString()] };
            }

            if (name === "neofetch") {
                return {
                    lines: [
                        "adhitya@portfolio",
                        "------------------",
                        "OS: Portfolio Linux 6.8.0",
                        "Host: adhitya-web-terminal",
                        "Shell: bash 5.2",
                        "Theme: Hacker UI Green",
                        "Projects: Flixora, Habit Tracker Android"
                    ]
                };
            }

            if (name === "open") {
                const route = (args[0] || "").toLowerCase();
                const routes = {
                    home: "/",
                    about: "/about/",
                    projects: "/projects/",
                    contact: "/Contact/",
                    github: "https://github.com/adhityavalmiki"
                };

                if (!routes[route]) {
                    return { lines: ["open: unsupported target"], variant: "error" };
                }

                window.location.href = routes[route];
                return { lines: ["Opening " + route + "..."], variant: "muted" };
            }

            if (["home", "about", "projects", "contact", "github"].includes(name)) {
                return runCommand("open " + name);
            }

            if (name === "man") {
                const topic = args[0];

                if (!topic) {
                    return { lines: ["What manual page do you want?"], variant: "error" };
                }

                if (!manPages[topic]) {
                    return { lines: ["No manual entry for " + topic], variant: "error" };
                }

                return { lines: [manPages[topic]] };
            }

            if (name === "exit") {
                shellState.cwd = "~";
                updatePrompt();
                return { lines: ["Session reset to home directory."], variant: "muted" };
            }

            return { lines: [name + ": command not found"], variant: "error" };
        }

        function completeInput() {
            const raw = terminalInput.value;
            const tokens = raw.split(/\s+/);
            const lastToken = tokens[tokens.length - 1];

            if (tokens.length <= 1) {
                const matches = baseCommands.filter(function (command) {
                    return command.startsWith(lastToken || "");
                });

                if (matches.length === 1) {
                    terminalInput.value = matches[0] + " ";
                } else if (matches.length > 1) {
                    appendEntry(currentPrompt(), raw || "", [matches.join("  ")], "muted");
                }

                return;
            }

            const matches = listDirectory(shellState.cwd).filter(function (entry) {
                return entry.startsWith(lastToken || "");
            });

            if (matches.length === 1) {
                tokens[tokens.length - 1] = matches[0];
                terminalInput.value = tokens.join(" ") + " ";
            } else if (matches.length > 1) {
                appendEntry(currentPrompt(), raw, [matches.join("  ")], "muted");
            }
        }

        terminalInput.addEventListener("keydown", function (event) {
            if (event.key === "ArrowUp") {
                event.preventDefault();
                if (!shellState.history.length) {
                    return;
                }
                shellState.historyIndex = Math.max(0, shellState.historyIndex - 1);
                terminalInput.value = shellState.history[shellState.historyIndex];
            }

            if (event.key === "ArrowDown") {
                event.preventDefault();
                if (!shellState.history.length) {
                    return;
                }
                shellState.historyIndex = Math.min(shellState.history.length, shellState.historyIndex + 1);
                terminalInput.value = shellState.history[shellState.historyIndex] || "";
            }

            if (event.key === "Tab") {
                event.preventDefault();
                completeInput();
            }
        });

        terminalForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const rawCommand = terminalInput.value.trim();

            if (!rawCommand) {
                return;
            }

            shellState.history.push(rawCommand);
            shellState.historyIndex = shellState.history.length;
            terminalInput.value = "";

            const promptBeforeCommand = terminalPrompt.textContent;
            const result = runCommand(rawCommand);
            shellState.lastExitCode = result.variant === "error" ? 1 : 0;
            appendEntry(promptBeforeCommand, rawCommand, result.lines, result.variant);
        });

        terminalHistory.addEventListener("click", function () {
            terminalInput.focus();
        });

        updatePrompt();
    }
})();

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
        navLinks.classList.toggle("show");
    }
}
