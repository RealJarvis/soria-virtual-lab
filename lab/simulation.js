
// storage for the running simulation
let runningSimulations = {};


// function that prints the information on the console
function printOnConsole(text) {
    let console = document.getElementById('state-of')
    let consTxt = document.createElement("p");

    consTxt.textContent = "\> " + text;
    // adding the text into the console
    console.appendChild(consTxt);
    console.scrollTop = console.scrollHeight; // autoscroll
}


// measuring the distance between the ultrasonic device and the object
function getForwardDistance(sensor, object){

    const s = sensor.getBoundingClientRect();
    const o = object.getBoundingClientRect();

    const sensorX = s.left + s.width/2;
    const sensorBottom = s.top + s.height;   // bottom edge of sensor

    const objectX = o.left + o.width/2;
    const objectTop = o.top;                 // top edge of object

    //  Check if object is BELOW sensor
    if(objectTop <= sensorBottom) return null;

    // Check if object is roughly in front (cone width)
    const horizontalDiff = Math.abs(sensorX - objectX);

    if(horizontalDiff > 120) return null; // outside detection cone

    //  Vertical distance only
    const verticalDistancePx = objectTop - sensorBottom;

    return verticalDistancePx;
}

function stopSimulation(sensorId) {
    if (runningSimulations[sensorId]) {
        clearInterval(runningSimulations[sensorId]);
        delete runningSimulations[sensorId];
        printOnConsole(sensorId + ' has been disconnected');
    }
}

// converting pixels to cm
function pixelsToCm(px){
    return Math.round(px / 3);
}

function getHeaters(){
    return document.querySelectorAll('[id^="heater"]');
}


function startURM09Simulation(sensorId){

    if(runningSimulations[sensorId]) return; // prevent duplicates

    printOnConsole("URM09 simulation started");

    let intervalId = setInterval(()=>{

        const urm09 = document.querySelector('[id^="URM09"]');

        // code logic for stopping the sensor
        if (!urm09) {
            stopSimulation(sensorId);
            return;
        }

        const heaters = getHeaters();

        if(!urm09 || heaters.length === 0){
            printOnConsole("URM09: no object detected");
            return;
        }

        let minDistance = Infinity;

        heaters.forEach(heater=>{
            let px = getForwardDistance(urm09, heater);

            if(px !== null && px < minDistance){
                minDistance = px;
            }
        });

        if(minDistance === Infinity){
            printOnConsole("URM09: no object detected");
            return;
        }

        let cm = pixelsToCm(minDistance);


        printOnConsole("URM09 distance: " + cm + " cm");


    },2000);
    runningSimulations[sensorId] = intervalId;
}

/* TODO this is the code made for the temperature sensor  */

const ROOM_TEMP = 22;      // ambient temperature
const HEATER_POWER = 140;  // heat strength (tunable)
const HEAT_RANGE = 160;    // cm range of heater influence

// distance between centers of two objects (in pixels)
function getDistanceBetween(el1, el2){

    const lab = document.getElementById("lab-area").getBoundingClientRect();
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();

    // convert to LAB coordinates (not screen)
    const x1 = r1.left - lab.left + r1.width/2;
    const y1 = r1.top  - lab.top  + r1.height/2;

    const x2 = r2.left - lab.left + r2.width/2;
    const y2 = r2.top  - lab.top  + r2.height/2;

    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(dx*dx + dy*dy);
}




function getHeatFromHeater(sensor, heater){

    const pxDistance = getDistanceBetween(sensor, heater);
    const cm = pixelsToCm(pxDistance);

    // heater too far → no influence
    if(cm > HEAT_RANGE) return 0;

    // heat decreases with distance
    return HEATER_POWER / (cm + 5);
}

function calculateTemperature(sensor){

    const heaters = document.querySelectorAll('[id^="heater"]');

    let temp = ROOM_TEMP;

    heaters.forEach(heater=>{
        temp += getHeatFromHeater(sensor, heater);
    });

    // small natural fluctuation
    temp += (Math.random() - 0.5) * 0.6;

    return Math.round(temp);
}


function startTemperatureSensor(sensorId) {
    if(runningSimulations[sensorId]) return;

    printOnConsole(sensorId + " temperature sensor started");

    let intervalId = setInterval(()=>{

        const sensor = document.getElementById(sensorId);

        // stop if deleted
        if(!sensor){
            stopSimulation(sensorId);
            return;
        }

        const temperature = calculateTemperature(sensor);

        printOnConsole("Temperature: " + temperature + " °C");

    }, 2000);

    runningSimulations[sensorId] = intervalId;

}


/* TODO this is the code made for the I2C triple axis accelerometer  */

function getPicoTilt(){

    const pico = document.querySelector('[id^="pico"]');
    const lab  = document.getElementById("lab-area");

    if(!pico) return {x:0, y:0, z:9.8};

    const p = pico.getBoundingClientRect();
    const l = lab.getBoundingClientRect();

    // normalize position 0 → 1 inside lab
    let nx = (p.left - l.left) / l.width;
    let ny = (p.top  - l.top ) / l.height;

    // convert to acceleration range -9 → +9
    let ax = (nx - 0.5) * 18;
    let ay = (ny - 0.5) * 18;
    let az = 9.8 - Math.abs(ax)/2 - Math.abs(ay)/2;

    return {
        x: Math.round(ax*10)/10,
        y: Math.round(ay*10)/10,
        z: Math.round(az*10)/10
    };
}


function startI2CSensor(sensorId) {

    if(runningSimulations[sensorId]) return;

    printOnConsole(sensorId + " accelerometer started");

    let intervalId = setInterval(()=>{

        const sensor = document.getElementById(sensorId);
        if(!sensor){
            stopSimulation(sensorId);
            return;
        }

        const tilt = getPicoTilt();

        printOnConsole(
            `Accel X:${tilt.x}  Y:${tilt.y}  Z:${tilt.z} m/s²`
        );

    },2000);

    runningSimulations[sensorId] = intervalId;
}


/* TODO this is the code made for the GP2Y0A41SK0F distance light sensor  */

function getInfraredDistance(sensor, object){

    const s = sensor.getBoundingClientRect();
    const o = object.getBoundingClientRect();

    const sensorX = s.left + s.width/2;
    const sensorBottom = s.top + s.height;

    const objectX = o.left + o.width/2;
    const objectTop = o.top;

    // must be below sensor
    if(objectTop <= sensorBottom) return null;

    // VERY NARROW beam
    const horizontalDiff = Math.abs(sensorX - objectX);
    if(horizontalDiff > 40) return null;

    const verticalDistancePx = objectTop - sensorBottom;
    return pixelsToCm(verticalDistancePx);
}


function startDistanceSensor(sensorId) {

    if(runningSimulations[sensorId]) return;

    printOnConsole(sensorId + " IR sensor started");

    let intervalId = setInterval(()=>{

        const sensor = document.getElementById(sensorId);
        if(!sensor){
            stopSimulation(sensorId);
            return;
        }

        const heaters = document.querySelectorAll('[id^="heater"]');
        let minDistance = Infinity;

        heaters.forEach(h=>{
            let d = getInfraredDistance(sensor, h);
            if(d !== null && d < minDistance) minDistance = d;
        });

        if(minDistance === Infinity || minDistance > 30){
            printOnConsole("IR distance: Out of range");
            return;
        }

        if(minDistance < 4) minDistance = 4;

        printOnConsole("IR distance: " + Math.round(minDistance) + " cm");

    },2000);

    runningSimulations[sensorId] = intervalId;
}

/* TODO this is the code made for the GP2Y0A41SK0F distance light sensor  */

function isMagnetNear(sensor){

    const magnets = document.querySelectorAll('[id^="magnet"]');

    for (let magnet of magnets){
        const dist = getDistanceBetween(sensor, magnet);
        const cm = pixelsToCm(dist);

        if(cm < 30){   // 5 cm magnetic field range
            return true;
        }
    }

    return false;
}


function startHallSimulation(sensorId) {

    if(runningSimulations[sensorId]) return;

    printOnConsole(sensorId + " Hall sensor started");

    let intervalId = setInterval(()=>{

        const sensor = document.getElementById(sensorId);
        if(!sensor){
            stopSimulation(sensorId);
            return;
        }

        const detected = isMagnetNear(sensor);

        if(detected){
            printOnConsole("Magnet detected → HIGH");
        }else{
            printOnConsole("No magnet → LOW");
        }

    },2000);

    runningSimulations[sensorId] = intervalId;
}

