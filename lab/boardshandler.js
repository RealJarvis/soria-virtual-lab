
function handleSimulationPICO(sensor1, sensor2) {

    if (
        (sensor1.id.startsWith("LM35") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("LM35") && sensor1.id.startsWith("pico-2"))

    ){
        const lm35 = sensor1.id.startsWith("LM35") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;

        if (!isBoardPowered(pico)) {
            printOnConsole("⚠️ Pico is not powered");
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
            printOnConsole("✅ LM35 fully connected to Pico 2");
            startTemperatureSensor(lm35.id, pico.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ LM35 not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("URM09") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("URM09") && sensor1.id.startsWith("pico-2"))
    ){
        const urm09 = sensor1.id.startsWith("URM09") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;

        if (!isBoardPowered(pico)) {
            printOnConsole("⚠️ Pico is not powered");
            return;
        }

        const vcc = getPin(urm09, "VCC");
        const gnd = getPin(urm09, "GND");
        const sda = getPin(urm09, "SDA");
        const scl = getPin(urm09, "SCL");

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
            printOnConsole("✅ URM09 fully connected to Pico 2");
            startURM09Simulation(urm09.id, pico.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ URM09 not fully connected");
        }
    }

    else if (
        (sensor1.id.startsWith("I2C") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("I2C") && sensor1.id.startsWith("pico-2"))
    ){
        const i2c = sensor1.id.startsWith("I2C") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;
        if (!isBoardPowered(pico)) {
            printOnConsole("⚠️ Pico is not powered");
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
            printOnConsole("✅ I2C fully connected to Pico 2");
            startI2CSensor(i2c.id, pico.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ I2C not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("GP2Y0A41SK0F") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("GP2Y0A41SK0F") && sensor1.id.startsWith("pico-2"))
    ){
        const gp2y = sensor1.id.startsWith("GP2Y0A41SK0F") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;

        if (!isBoardPowered(pico)) {
            printOnConsole("⚠️ Pico is not powered");
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
            printOnConsole("✅ GP2Y0A41SK0F fully connected to Pico 2");
            startDistanceSensor(gp2y.id, pico.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ GP2Y0A41SK0F not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("hall") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("hall") && sensor1.id.startsWith("pico-2"))
    ){
        let sensorId = sensor1.id.startsWith("hall") ? sensor1.id : sensor2.id;
        startHallSimulation(sensorId);
        setControllerState(true);
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
            printOnConsole("✅ LM35 fully connected to Arduino UNO");
            startTemperatureSensor(lm35.id, uno.id);
            setControllerState(true);
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
        const sda = getPin(urm09, "SDA");
        const scl = getPin(urm09, "SCL");

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
            printOnConsole("✅ URM09 fully connected to Arduino UNO");
            startURM09Simulation(urm09.id, uno.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ URM09 not fully connected");
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
            printOnConsole("✅ I2C fully connected to Arduino UNO");
            startI2CSensor(i2c.id, uno.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ I2C not fully connected");
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
            printOnConsole("✅ GP2Y0A41SK0F fully connected to Arduino UNO");
            startDistanceSensor(gp2y.id, uno.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ GP2Y0A41SK0F not fully connected");
        }
    }
    else if (
        (sensor1.id.startsWith("hall") && sensor2.id.startsWith("uno")) ||
        (sensor2.id.startsWith("hall") && sensor1.id.startsWith("uno"))
    ){}
}


