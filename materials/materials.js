const materials = {
    LM35: {
        title: "LM35 Temperature Sensor",
        text: "LM35 je analógový senzor teploty..."
    },
    URM09: {
        title: "URM09 Ultrasonic Distance Sensor",
        text: "URM09 sa používa na meranie vzdialenosti..."
    },
    I2C: {
        title: "I2C Triple Axis Accelerometer",
        text: "Trojosový akcelerometer meria zrýchlenie..."
    },
    GP2Y0A41SK0F: {
        title: "Distance Measuring Sensor Unit",
        text: "Tento senzor slúži na meranie vzdialenosti objektov..."
    },
    potentiometer: {
        title: "Analog Slide Position",
        text: "Potenciometer mení analógovú hodnotu podľa polohy jazdca..."
    },
    hall: {
        title: "Digital Hall Sensor",
        text: "Hall senzor reaguje na prítomnosť magnetického poľa..."
    }
};

const material = materials[topicId];

if (!material) {
    alert("Materiál pre túto tému nebol nájdený.");
    window.location.href = "../topichub/topichub.html";
}

const params = new URLSearchParams(window.location.search);
const topicId = params.get("topic") || "LM35";