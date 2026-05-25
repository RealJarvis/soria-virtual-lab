const consoleOutput = document.getElementById("console-output");
const consoleInput = document.getElementById("console-input");

function writeConsole(text) {
    const line = document.createElement("p");
    line.textContent = "/> " + text;
    consoleOutput.appendChild(line);

    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

consoleInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        const command = consoleInput.value.trim();
        consoleInput.value = "";

        writeConsole(command);
        handleCommand(command);
    }
});

function handleCommand(command) {
    if (command === "help") {
        writeConsole("Available commands:");
        writeConsole("check   - list device image IDs");
        writeConsole("devices - list devices");
        writeConsole("wires   - list connections");
        writeConsole("power   - show powered boards");
        writeConsole("clear   - clear console");
        writeConsole("help    - show commands");
    }

    else if (command === "check") {
        document.querySelectorAll("#lab-area img").forEach(img => {
            writeConsole(img.id);
        });
    }

    else if (command === "devices") {
        document.querySelectorAll("#lab-area .sensor").forEach(sensor => {
            writeConsole(`${sensor.id} | type: ${sensor.dataset.type || "unknown"}`);
        });
    }

    else if (command === "wires") {
        if (wires.length === 0) {
            writeConsole("No wires connected");
            return;
        }

        wires.forEach(w => {
            const fromDevice = w.pin1.closest(".sensor").id;
            const toDevice = w.pin2.closest(".sensor").id;

            writeConsole(`${fromDevice}.${w.pin1.dataset.pin} -> ${toDevice}.${w.pin2.dataset.pin}`);
        });
    }

    else if (command === "power") {
        writeConsole(JSON.stringify(poweredBoards));
    }

    else if (command === "clear") {
        consoleOutput.innerHTML = "";
    }

    else if (command !== "") {
        writeConsole("Unidentified command");
    }
}