/*should work for the modular design of the virtual laboratory*/
const sensorSchematics = {
    "pico-": "../media/info/picoschem.jpg",
    "uno": "../media/info/unoschem.jpg",

};


function findSensorInfo() {
    let panel = document.getElementById("information-panel");
    panel.style.display = "flex";
    let buttons = document.getElementById("info-buttons");
    buttons.style.display = "flex";

    let closeButton = document.getElementById("close-button");
    closeButton.style.display = "flex";

}

function closeInfoPanel() {
    let panel = document.getElementById("information-panel");
    panel.style.display = "none";
    let buttons = document.getElementById("info-buttons");
    buttons.style.display = "none";
}

/* Function that open the picture for the specific sensor*/
function openImage() {
    const type = window.selectedSensor.id.replace(/[0-9]+$/, '');
    const path = sensorSchematics[type];
    if (!type || !path) return;

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