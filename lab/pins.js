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

    // I2C mismatch
    if (
        (p1 === "SDA" && p2 !== "SDA") ||
        (p1 === "SCL" && p2 !== "SCL")
    ) {
        printOnConsole("⚠️ I2C lines must match (SDA-SDA, SCL-SCL)");
        return;
    }
}