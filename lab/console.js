const consoleBox = document.getElementById("code");


consoleBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {

        let input = consoleBox.value;
        if (input === "check") {
            document.querySelectorAll("#lab-area img").forEach((img) => {
                consoleBox.value += `\n/> ${img.id}`;
            })
        }else {
            consoleBox.value = `/> Unidentified command`;
        }

    }
})

function defaultCommandHandler(com) {}
function advancedCommandHandler(com) {}

