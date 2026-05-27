/*should work for the modular design of the virtual laboratory*/
const sensorSchematics = {
    "pico-": "../media/info/picoschem.jpg",
    "uno": "../media/info/unoschem.jpg",
    "LM": "../media/info/LM35wire.jpg",
    "URM": "../media/info/URM09wire.jpg",
    "I2C": "../media/info/I2Cwire.jpg",
    "potentiometer": "../media/info/Sliderwire.jpg",
    "hall": "../media/info/Hallwire.jpg",
    "GP2Y0A41SK0F" : "../media/info/GPwire.jpg"

};


function findSensorInfo() {
    if (!window.selectedSensor) {
        printOnConsole("⚠️ Najprv vyberte senzor.");
        return;
    }

    const sensorId = window.selectedSensor.id.replace(/[-_]*[0-9]+$/, '');

    let topic = null;

    if (sensorId.startsWith("LM35")) {
        topic = "LM35";
    } else if (sensorId.startsWith("URM09")) {
        topic = "URM09";
    } else if (sensorId.startsWith("I2C")) {
        topic = "I2C";
    } else if (sensorId.startsWith("GP2Y0A41SK0F")) {
        topic = "GP2Y0A41SK0F";
    } else if (sensorId.startsWith("potentiometer")) {
        topic = "potentiometer";
    } else if (sensorId.startsWith("hall")) {
        topic = "hall";
    }

    if (!topic) {
        printOnConsole("Pre tento komponent nie je dostupná teória.");
        return;
    }

    window.location.href = `../materials/materials.html?topic=${topic}`;
}

function closeInfoPanel() {
    let panel = document.getElementById("information-panel");
    panel.style.display = "none";
    let buttons = document.getElementById("info-buttons");
    buttons.style.display = "none";
}

/* Function that open the picture for the specific sensor*/
function openImage() {
    if (!window.selectedSensor) {
        printOnConsole("Najprv vyberte komponent.");
        return;
    }

    const type = window.selectedSensor.dataset.type;
    const path = sensorSchematics[type];

    if (!path) {
        printOnConsole("Pre tento komponent nie je dostupná schéma zapojenia.");
        return;
    }

    document.getElementById("schematic-image").src = path;
    document.getElementById("image-viewer").style.display = "flex";

    closeInfoPanel();
}

/*Image manipulation logic*/
let scale = 1;
let translateX = 0;
let translateY = 0;

const img = document.getElementById("schematic-image");
const viewer = document.getElementById("image-viewer");

/*zoom in and out logic*/
viewer.addEventListener("wheel", (event) => {
    event.preventDefault();
    /*to make the zoom smooth you should multiply deltaY to -0.001 since deltaY is a very big number*/
    scale += event.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale), 5);
    updateTransform()
})

let isDragging = false;
let startX, startY;
/*dragging logic for the image*/
/*clientY and clientX is the current mouse position in the browser */
/*translateX or Y is how far the image has been already moved*/
img.addEventListener("mousedown", (event) => {
    img.style.cursor = "grabbing"
    isDragging = true;
    startX = event.clientX - translateX;
    startY = event.clientY - translateY;
})

window.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    translateX = event.clientX - startX;
    translateY = event.clientY - startY;
    updateTransform()
})

window.addEventListener("mouseup", (event) => {
    isDragging = false;
    img.style.cursor = "grab"
})

viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
        viewer.style.display = "none";
        resetImage()
    }
})

/*this function serves for zooming */
function updateTransform() {
    img.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

function resetImage() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    img.style.transform = "translate(0px, 0px) scale(1)";
}