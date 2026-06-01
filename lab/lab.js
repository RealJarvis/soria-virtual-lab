let counter = 0
// sensor the user clicked on
let connectingFrom = null;         // first sensor selected for wire
let wires = [];                    // stores all drawn wires
let tutorialState = false
let simulationActive = false;

let poweredBoards = {};
// variable serve to save the position where users clicked on the sensor
let offsetX = 0;
let offsetY = 0;


function selectComponent(card) {
    document.querySelectorAll('.component-card').forEach(c => {
        c.classList.remove('active');
    });

    card.classList.add('active');
    document.getElementById('sensor-select').value = card.dataset.value;
}

function adjustScroll(btn) {
    // getting the tabs
   const buttons = document.querySelectorAll('#sensorscroller-buttons .tab');
   // getting the image
   const cards = document.querySelectorAll('#component-scroller .component-card');

    buttons.forEach(b => {
        if (b === btn) {
            b.classList.add('active');
            b.classList.remove('disabled');
        } else {
            b.classList.remove('active');
            b.classList.add('disabled');
        }
    });

    const type = btn.dataset.type;

    cards.forEach(card => {
        if (type === "everything") {
            card.style.display = 'flex';
        }else if (type === "sensors") {
            card.style.display = card.classList.contains("snimace") ? 'flex' : 'none';
        }else if (type === "objects") {
            card.style.display = card.classList.contains("objekty") ? 'flex' : 'none';
        }else if (type === "microcontoller") {
            card.style.display = card.classList.contains("doska") ? 'flex' : 'none';
        }
    })
}

// declaring the global variable for the clicked sensor
window.selectedSensor = null;
function tutorialSwitch() {
    const toolbarbtn = document.querySelector(".toolbarbtn")
    const image = toolbarbtn?.querySelector("img");
    if (toolbarbtn.id === "ON"){
        toolbarbtn.id = "OFF";
        tutorialState = false;

    }else {
        toolbarbtn.id = "ON";
        tutorialState = true;


        const overlay = document.getElementById("tutorial-overlay");
        const title = document.getElementById("tutorial-title");
        const text = document.getElementById("tutorial-text");

        title.textContent = "Návod pre Soriu";
        text.textContent = "Teraz môžete kliknúť na ľubovoľný senzor a zobrazí sa vám vysvetlenie, ako ho pripojiť alebo používať. Ak chcete návod vypnúť, znova kliknite na žiarovku.";
        overlay.style.display = "flex";
    }


}
// pop up message which serves as a guid for the lab
function activateAssitant(element) {
    if (!tutorialState) return;

    const overlay = document.getElementById("tutorial-overlay");
    const title = document.getElementById("tutorial-title");
    const text = document.getElementById("tutorial-text");

    title.textContent = "Návod";

    if (element === "pico-2") {
        text.textContent = "Vybrali ste si dosku Pico. Teraz pridajte senzor alebo pripojte už vložený senzor k doske.";
    } else if (element === "URM09") {
        text.textContent = "Pripojte URM09 k vývojové doske. Po správnom zapojení pridajte objekt, na ktorom budete testovať meranie vzdialenosti. Ak chcete zobraziť schému zapojenia senzora, umiestnite kurzor myši na senzor, kliknite pravým tlačidlom myši a v ponuke vyberte možnosť Schéma zapojenia.";
    } else if (element === "LM35") {
        text.textContent = "Pripojte LM35 k vývojové doske. Po správnom zapojení umiestnite heater blízko senzora a sledujte zmenu teploty. Ak chcete zobraziť schému zapojenia senzora, umiestnite kurzor myši na senzor, kliknite pravým tlačidlom myši a v ponuke vyberte možnosť Schéma zapojenia.";
    } else if (element === "I2C") {
        text.textContent = "Pripojte akcelerometer cez I2C k vývojové doske. Po správnom zapojení môžete pohybovať doskou a sledovať zmeny hodnôt. Ak chcete zobraziť schému zapojenia senzora, umiestnite kurzor myši na senzor, kliknite pravým tlačidlom myši a v ponuke vyberte možnosť Schéma zapojenia.";
    } else if (element === "GP2Y0A41SK0F") {
        text.textContent = "Pripojte senzor vzdialenosti k vývojové doske a otestujte jeho reakciu pomocou objektu umiestneného pred senzorom. Ak chcete zobraziť schému zapojenia senzora, umiestnite kurzor myši na senzor, kliknite pravým tlačidlom myši a v ponuke vyberte možnosť Schéma zapojenia.";
    } else if (element === "hall") {
        text.textContent = "Pripojte Hall senzor k vývojové doske a použite magnet na otestovanie reakcie senzora. Ak chcete zobraziť schému zapojenia senzora, umiestnite kurzor myši na senzor, kliknite pravým tlačidlom myši a v ponuke vyberte možnosť Schéma zapojenia.";
    } else {
        overlay.style.display = "none";
        return;
    }

    overlay.style.display = "flex";
}

const closeBtn = document.getElementById("tutorial-close");
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        document.getElementById("tutorial-overlay").style.display = "none";
    });
}

function addDeviceintoList(sensorId) {
    const deviceEl = document.querySelector(".devices-segment");
    const deviceElement = document.createElement("div");

    deviceElement.className = "device-item";
    deviceElement.id = "device-" + sensorId;
    deviceElement.innerHTML = `
        <div class="device-name">${sensorId}</div>
        <div class="device-meta"> Connected device</div>
    `;

    deviceEl.appendChild(deviceElement);

}

function removeDevicefromTab(deviceId) {
    const deviceElement = document.getElementById("device-" + deviceId);
    deviceElement.remove();
}

function addSensor() {

    // the variable bellow serves a purpose of keeping the sensor image and its pins in it
    let sensor_container = document.createElement("div");

    sensor_container.className = "sensor";
    let sensor_entity = document.createElement('img');


    sensor_entity.src = '../media/icon/' + document.getElementById('sensor-select').value + '.png';
    sensor_entity.alt = document.getElementById('sensor-select').value;
    /*creating a unique ID for each sensor, to be able to drag it later */

    let value = document.getElementById('sensor-select').value;



    let sensorId = value + counter;
    counter++;
    sensor_container.id = sensorId;
    sensor_entity.id = sensorId + "-img";

    addDeviceintoList(sensor_container.id);

    sensor_entity.title = "Click on the sensor to drag it around";
    /*adding the shadow for the sensors to make it appear more realistic*/

    if (document.getElementById('sensor-select').value === "uno")
    {
        sensor_entity.width = 250;
    }else if (document.getElementById('sensor-select').value === "potentiometer") {
        addPotentiometerControl(sensor_container);
        sensor_entity.width = 150;
    }else {
        sensor_entity.width = 120;
    }

    sensor_container.appendChild(sensor_entity);

    pinArrange(sensor_container, value);


    /*CUSTOM RIGHT-CLICK HANDLER*/
    const menu = document.getElementById("custom-menu");
    sensor_entity.addEventListener('contextmenu', (event) => {
        event.preventDefault();

        window.selectedSensor = sensor_container;
        menu.style.top = event.pageY + "px";
        menu.style.left = event.pageX + "px";
        menu.style.display = "block";
    })

    document.addEventListener('click', (event) => {
        /*hiding the menu when clicked anywhere*/
        menu.style.display = "none";
    })

    document.getElementById('lab-area').appendChild(sensor_container);

    activateAssitant(document.getElementById('sensor-select').value);

}


/*function for the custom menu that deletes the sensor*/
function deleteSensor() {
    console.log(poweredBoards)
    if (selectedSensor) {
        wires = wires.filter(w => {
            const sensor1 = w.pin1.closest(".sensor");
            const sensor2 = w.pin2.closest(".sensor");

            if (sensor1 === selectedSensor || sensor2 === selectedSensor) {
                const connectedSensor = sensor1 === selectedSensor ? sensor2 : sensor1;

                console.log("Deleted sensor:", selectedSensor.id);
                console.log("Connected sensor:", connectedSensor?.id);
                if (selectedSensor.id.startsWith("power")) {
                    delete poweredBoards[connectedSensor.id];

                }

                w.line.remove();
                return false;
            }
            return true;
        });

        console.log(poweredBoards)
        removeDevicefromTab(selectedSensor.id);
        selectedSensor.remove();
        window.selectedSensor = null;
    }
}


/*here is the code that ensures that a user can drag the sensor entities across the lab*/
let lab = document.getElementById('lab-area');


let draggedEl = null;

document.addEventListener("mousedown", (e) => {
    const clickedPin = e.target.closest(".pin");

    if (clickedPin) return; //  prevent drag when clicking pin
    // container element
    const clickedSensor = e.target.closest(".sensor");


    // ordinary clicking logic
    if (clickedSensor) {
        draggedEl = clickedSensor;

        const rect = draggedEl.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        draggedEl.style.cursor = "grabbing";
        document.body.style.cursor = "grabbing";

        // prevents the browser’s built-in “drag-image” behavior (the ghost copy).
        /*          On a link (<a>) → stops navigation.
                    On a form submit → stops the page reload.*/
        e.preventDefault();
    }
});

document.addEventListener("mouseup", () => {
    if (!draggedEl) return;
    draggedEl.style.cursor = "grab";
    document.body.style.cursor = "default";
    draggedEl = null;

})

document.addEventListener("mousemove", (e) => {


    if (!draggedEl) return;
    let rect = lab.getBoundingClientRect(); // lab area

    // calculating the boundaries where I want to move the in
    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;

    // movement boundries
    draggedEl.style.left = Math.max(0, Math.min(x, rect.width - draggedEl.offsetWidth)) + "px";
    draggedEl.style.top = Math.max(0, Math.min(y, rect.height - draggedEl.offsetHeight)) + "px";
    wires.forEach(w => w.updateLine());

})

/*Function used to switch through coding and environmental settings */
function switchMenu(btn) {
    const buttons = document.querySelectorAll('#interface-buttons .tab');

    buttons.forEach(b => {
        b.classList.remove('active');
        b.classList.add('disabled');
    });

    btn.classList.add('active');
    btn.classList.remove('disabled');

    document.querySelectorAll('.settings-segment').forEach(el => {
        el.style.display = "none";
    });

    document.querySelectorAll('.code-segment').forEach(el => {
        el.style.display = "none";
    });

    if (btn.dataset.type === "settings") {
        document.querySelectorAll('.settings-segment').forEach(el => {
            el.style.display = "flex";
        });
    }

    else if (btn.dataset.type === "code") {
        document.querySelectorAll('.code-segment').forEach(el => {
            el.style.display = "flex";
        });

        const input = document.getElementById("console-input");
        if (input) input.focus();
    }
}

function getConnectedBoard(sensor1, sensor2) {
    if (sensor1.id.startsWith("pico-2")) return sensor1;
    if (sensor2.id.startsWith("pico-2")) return sensor2;
    if (sensor1.id.startsWith("uno")) return sensor1;
    if (sensor2.id.startsWith("uno")) return sensor2;
    return null;
}

function switchMode(btn) {
    const buttons = document.querySelectorAll('.controller-tab');

    buttons.forEach(b => {
        // if it's the same button, we make it active
        if (b === btn ) {
            // if the button's data is the code then disable it
            if (b.dataset.type === "play") {
                simulationActive = true;
                wires.forEach(w => {
                    const sensor1 = w.pin1.closest(".sensor");
                    const sensor2 = w.pin2.closest(".sensor");
                    const board = getConnectedBoard(sensor1, sensor2);

                    if (board) {
                        if (board.id.startsWith("pico-2")) {
                            handleSimulationPICO(sensor1, sensor2);
                        } else if (board.id.startsWith("uno")) {
                            handleSimulationUNO(sensor1, sensor2);
                        }
                    }
                });
            }// if the button's data is the settings then enable it
            else {
                document.querySelectorAll(".sensor").forEach(sensor => {
                    stopSimulation(sensor.id);
                });
            }
            b.classList.add('active');
            b.classList.remove('disabled');
        }else {

            // if it's the other button, then remove active and disable
            b.classList.remove('active');
            b.classList.add('disabled');
        }
    })
}

function setControllerState(playActive) {
    const playBtn = document.querySelector('.controller-tab[data-type="play"]');
    const stopBtn = document.querySelector('.controller-tab[data-type="stop"]');

    if (playActive) {

        playBtn.classList.add('active');
        playBtn.classList.remove('disabled');

        stopBtn.classList.remove('active');
        stopBtn.classList.add('disabled');
    } else {
        stopBtn.classList.add('active');
        stopBtn.classList.remove('disabled');

        playBtn.classList.remove('active');
        playBtn.classList.add('disabled');
    }
}

function isBoardPowered(board) {
    return poweredBoards[board.id] === true;
}

function updatePowerConnection(sensor1, sensor2) {
    const isPowerbankToPico =
        (sensor1.id.startsWith("powersupply") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("powersupply") && sensor1.id.startsWith("pico-2"));

    const isPowerbankToUno =
        (sensor1.id.startsWith("powersupply") && sensor2.id.startsWith("uno")) ||
        (sensor2.id.startsWith("powersupply") && sensor1.id.startsWith("uno"));

    if (!isPowerbankToPico && !isPowerbankToUno) return;

    const powerbank = sensor1.id.startsWith("powersupply") ? sensor1 : sensor2;
    const board = powerbank === sensor1 ? sensor2 : sensor1;

    const powerUsb = getPin(powerbank, "USB");
    const boardUsb = getPin(board, "USB");

    if (isConnected(powerUsb, boardUsb)) {
        poweredBoards[board.id] = true;
        printOnConsole(`✅ ${board.id} powered by powerbank`);
    } else {
        poweredBoards[board.id] = false;
        printOnConsole(`⚠️ ${board.id} is not powered`);
    }
}

/*NOTE----------------------------------------------------------------------------------Logic for the wires is here*/


// current segemnt of the code is used to connect specific pins
document.getElementById("lab-area").addEventListener("click", (e) => {
    // using event delegation to attach the work of a parent to a child which is the pin class
    const pin = e.target.closest(".pin");
    if (!pin) {
        if (connectingFrom) {
            connectingFrom.style.outline = "none";
            connectingFrom = null;
            document.body.style.cursor = "default";
        }
        return;
    }


    const sensor = pin.closest(".sensor");

    if (connectingFrom && connectingFrom !== pin) {

        if (isPinUsed(connectingFrom) || isPinUsed(pin)) {
            printOnConsole("❗This pin is already connected");
            connectingFrom.style.outline = "none";
            connectingFrom = null;
            document.body.style.cursor = "default";
            return;
        }
        createWire(connectingFrom, pin);

        const sensor1 = connectingFrom.closest(".sensor");
        const sensor2 = pin.closest(".sensor");
        updatePowerConnection(sensor1, sensor2);

        const board = getConnectedBoard(sensor1, sensor2);

        if (board) {
            if (board.id.startsWith("pico-2")) {
                handleSimulationPICO(sensor1, sensor2);
            } else if (board.id.startsWith("uno")) {
                handleSimulationUNO(sensor1, sensor2);
            }
        }

        connectingFrom.style.outline = "none";
        connectingFrom = null;
        document.body.style.cursor = "default";


    } else {
        connectingFrom = pin;
        document.body.style.cursor = "crosshair";
    }

    console.log("clicked pin", pin.dataset.pin);

});

function getPinCenter(pin) {
    //Get the sensor position on the screen
    const r = pin.getBoundingClientRect();
    //Get the lab area position on the screen
    const lab = document.getElementById("lab-area").getBoundingClientRect();
    return {
        x: r.left - lab.left + r.width / 2,
        y: r.top - lab.top + r.height / 2
    };
}

function createWire(pin1, pin2) {
    let isWiringWrong = pinControler(pin1, pin2);

    sensorBreaker(isWiringWrong);

    const wireLayer = document.getElementById('wire-layer');

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    /*setting attributes for the SVG*/
    if (pin1.dataset.pin === "GND" && pin2.dataset.pin === "GND") {
        line.setAttribute('stroke', "#ff0000");
    }else if(pin1.dataset.pin === "VCC" && pin2.dataset.pin === "3V3" ||
        pin1.dataset.pin === "3V3" && pin2.dataset.pin === "VCC") {
        line.setAttribute('stroke', "#11e004");
    }else if(pin1.dataset.pin === "VCC" && pin2.dataset.pin === "5V" ||
        pin1.dataset.pin === "5V" && pin2.dataset.pin === "VCC") {
        line.setAttribute('stroke', "#11e004");
    }
    else if(pin1.dataset.pin === "USB" && pin2.dataset.pin === "USB") {
        line.setAttribute('stroke', "#03efda");
        line.setAttribute('stroke-width', "17");
    }
    else {
        line.setAttribute('stroke', "#f5f5f5");
    }

    line.setAttribute('stroke-width', '3')
    line.setAttribute('fill', 'none');

    wireLayer.appendChild(line);

    function updateLine() {
        const p1 = getPinCenter(pin1);
        const p2 = getPinCenter(pin2);

        // midpoint X (horizontal first, then vertical)
        const midX = (p1.x + p2.x) / 2;

        const points = [
            `${p1.x},${p1.y}`,
            `${midX},${p1.y}`,
            `${midX},${p2.y}`,
            `${p2.x},${p2.y}`
        ].join(" ");

        line.setAttribute('points', points);
    }

    updateLine(); // draw now

    wires.push({ line, pin1, pin2, updateLine });


    // return update function so dragging can trigger it
    return updateLine;
}

function sensorBreaker (stateofSensor) {

}

function resetSettings() {
    document.querySelectorAll("#lab-area .sensor").forEach(sensor => {
        sensor.remove();
    });

    wires.forEach(w => {
        if (w.line) w.line.remove();
    });

    document.querySelectorAll(".devices-segment .device-item").forEach(device => {
        device.remove();
    });

    const logSegment = document.getElementById("state-of");
    if (logSegment) {
        logSegment.innerHTML = "";
    }

    runningSimulations = {};
    wires = [];
    connectingFrom = null;
    draggedEl = null;
    poweredBoards = {};
    window.selectedSensor = null;

    // clearing the measurement storage for another experiment
    experimentMeasurements = [];
    experimentLogs = [];
}

// function that collects the experiment data
function collectExperimentData() {
    return {
        id: Date.now(),
        date: new Date().toISOString(),

        devices: Array.from(document.querySelectorAll("#lab-area .sensor")).map(sensor => ({
            id: sensor.id,
            type: sensor.dataset.type,
            damaged: sensor.dataset.damaged === "true"
        })),

        connections: wires.map(w => ({
            fromDevice: w.pin1.closest(".sensor").id,
            fromPin: w.pin1.dataset.pin,
            toDevice: w.pin2.closest(".sensor").id,
            toPin: w.pin2.dataset.pin
        })),

        poweredBoards: poweredBoards,
        simulationActive: simulationActive,

        measurements: experimentMeasurements || [],
        logs: experimentLogs || []
    };
}

function saveExperimentToLocalStorage() {
    const experiment = collectExperimentData();

    const savedExperiments =
        JSON.parse(localStorage.getItem("soriaExperiments")) || [];

    savedExperiments.push(experiment);

    localStorage.setItem("soriaExperiments", JSON.stringify(savedExperiments));

    printOnConsole("✅ Experiment bol uložený do lokálneho úložiska.");

    return experiment;
}

// function that exports the file with the experiment data
function exportExperiment() {
    const experiment = saveExperimentToLocalStorage();

    const jsonData = JSON.stringify(experiment, null, 2);

    const blob = new Blob([jsonData], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `soria-experiment-${experiment.id}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    printOnConsole("⬇️ Experiment bol exportovaný ako JSON súbor.");
}

const saveExperimentBtn = document.getElementById("save-experiment-btn");

if (saveExperimentBtn) {
    saveExperimentBtn.addEventListener("click", () => {
        if (document.querySelectorAll("#lab-area .sensor").length === 0) {
            printOnConsole("⚠️ Nie je čo uložiť. Laboratórium je prázdne.");
            return;
        }

        exportExperiment();
    });
}



