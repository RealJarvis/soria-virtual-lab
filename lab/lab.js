let counter = 0
// sensor the user clicked on
let connectingFrom = null;         // first sensor selected for wire
let wires = [];                    // stores all drawn wires


let selectedSensor = null;

function addSensor() {

    let sensor_entity = document.createElement('img');
    sensor_entity.src = '../media/' + document.getElementById('sensor-select').value + '.png';
    sensor_entity.alt = document.getElementById('sensor-select').value;
    /*creating a unique ID for each sensor, to be able to drag it later */
    sensor_entity.id = document.getElementById('sensor-select').value + counter;
    sensor_entity.title = "Click on the sensor to drag it around";
    if (document.getElementById('sensor-select').value === "pico-2") {
        sensor_entity.width = 160;
    }else {
        sensor_entity.width = 160;
    }


    /*CUSTOM RIGHT-CLICK HANDLER*/
    const menu = document.getElementById("custom-menu");
    sensor_entity.addEventListener('contextmenu', (event) => {
        event.preventDefault();

        selectedSensor = event.target;
        menu.style.top = event.pageY + "px";
        menu.style.left = event.pageX + "px";
        menu.style.display = "block";
    })

    document.addEventListener('click', (event) => {
        /*hiding the menu when clicked anywhere*/
        menu.style.display = "none";
    })



    document.getElementById('lab-area').appendChild(sensor_entity);
}


/*function for the custom menu that deletes the sensor*/
function deleteSensor() {
    if (selectedSensor) {
        wires = wires.filter(w => {
            // if the wire is connected to the sensor we're deleting,
            if (w.sensor1 === selectedSensor || w.sensor2 === selectedSensor) {
                // we delete the wire as well
                w.line.remove();

                return false;       // remove from array
            }
            return true;       // remove from array
        })
        stopSimulation(selectedSensor.id);
        selectedSensor.remove(); /*<-- removes the sensor from the virtual lab*/
        selectedSensor = null;
    }
}


/*here is the code that ensures that a user can drag the sensor entities across the lab*/
let lab = document.getElementById('lab-area');


let draggedEl = null;

document.addEventListener("mousedown", (e) => {

    // updated click logic when a user connect two sensors
    if (connectingFrom && e.target.tagName === "IMG") {
        if(connectingFrom !== e.target) {
            createWire(connectingFrom, e.target);
            document.body.style.cursor = "default";
            const console = document.getElementById("state-of")
            let connecttxt = document.createElement("p");
            connecttxt.innerText = `/> ${connectingFrom.id} has been connected to ${e.target.id}`;
            console.appendChild(connecttxt);
            /*autoscroll*/

            /* TODO simulating the temperature reading*/

            // URM09 + Pico detection
            if (
                (connectingFrom.id.startsWith("URM090") && e.target.id.startsWith("pico-20")) ||
                (e.target.id.startsWith("URM090") && connectingFrom.id.startsWith("pico-20"))
            ){
                startURM09Simulation("URM090");
            }
            // LM35 temperature sensor detection + Pico detection
            if (
                (connectingFrom.id.startsWith("LM350") && e.target.id.startsWith("pico-20")) ||
                (e.target.id.startsWith("LM350") && connectingFrom.id.startsWith("pico-20"))
            ){
                startTemperatureSensor("LM350");
            }
            // LM35 temperature sensor detection + Pico detection
            if (
                (connectingFrom.id.startsWith("I2C0") && e.target.id.startsWith("pico-20")) ||
                (e.target.id.startsWith("I2C0") && connectingFrom.id.startsWith("pico-20"))
            ){
                startI2CSensor("I2C0");
            }


            console.scrollTop = console.scrollHeight;

        }
        connectingFrom.style.outline = "none";
        connectingFrom = null;
        return;
    }



    // ordinary clicking logic
    if (e.target.tagName === "IMG") {
        draggedEl = e.target;
        draggedEl.style.cursor = "grabbing";
        document.body.style.cursor = "grabbing";

        // prevents the browser’s built-in “drag-image” behavior (the ghost copy).
        /*          On a link (<a>) → stops navigation.
                    On a form submit → stops the page reload.*/
        e.preventDefault();
    }
});

document.addEventListener("mouseup", () => {
    draggedEl.style.cursor = "grab";
    document.body.style.cursor = "default";

    draggedEl = null;

})

document.addEventListener("mousemove", (e) => {


    if (!draggedEl) return;
    let rect = lab.getBoundingClientRect(); // lab area

    // calculating the boundaries where I want to move the in
    let x = e.clientX - rect.left - draggedEl.width / 2;
    let y = e.clientY - rect.top - draggedEl.height / 2;

    draggedEl.style.left = Math.max(0, Math.min(x, rect.width - draggedEl.width / 2)) + "px";
    draggedEl.style.top = Math.max(0, Math.min(y, rect.height - draggedEl.height / 2)) + "px";

})

/*Function used to switch through coding and environmental settings */
function switchMenu(btn) {
   const buttons = document.querySelectorAll('.icon-btn');

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



/*NOTE----------------------------------------------------------------------------------Logic for the wires is here*/

function startConnection() {
    if (!selectedSensor) return;

    // assigning the selectedSensor to the one which has the main connection
    connectingFrom = selectedSensor;
    document.body.style.cursor = "crosshair";
    // visual feedback of the chose sensor
    selectedSensor.style.outline = "2px dashed white";
}

function getCenter(el) {
    //Get the sensor position on the screen
    const r = el.getBoundingClientRect();
    //Get the lab area position on the screen
    const lab = document.getElementById("lab-area").getBoundingClientRect();
    return {
        x: r.left - lab.left + r.width / 2,
        y: r.top - lab.top + r.height / 2
    };
}

function createWire(sensor1, sensor2) {

    const wireLayer = document.getElementById('wire-layer');

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    /*setting attributes for the SVG*/
    line.setAttribute('stroke', "#2fff00");
    line.setAttribute('stroke-width', '3')
    line.setAttribute('stroke-linecap', 'round');

    wireLayer.appendChild(line);

    function updateLine() {
        const p1 = getCenter(sensor1);
        const p2 = getCenter(sensor2);
        line.setAttribute('x1', p1.x);
        line.setAttribute('y1', p1.y);
        line.setAttribute('x2', p2.x);
        line.setAttribute('y2', p2.y);
    }

    updateLine(); // draw now

    wires.push({ line, sensor1, sensor2, updateLine });


    // return update function so dragging can trigger it
    return updateLine;
}


function findSensorInfo() {
    window.location.href = "../materials/materials.html"
}

