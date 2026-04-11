function createPowerPort(container, name, xPercent, yPercent) {
    const powerport = document.createElement("div");
    const label = document.createElement("div");
    label.innerText = name;
    label.className = "usb-label";

    powerport.className = "pin powerport";
    powerport.dataset.pin = name;

    powerport.style.left = xPercent + "px";
    powerport.style.top = yPercent + "px";

    powerport.appendChild(label);
    container.appendChild(powerport);
}


function createPin(container, name, xPercent, yPercent) {
    const pin = document.createElement("div");
    const label = document.createElement("div");
    label.innerText = name;
    label.className = "pin-label";

    pin.className = "pin";
    pin.dataset.pin = name;

    pin.style.left = xPercent + "px";
    pin.style.top = yPercent + "px";

    pin.appendChild(label);
    container.appendChild(pin);
}

function pinArrange(container, value) {
    if (value === "pico-2"){
        createPowerPort(container, "USB", 40, -10);
        createPin(container, "3V3", 120, 67);
        createPin(container, "GND", 120, 108);
        //Analog (for LM35, GP2Y0A41SK0F, potentiometer)
        createPin(container, "GP26", 120, 134);
        //I2C (for accelerometer SEN0224)
        createPin(container, "GP21", 120, 186);
        createPin(container, "GP20", 120, 200);
        //Digital (for simple sensors like Hall, triggers)
        createPin(container, "GP17", 120, 252);
        createPin(container, "GP16", 120, 267);
    }else if (value === "uno"){
        createPowerPort(container, "USB", 150, -15);
        createPin(container, "5V", -40, 202);
        createPin(container, "GND", -40, 223);
        //Analog (for LM35, GP2Y0A41SK0F, potentiometer)
        createPin(container, "A0", -40, 260);
        //Digital (for simple sensors like Hall, TRIG/ECHO)
        createPin(container, "D3",  253, 287);
        createPin(container, "D2", 253, 302);
        //I2C (for accelerometer, URM09 in I2C mode)
        createPin(container, "A4", -40, 305);
        createPin(container, "A5",  -40, 320);
    }
    else if (value === "URM09"){
        // connects to pins -> 3V3, GND, GP20 (SDA), GP21 (SCL)
        createPin(container, "VCC", 15, 70);
        createPin(container, "GND", 40, 70);
        createPin(container, "SDA", 65, 70);
        createPin(container, "SCL", 90, 70);
    }else if (value === "LM35"){
        //OUT → must connect to GP26 (ADC), VCC → 3V3, GND → GND
        createPin(container, "GND", 122, 25);
        createPin(container, "VCC", 122, 38);
        createPin(container, "OUT", 122, 52);

    }else if (value === "I2C"){
        // VCC → 3V3, GND → GND, SCL → GP21, SDA → GP20
        createPin(container, "VCC", 122, 32);
        createPin(container, "GND", 122, 47);
        createPin(container, "SCL", 122, 62);
        createPin(container, "SDA", 122, 77);

    }else if (value === "potentiometer"){
        //VCC -> 3V3, GND -> GND, OUT\SIG -> GP26
        createPin(container, "VCC", 122, 0);
        createPin(container, "GND", 122, 13);
        createPin(container, "OUT", 122, 27);

    }else if (value === "GP2Y0A41SK0F"){
        // connects to pins -> 3V3, GND, GP20 (SDA), GP21 (SCL)
        createPin(container, "VCC", 15, 70);
        createPin(container, "GND", 40, 70);
        createPin(container, "OUT", 65, 70);
    }else if (value === "powersupply") {
        createPowerPort(container, "USB", 70, -15);
    }
}


function isPinUsed(pin) {
    return wires.some(w => w.pin1 === pin || w.pin2 === pin);
}


function pinControler(pin1, pin2) {
    let p1 = pin1.dataset.pin;
    let p2 = pin2.dataset.pin;

    if ((p1 === "VCC" && p2 === "GND") ||
        (p1 === "GND" && p2 === "VCC")) {
        printOnConsole("⚠️ Short circuit (VCC - GND)")
    }

    // invalid
    if (p1 === "OUT" && p2 === "OUT") {
        printOnConsole("⚠️ Output to output is invalid");
        return;
    }

}

// the next 2 functions are used for pin connection validation, which allows to start the simulation for particular sensors

function getPin(sensor, pinName) {
    return sensor.querySelector(`.pin[data-pin="${pinName}"]`);
}

function isConnected(pinA, pinB) {
    return wires.some(w =>
        (w.pin1 === pinA && w.pin2 === pinB) ||
        (w.pin1 === pinB && w.pin2 === pinA)
    );
}

