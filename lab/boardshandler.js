
function handleSimulationPICO(sensor1, sensor2) {

    if (
        (sensor1.id.startsWith("LM35") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("LM35") && sensor1.id.startsWith("pico-2"))

    ){
        const lm35 = sensor1.id.startsWith("LM35") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;

        if (!isBoardPowered(pico)) {
            printOnConsole("⚠️ Pico Pi 2 is not powered");
            return;
        }

        const vcc = getPin(lm35, "VCC");
        const gnd = getPin(lm35, "GND");
        const out = getPin(lm35, "OUT");

        const p3v3 = getPin(pico, "3V3");
        const pgnd = getPin(pico, "GND");
        const gp26 = getPin(pico, "GP26");

        if (
            isConnected(vcc, p3v3) &&
            isConnected(gnd, pgnd) &&
            isConnected(out, gp26)
        ) {
            if (!runningSimulations[lm35.id]) {
                printOnConsole("✅ LM35 is fully connected to Pico 2");
                startTemperatureSensor(lm35.id, pico.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ LM35 is not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("URM09") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("URM09") && sensor1.id.startsWith("pico-2"))
    ){
        const urm09 = sensor1.id.startsWith("URM09") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;

        if (!isBoardPowered(pico)) {
            printOnConsole("⚠️ Pico Pi 2 is not powered");
            return;
        }

        const vcc = getPin(urm09, "VCC");
        const gnd = getPin(urm09, "GND");
        const out = getPin(urm09, "OUT");

        const p3v3 = getPin(pico, "3V3");
        const pgnd = getPin(pico, "GND");
        const gp26 = getPin(pico, "GP26");

        if (
            isConnected(vcc, p3v3) &&
            isConnected(gnd, pgnd) &&
            isConnected(out, gp26)
        ) {
            if (!runningSimulations[urm09.id]) {
                printOnConsole("✅ URM09 is fully connected to Pico 2");
                startURM09Simulation(urm09.id, pico.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ URM09 is not fully connected");
        }
    }

    else if (
        (sensor1.id.startsWith("I2C") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("I2C") && sensor1.id.startsWith("pico-2"))
    ){
        const i2c = sensor1.id.startsWith("I2C") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;
        if (!isBoardPowered(pico)) {
            printOnConsole("⚠️ Pico Pi 2 is not powered");
            return;
        }


        const vcc = getPin(i2c, "VCC");
        const gnd = getPin(i2c, "GND");
        const sda = getPin(i2c, "SDA");
        const scl = getPin(i2c, "SCL");

        const p3v3 = getPin(pico, "3V3");
        const pgnd = getPin(pico, "GND");
        const gp20 = getPin(pico, "GP20");
        const gp21 = getPin(pico, "GP21");

        if (
            isConnected(vcc, p3v3) &&
            isConnected(gnd, pgnd) &&
            isConnected(sda, gp20) &&
            isConnected(scl, gp21)
        ) {
            if (!runningSimulations[i2c.id]) {
                printOnConsole("✅ I2C is fully connected to Pico 2");
                startI2CSensor(i2c.id, pico.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ I2C is not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("GP2Y0A41SK0F") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("GP2Y0A41SK0F") && sensor1.id.startsWith("pico-2"))
    ){
        const gp2y = sensor1.id.startsWith("GP2Y0A41SK0F") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;

        if (!isBoardPowered(pico)) {
            printOnConsole("⚠️ Pico Pi 2 is not powered");
            return;
        }

        const vcc = getPin(gp2y, "VCC");
        const gnd = getPin(gp2y, "GND");
        const out = getPin(gp2y, "OUT");

        const p3v3 = getPin(pico, "3V3");
        const pgnd = getPin(pico, "GND");
        const gp26 = getPin(pico, "GP26");

        if (
            isConnected(vcc, p3v3) &&
            isConnected(gnd, pgnd) &&
            isConnected(out, gp26)
        ) {
            if (!runningSimulations[gp2y.id]) {
                printOnConsole("✅ GP2Y0A41SK0F is fully connected to Pico 2");
                startDistanceSensor(gp2y.id, pico.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ GP2Y0A41SK0F is not fully connected");
        }
    }else if (
        (sensor1.id.startsWith("potentiometer") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("potentiometer") && sensor1.id.startsWith("pico-2"))
    ){
        let slider = sensor1.id.startsWith("potentiometer") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;

        if (!isBoardPowered(pico)) {
            printOnConsole("⚠️ Pico Pi 2 is not powered");
            return;
        }

        const vcc = getPin(slider, "VCC");
        const gnd = getPin(slider, "GND");
        const out = getPin(slider, "OUT");

        const p3v3 = getPin(pico, "3V3");
        const pgnd = getPin(pico, "GND");
        const gp26 = getPin(pico, "GP26");

        if (
            isConnected(vcc, p3v3) &&
            isConnected(gnd, pgnd) &&
            isConnected(out, gp26)
        ) {
            if (!runningSimulations[slider.id]) {
                printOnConsole("✅ Potentiometer is fully connected to Pico 2");
                potentiometerSimulation(slider.id, pico.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ Potentiometer is not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("hall") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("hall") && sensor1.id.startsWith("pico-2"))
    ){
        let hall = sensor1.id.startsWith("hall") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;

        if (!isBoardPowered(pico)) {
            printOnConsole("⚠️ Pico Pi 2 is not powered");
            return;
        }

        const vcc = getPin(hall, "VCC");
        const gnd = getPin(hall, "GND");
        const out = getPin(hall, "OUT");

        const p3v3 = getPin(pico, "3V3");
        const pgnd = getPin(pico, "GND");
        const gp26 = getPin(pico, "GP26");

        if (
            isConnected(vcc, p3v3) &&
            isConnected(gnd, pgnd) &&
            isConnected(out, gp26)
        ) {
            if (!runningSimulations[hall.id]) {
                printOnConsole("✅ Digital Hall is fully connected to Pico 2");
                startHallSimulation(hall.id, pico.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ Digital Hall is not fully connected");
        }

    }
}


function handleSimulationUNO(sensor1, sensor2) {
    if (
        (sensor1.id.startsWith("LM35") && sensor2.id.startsWith("uno")) ||
        (sensor2.id.startsWith("LM35") && sensor1.id.startsWith("uno"))

    ){
        const lm35 = sensor1.id.startsWith("LM35") ? sensor1 : sensor2;
        const uno = sensor1.id.startsWith("uno") ? sensor1 : sensor2;

        if (!isBoardPowered(uno)) {
            printOnConsole("⚠️ Arduino is not powered");
            return;
        }

        const vcc = getPin(lm35, "VCC");
        const gnd = getPin(lm35, "GND");
        const out = getPin(lm35, "OUT");

        const V5 = getPin(uno, "5V");
        const pgnd = getPin(uno, "GND");
        const A0 = getPin(uno, "A0");

        if (
            isConnected(vcc, V5) &&
            isConnected(gnd, pgnd) &&
            isConnected(out, A0)
        ) {
            if (!runningSimulations[lm35.id]) {
                printOnConsole("✅ LM35 is fully connected to Arduino UNO");
                startTemperatureSensor(lm35.id, uno.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ LM35 not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("URM09") && sensor2.id.startsWith("uno")) ||
        (sensor2.id.startsWith("URM09") && sensor1.id.startsWith("uno"))
    ){
        const urm09 = sensor1.id.startsWith("URM09") ? sensor1 : sensor2;
        const uno = sensor1.id.startsWith("uno") ? sensor1 : sensor2;

        if (!isBoardPowered(uno)) {
            printOnConsole("⚠️ Arduino Uno is not powered");
            return;
        }

        const vcc = getPin(urm09, "VCC");
        const gnd = getPin(urm09, "GND");
        const out = getPin(urm09, "OUT");

        const V5 = getPin(uno, "5V");
        const pgnd = getPin(uno, "GND");
        const A0 = getPin(uno, "A0");

        if (
            isConnected(vcc, V5) &&
            isConnected(gnd, pgnd) &&
            isConnected(out, A0)
        ) {
            if (!runningSimulations[urm09.id]) {
                printOnConsole("✅ URM09 is fully connected to Arduino UNO");
                startURM09Simulation(urm09.id, uno.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ URM09 is not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("I2C") && sensor2.id.startsWith("uno")) ||
        (sensor2.id.startsWith("I2C") && sensor1.id.startsWith("uno"))
    ){
        const i2c = sensor1.id.startsWith("I2C") ? sensor1 : sensor2;
        const uno = sensor1.id.startsWith("uno") ? sensor1 : sensor2;

        if (!isBoardPowered(uno)) {
            printOnConsole("⚠️ Arduino Uno is not powered");
            return;
        }

        const vcc = getPin(i2c, "VCC");
        const gnd = getPin(i2c, "GND");
        const sda = getPin(i2c, "SDA");
        const scl = getPin(i2c, "SCL");

        const V5 = getPin(uno, "5V");
        const pgnd = getPin(uno, "GND");
        const A4 = getPin(uno, "A4");
        const A5 = getPin(uno, "A5");

        if (
            isConnected(vcc, V5) &&
            isConnected(gnd, pgnd) &&
            isConnected(sda, A4) &&
            isConnected(scl, A5)
        ) {
            if (!runningSimulations[i2c.id]) {
                printOnConsole("✅ I2C is fully connected to Arduino UNO");
                startI2CSensor(i2c.id, uno.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ I2C is not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("GP2Y0A41SK0F") && sensor2.id.startsWith("uno")) ||
        (sensor2.id.startsWith("GP2Y0A41SK0F") && sensor1.id.startsWith("uno"))
    ){
        const gp2y = sensor1.id.startsWith("GP2Y0A41SK0F") ? sensor1 : sensor2;
        const uno = sensor1.id.startsWith("uno") ? sensor1 : sensor2;

        if (!isBoardPowered(uno)) {
            printOnConsole("⚠️ Arduino Uno is not powered");
            return;
        }

        const vcc = getPin(gp2y, "VCC");
        const gnd = getPin(gp2y, "GND");
        const out = getPin(gp2y, "OUT");

        const V5 = getPin(uno, "5V");
        const pgnd = getPin(uno, "GND");
        const A0 = getPin(uno, "A0");

        if (
            isConnected(vcc, V5) &&
            isConnected(gnd, pgnd) &&
            isConnected(out, A0)
        ) {
            if (!runningSimulations[gp2y.id]) {
                printOnConsole("✅ GP2Y0A41SK0F is fully connected to Arduino UNO");
                startDistanceSensor(gp2y.id, uno.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ GP2Y0A41SK0F is not fully connected");
        }
    }else if (
        (sensor1.id.startsWith("potentiometer") && sensor2.id.startsWith("uno")) ||
        (sensor2.id.startsWith("potentiometer") && sensor1.id.startsWith("uno"))
    ){
        let slider = sensor1.id.startsWith("potentiometer") ? sensor1 : sensor2;
        const uno = sensor1.id.startsWith("uno") ? sensor1 : sensor2;

        if (!isBoardPowered(uno)) {
            printOnConsole("⚠️ Arduino UNO is not powered");
            return;
        }

        const vcc = getPin(slider, "VCC");
        const gnd = getPin(slider, "GND");
        const out = getPin(slider, "OUT");

        const V5 = getPin(uno, "5V");
        const pgnd = getPin(uno, "GND");
        const A0 = getPin(uno, "A0");

        if (
            isConnected(vcc, V5) &&
            isConnected(gnd, pgnd) &&
            isConnected(out, A0)
        ){
            if (!runningSimulations[slider.id]) {
                printOnConsole("✅ Potentiometer is fully connected to Arduino UNO");
                potentiometerSimulation(slider.id, uno.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ Potentiometer is not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("hall") && sensor2.id.startsWith("uno")) ||
        (sensor2.id.startsWith("hall") && sensor1.id.startsWith("uno"))
    ){
        let hall = sensor1.id.startsWith("hall") ? sensor1 : sensor2;
        const uno = sensor1.id.startsWith("uno") ? sensor1 : sensor2;

        if (!isBoardPowered(uno)) {
            printOnConsole("⚠️ Arduino UNO is not powered");
            return;
        }

        const vcc = getPin(hall, "VCC");
        const gnd = getPin(hall, "GND");
        const out = getPin(hall, "OUT");

        const V5 = getPin(uno, "5V");
        const pgnd = getPin(uno, "GND");
        const A0 = getPin(uno, "A0");

        if (
            isConnected(vcc, V5) &&
            isConnected(gnd, pgnd) &&
            isConnected(out, A0)
        ){
            if (!runningSimulations[hall.id]) {
                printOnConsole("✅ Digital Hall is fully connected to Arduino UNO");
                startHallSimulation(hall.id, uno.id);
                setControllerState(true);
            }
        } else {
            printOnConsole("⚠️ Digital Hall is not fully connected");
        }

    }
}


