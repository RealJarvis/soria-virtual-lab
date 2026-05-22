const materialsDataBase = {
    LM35: {
        title: "LM35 Temperature Sensor",
        text: "Gravity: teplotný senzor LM35 s analógovým napäťovým výstupom. Senzor sa používa na\n" +
            "meranie teploty prostredia. Jeho princíp fungovania je založený na lineárnom\n" +
            "vzťahu medzi teplotou a výstupným napätím, čo umožňuje systému previesť nameraný signál na hodnotu teploty. Senzor má rozsah od 0 do 100 stupňov Celzia,\n" +
            "čo je vhodné pre základné vzdelávacie experimenty. Používa piny VCC, GND\n" +
            "a analógový signálový výstup. Vo virtuálnom laboratóriu umožňuje študentom\n" +
            "pozorovať, ako sa teplota mení na základe premenných prostredia menených počas experimentu. Senzor má určité obmedzenia, ako napríklad presnosť merania, ktorá môže kolísať v rámci 1 stupňa Celzia. Senzor je určený iba na meranie\n" +
            "teploty a napájanie musí zostať v rozmedzí 3,3 až 5,0 V.",
        sourceName: "DFRobot – Gravity: Analog LM35 Temperature Sensor For Arduino",
        sourceURL: "https://www.dfrobot.com/product-76.html",
        imageURL: "../media/icon/LM35.png"

    },
    URM09: {
        title: "URM09 Ultrasonic Distance Sensor",
        text: " Gravity: ultrazvukový snímač vzdialenosti URM09, ktorý funguje na princípe odrazu ultrazvukových vĺn. Senzor sa používa na meranie\n" +
            "vzdialenosti pomocou zvukových vĺn, pričom vysiela signál a po jeho návrate ho deteguje. Má rozsah od 2 cm do 500 cm. Používa rovnaké piny ako predchádzajúci senzor: VCC, GND a analógový signálový výstup. Vo virtuálnom laboratóriu\n" +
            "umožňuje študentom pozorovať, ako sa meranie vzdialenosti mení v závislosti\n" +
            "od polohy blízkych objektov. Merania senzora závisia od podmienok prostredia\n" +
            "a presnosť sa môže znížiť pri rôznych teplotných alebo vlhkostných podmienkach.\n" +
            "Jeho výkon závisí aj od tvaru a veľkosti detegovaných objektov, čo znamená, že\n" +
            "niektoré objekty môžu byť ťažšie detegovateľné.",
        sourceName: "DFRobot – Gravity: URM09 Ultrasonic Distance Sensor",
        sourceURL: "https://www.dfrobot.com/product-1862.html",
        imageURL: "../media/icon/URM09.png"
    },
    I2C: {
        title: "I2C Triple Axis Accelerometer",
        text: " Gravity: I2C trojosý akcelerometer, ktorý funguje na princípe detekcie zrýchlenia založenej na technológii MEMS. Senzor meria zrýchlenie a pohyb v troch osiach, čo umožňuje systému detekovať orientáciu, pohyb\n" +
            "a nárazy. Má rozsah citlivosti ±2g, ±4g, ±8g alebo ±16g, vďaka čomu je vhodný pre rôzne vzdelávacie experimenty. Používa rozhranie Gravity I2C s pinmi\n" +
            "VCC a GND, čo sa líši od predchádzajúcich senzorov, ktoré využívali analógový výstupný signál. Vo virtuálnom laboratóriu umožňuje študentom pozorovať,\n" +
            "ako sa zrýchlenie a orientácia menia v závislosti od pohybu alebo polohy, ktorú\n" +
            "aplikujú na virtuálny objekt. Senzor má však aj svoje obmedzenia, pretože jeho\n" +
            "fungovanie je založené na technológii MEMS, čo znamená, že môže byť citlivý\n" +
            "na vibrácie a vonkajšie rušenie. Presnosť meraní sa môže meniť aj v závislosti\n" +
            "od zvoleného rozsahu citlivosti a prevádzkovej frekvencie. Napájanie musí zostať v rozmedzí 3,3 až 5,0 V\n",
        sourceName: "DFRobot – Gravity: I2C Triple Axis Accelerometer",
        sourceURL: "https://www.dfrobot.com/product-1573.html",
        imageURL: "../media/icon/I2C.png"
    },
    GP2Y0A41SK0F: {
        title: "Distance Measuring Sensor Unit",
        text:
            "GP2Y0A41SK0F, snímač vzdialenosti, ktorý funguje na princípe infračerveného žiarenia. Senzor sa používa na meranie vzdialenosti vysielaním infračerveného svetla a detekciou polohy odrazeného svetla, na základe čoho\n" +
            "určuje vzdialenosť pomocou triangulačnej metódy. Jeho rozsah merania siaha od\n" +
            "4 cm do 30 cm a používa piny VCC, GND a analógový signálový výstup. Vo virtuálnom laboratóriu umožňuje študentom pozorovať jeho fungovanie a porovnávať\n" +
            "ho s ultrazvukovým snímačom. Dosah senzora je v porovnaní s inými senzormi\n" +
            "obmedzený. Keďže senzor používa infračervené svetlo, jeho presnosť merania\n" +
            "sa môže znížiť v prostredí so silným osvetlením alebo pri vysoko reflexných povrchoch. Jeho fungovanie ovplyvňuje aj teplota prostredia a ak klesne pod -10 °C\n" +
            "alebo stúpne nad +60 °C, senzor nemusí pracovať správne ",
        sourceName: "Sharp. GP2Y0A41SK0F",
        sourceURL: "https://global.sharp/products/device/lineup/data/pdf/datasheet/gp2y0a41sk_e.pdf",
        imageURL: "../media/icon/GP2Y0A41SK0F.png",
    },
    potentiometer: {
        title: "Analog Slide Position",
        text: "Gravity: analógový senzor polohy posuvníka funguje na princípe lineárneho posuvného potenciometra. Senzor meria lineárnu polohu posuvníka, čo umožňuje\n" +
            "systému previesť fyzickú polohu posuvného kontaktu na zodpovedajúcu hodnotu napätia. Používa piny VCC, GND a analógový signálový výstup. Vo virtuálnom laboratóriu umožňuje študentom pozorovať, ako sa výstupné napätie mení\n" +
            "v závislosti od polohy, do ktorej počas experimentu nastavia posuvník. Senzor\n" +
            "je obmedzený na pevné napájacie napätie 5 V, čo sa mierne líši od ostatných senzorov, ktoré podporujú širší rozsah 3,3 až 5,0 V. Je tiež určený iba na meranie\n" +
            "lineárnej polohy",
        sourceName: "DFRobot – Gravity: Analog Slide Position",
        sourceURL: "https://www.dfrobot.com/product-131.html",
        imageURL: "../media/icon/potentiometer.png"
    },
    hall: {
        title: "Digital Hall Sensor",
        text: "Gravity: digitálny Hallov senzor je ďalším senzorom používaným vo virtuálnom laboratóriu a funguje na princípe Hallovho javu, ktorý mu umožňuje detekovať prítomnosť blízkeho magnetického objektu. Senzor sa používa na určenie,\n" +
            "či sa v jeho blízkosti nachádza magnetický objekt, a keď je magnet priblížený\n" +
            "k senzoru, vytvára digitálny výstup. Tým sa odlišuje od väčšiny predchádzajúcich senzorov, ktoré využívajú analógový výstup. Používa rovnaké piny ako ostatné senzory, teda VCC, GND a signálový výstup, pričom napájanie musí zostať\n" +
            "v rozmedzí 3,3 až 5,0 V. Vo virtuálnom laboratóriu umožňuje študentom pozorovať, ako sa digitálny výstup mení v závislosti od toho, či sa magnetický objekt\n" +
            "nachádza v blízkosti senzora počas experimentu.\n" +
            "Senzor má aj určité obmedzenia, ktoré stoja za zmienku, keďže ide o omnipolárny magnetický detektor. To znamená, že nedokáže rozlišovať medzi dvoma\n" +
            "polaritami magnetu. Tým sa obmedzuje množstvo informácií, ktoré môže poskytnúť, pretože deteguje iba prítomnosť magnetického poľa, nie jeho smer ani\n" +
            "silu. ",
        sourceName: "DFRobot – Gravity: Digital Hall Sensor",
        sourceURL: "https://www.dfrobot.com/product-1310.html",
        imageURL: "../media/icon/hall.png"
    }
};



const params = new URLSearchParams(window.location.search);
const topicId = params.get("topic") || "LM35";
console.log(topicId);
const material = materialsDataBase[topicId];

if (!material) {
    alert("Materiál pre túto tému nebol nájdený.");
    window.location.href = "../topichub/topichub.html";
}

const titleEl = document.getElementById("topic-title");
const textEl = document.getElementById("topic-text");
const sourceLink = document.getElementById("source-link");
const imageLink = document.getElementById("image-link");

function renderMaterial() {
    titleEl.textContent = material.title;
    textEl.textContent = material.text;

    sourceLink.href = material.sourceURL;
    sourceLink.title = material.sourceName;
    imageLink.src = material.imageURL;
}

renderMaterial();