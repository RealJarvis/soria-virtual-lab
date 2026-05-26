const openExperimentBtn = document.getElementById("open-experiment-btn");
const experimentFileInput = document.getElementById("experiment-file-input");
const experimentModal = document.getElementById("experiment-modal");
const closeExperimentModal = document.getElementById("close-experiment-modal");
const experimentContent = document.getElementById("experiment-content");

if (openExperimentBtn && experimentFileInput) {
    openExperimentBtn.addEventListener("click", () => {
        experimentFileInput.click();
    });

    experimentFileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const experiment = JSON.parse(e.target.result);
                showExperimentModal(experiment);
            } catch (error) {
                alert("Súbor experimentu sa nepodarilo načítať.");
                console.error(error);
            }
        };

        reader.readAsText(file);
    });
}

if (closeExperimentModal) {
    closeExperimentModal.addEventListener("click", () => {
        experimentModal.style.display = "none";
    });
}

function showExperimentModal(experiment) {
    let html = `
        <p><strong>ID:</strong> ${experiment.id || "Neznáme"}</p>
        <p><strong>Dátum:</strong> ${experiment.date || "Neznámy"}</p>
        <p><strong>Simulácia aktívna:</strong> ${experiment.simulationActive ? "Áno" : "Nie"}</p>
    `;

    if (experiment.devices?.length) {
        html += `<h3>Zariadenia</h3><ul>`;
        experiment.devices.forEach(device => {
            html += `<li>${device.id} ${device.type ? `(${device.type})` : ""}</li>`;
        });
        html += `</ul>`;
    }

    if (experiment.connections?.length) {
        html += `<h3>Zapojenia</h3><ul>`;
        experiment.connections.forEach(c => {
            html += `<li>${c.fromDevice}.${c.fromPin} → ${c.toDevice}.${c.toPin}</li>`;
        });
        html += `</ul>`;
    }

    if (experiment.measurements?.length) {
        html += `<h3>Merania</h3><ul>`;
        experiment.measurements.forEach(m => {
            html += `<li>${m.sensorId || ""} ${m.type || ""}: ${m.value ?? ""} ${m.unit || ""}</li>`;
        });
        html += `</ul>`;
    }

    if (experiment.logs?.length) {
        html += `<h3>Logy</h3><ul>`;
        experiment.logs.forEach(log => {
            html += `<li>${log.message || log}</li>`;
        });
        html += `</ul>`;
    }

    experimentContent.innerHTML = html;
    experimentModal.style.display = "flex";
}