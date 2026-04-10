
function handleSimulation(sensor1, sensor2) {

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
            printOnConsole("✔ LM35 fully connected");
            startTemperatureSensor(lm35.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ LM35 not fully connected");
        }
    }

    if (
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
            printOnConsole("✔ URM09 fully connected");
            startURM09Simulation(urm09.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ URM09 not fully connected");
        }
    }

    if (
        (sensor1.id.startsWith("I2C") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("I2C") && sensor1.id.startsWith("pico-2"))
    ){
        const i2c = sensor1.id.startsWith("I2C") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;

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
            printOnConsole("✔ I2C fully connected");
            startI2CSensor(i2c.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ I2C not fully connected");
        }
    }if (
        (sensor1.id.startsWith("GP2Y0A41SK0F") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("GP2Y0A41SK0F") && sensor1.id.startsWith("pico-2"))
    ){
        const gp2y = sensor1.id.startsWith("GP2Y0A41SK0F") ? sensor1 : sensor2;
        const pico = sensor1.id.startsWith("pico-2") ? sensor1 : sensor2;

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
            printOnConsole("✔ GP2Y0A41SK0F fully connected");
            startDistanceSensor(gp2y.id);
            setControllerState(true);
        } else {
            printOnConsole("⚠️ GP2Y0A41SK0F not fully connected");
        }
    }

    if (
        (sensor1.id.startsWith("hall") && sensor2.id.startsWith("pico-2")) ||
        (sensor2.id.startsWith("hall") && sensor1.id.startsWith("pico-2"))
    ){
        let sensorId = sensor1.id.startsWith("hall") ? sensor1.id : sensor2.id;
        startHallSimulation(sensorId);
        setControllerState(true);
    }
}