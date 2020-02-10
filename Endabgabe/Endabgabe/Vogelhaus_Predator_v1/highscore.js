"use strict";
var Endabgabe;
(function (Endabgabe) {
    window.addEventListener("load", handleLoad);
    let url = "https://eiatestapp.herokuapp.com/";
    function handleLoad(_event) {
        console.log(" highscore.ts fängt an");
        document.getElementById("highscoreButton").addEventListener("click", handleRetriveHS);
    }
    async function handleRetriveHS(_event) {
        let query = "command=retrieve";
        let response = await fetch(url + "?" + query);
        let responseText = await response.text();
        let highscorelists = document.querySelector("div#serverResponse");
        highscorelists.innerText = responseText;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=highscore.js.map