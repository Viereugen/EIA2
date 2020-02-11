"use strict";
var Endabgabe;
(function (Endabgabe) {
    window.addEventListener("load", handleLoad);
    let url = "https://eiatestapp.herokuapp.com/";
    function handleLoad(_event) {
        document.getElementById("highscoreButton").addEventListener("click", displayHighScore);
    }
    async function displayHighScore(_event) {
        let query = "command=retrieve";
        let response = await fetch(url + "?" + query);
        let responseText = await response.text();
        let highscorelists = document.querySelector("div#serverResponse");
        // highscorelists.innerText = responseText;
        let allEntries = JSON.parse(responseText);
        for (let entry of allEntries) {
            let paragraph = document.createElement("p");
            paragraph.innerText = entry.name + ": " + entry.highscore + " Points";
            highscorelists.appendChild(paragraph);
        }
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=highscore.js.map