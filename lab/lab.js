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

// declaring the global variable for the clicked sensor
window.selectedSensor = null;
function tutorialSwitch() {
    const state = document.querySelector(".state")
    const image = state?.querySelector("img");
    if (state.id === "ON"){
        state.id = "OFF";
        tutorialState = false;
        image.src = "./../media/icon/tutoroff.png";
    }else {
        state.id = "ON";
        tutorialState = true;
        image.src = "./../media/icon/tutor.png";
    }


}
// pop up message which serves as a guid for the lab
function activateAssitant(element) {
    if (!tutorialState) return;
    // tutorial logic
    let popup = document.getElementById('tutorial-overlay');
    popup.style.display = "flex";
    let text = document.createElement("p");
    if (element === "pico-2") {
        text.innerText = "Vybrali ste si dosku Pico, teraz musíte pridať senzor alebo pripojiť senzor k Pico, ak ho máte."
    }else if (element === "URM09") {
        text.innerText = "Vyberte senzor, kliknite pravým tlačidlom myši a vyberte možnosť „Connect“, čím ho pripojíte k zariadeniu Pico. Keď všetko funguje, pridajte komponentný „Heating machine“ a umiestnite ho pod zariadenie, aby ste mohli merať vzdialenosť."
    }else if (element === "LM35") {
        text.innerText = "Vyberte senzor, kliknite pravým tlačidlom myši a vyberte možnosť „Connect“, čím ho pripojíte k zariadeniu Pico. Keď všetko funguje, pridajte komponent „Heating machine“ a umiestnite ho blízko senzora. Teplota stúpa, keď je vedľa senzora umiestnených viac ohrievačov."
    }else if (element === "I2C") {
        text.innerText = "Vyberte senzor, kliknite pravým tlačidlom myši a vyberte možnosť „Connect“, čím ho pripojíte k zariadeniu Pico. Keď všetko funguje, môžete dosku Pico presunúť a súradnice sa zmenia."
    }else if (element === "GP2Y0A41SK0F") {
        text.innerText = "Vyberte senzor, kliknite pravým tlačidlom myši a vyberte možnosť „Connect“, čím ho pripojíte k zariadeniu Pico. Keď všetko funguje, umiestnite „Heating machine“ pod senzor a otestujte, ako funguje."
    }else if (element === "hall") {
        text.innerText = "Vyberte senzor, kliknite pravým tlačidlom myši a vyberte možnosť „Connect“, čím ho pripojíte k zariadeniu Pico. Keď všetko funguje, umiestnite „Magnet“ blízko senzora, aby ste ho otestovali."
    }
    else {
        let popup = document.getElementById('tutorial-overlay');
        popup.innerHTML = '';
        popup.style.display = 'none';
    }
    popup.appendChild(text);
    let button = document.createElement("button");
    button.style.display = "flex";
    button.innerText = "Zatvoriť";
    button.addEventListener("click", (event) => {
        let popup = document.getElementById('tutorial-overlay');
        popup.innerHTML = '';
        popup.style.display = 'none';
    })
    popup.appendChild(button);
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

    sensor_entity.title = "Click on the sensor to drag it around";
    /*adding the shadow for the sensors to make it appear more realistic*/

    if (document.getElementById('sensor-select').value === "uno")
       {

        sensor_entity.width = 250;
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
   const buttons = document.querySelectorAll('.tab');

   buttons.forEach(b => {
       // if it's the same button, we make it active
       if (b === btn ) {
           // if the button's data is the code then disable it
           if (b.dataset.type === "code") {
               document.querySelectorAll('.settings-segment').forEach(element => {
                   element.style.display = "none";
               })
               // and enable the code segment
               document.querySelectorAll('.code-segment').forEach(element => {
                   element.style.display = "flex";
               })

           }// if the button's data is the settings then enable it
           else {
               document.querySelectorAll('.settings-segment').forEach(element => {
                   element.style.display = "flex";
               })
               // and enable the settings segment
               document.querySelectorAll('.code-segment').forEach(element => {
                   element.style.display = "none";
               })
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
                    handleSimulation(sensor1, sensor2);
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
        printOnConsole(`✔ ${board.id} powered by powerbank`);
    } else {
        poweredBoards[board.id] = false;
        printOnConsole(`⚠ ${board.id} is not powered`);
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

        handleSimulation(sensor1, sensor2);

        connectingFrom.style.outline = "none";
        connectingFrom = null;
        document.body.style.cursor = "default";


    } else {
        connectingFrom = pin;

        sensor.style.outline = "2px dashed white";
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
    pinControler(pin1, pin2);
    const wireLayer = document.getElementById('wire-layer');

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    /*setting attributes for the SVG*/
    if (pin1.dataset.pin === "GND" && pin2.dataset.pin === "GND") {
        line.setAttribute('stroke', "#ff0000");
    }else if(pin1.dataset.pin === "VCC" && pin2.dataset.pin === "3V3" ||
        pin1.dataset.pin === "3V3" && pin2.dataset.pin === "VCC") {
        line.setAttribute('stroke', "#11e004");
    }else {
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

function resetSettings() {
    let lab = document.getElementById("lab-area");
    lab.innerHTML = "";
}



