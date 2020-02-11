"use strict";
var Endabgabe;
(function (Endabgabe) {
    let url = "https://eiatestapp.herokuapp.com/";
    console.log(url);
    window.addEventListener("load", handleLoad);
    Endabgabe.goldenRatio = 0.62;
    Endabgabe.moveables = [];
    Endabgabe.highscore = 0;
    console.log("Your Highscore: " + Endabgabe.highscore);
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Endabgabe.crc2 = canvas.getContext("2d");
        Endabgabe.drawBackground();
        Endabgabe.drawSun({ x: 700, y: 75 });
        Endabgabe.drawCloud({ x: 300, y: 125 }, { x: 400, y: 100 });
        Endabgabe.drawMountains({ x: 0, y: Endabgabe.crc2.canvas.height * Endabgabe.goldenRatio }, 100, 200, "white", "darkgreen");
        Endabgabe.drawMountains({ x: 0, y: Endabgabe.crc2.canvas.height * Endabgabe.goldenRatio }, 50, 150, "lightgrey", "grey");
        Endabgabe.drawTree();
        Endabgabe.drawBirdhouse();
        Endabgabe.drawSnowman({ x: 600, y: 500 });
        let background = Endabgabe.crc2.getImageData(0, 0, 800, 600);
        drawBirds(25);
        drawSnowflakes(100);
        drawSnowball();
        canvas.addEventListener("click", throwSnowball);
        canvas.addEventListener("auxclick", throwFood); // nach rechtsklick suchen
        window.setTimeout(endTheGame, 20000);
        window.setInterval(update, 20, background); // triggert alle 20ms die update-Funktion für den Hintergrund & neue Position der animierten Elemente
    }
    function drawBirds(nBirds) {
        console.log("(Hotdog) birds.");
        for (let i = 0; i < nBirds; i++) {
            let bird = new Endabgabe.Bird();
            Endabgabe.moveables.push(bird);
        }
    }
    function drawSnowflakes(nSnowflakes) {
        console.log("Snowflakes.");
        for (let i = 0; i < nSnowflakes; i++) {
            let snowflake = new Endabgabe.Snowflake();
            Endabgabe.moveables.push(snowflake);
        }
    }
    function deleteBird() {
        for (let i = 0; i < Endabgabe.moveables.length; i++) {
            let bird = Endabgabe.moveables[i]; // typecast von Moveables zu Bird
            if (bird.isHit) {
                if (bird.isEating) {
                    Endabgabe.highscore += 10;
                    console.log("Your Highscore: " + Endabgabe.highscore);
                }
                if (!bird.isLured) {
                    Endabgabe.highscore += 25;
                    console.log("Your Highscore: " + Endabgabe.highscore);
                }
                Endabgabe.moveables.splice(i, 1);
                console.log("Bird was hit and killed!");
            }
        }
    }
    Endabgabe.deleteBird = deleteBird;
    function drawSnowball() {
        let snowball = new Endabgabe.Snowball();
        Endabgabe.moveables.push(snowball);
    }
    function throwSnowball(_event) {
        console.log("Snowball thrown");
        let _mousePosition = new Endabgabe.Vector(_event.clientX, _event.clientY);
        for (let moveable of Endabgabe.moveables) {
            if (moveable instanceof Endabgabe.Snowball) {
                moveable.targetBird(_mousePosition);
            }
        }
    }
    function deleteSnowball() {
        for (let i = 0; i < Endabgabe.moveables.length; i++) {
            if (Endabgabe.moveables[i] instanceof Endabgabe.Snowball) {
                Endabgabe.moveables.splice(i, 1);
                // console.log("Sling was deleted.");
            }
        }
        drawSnowball();
    }
    Endabgabe.deleteSnowball = deleteSnowball;
    function throwFood(_event) {
        console.log("Food thrown.");
        //console.log(_event);
        if (_event.clientY >= 400 && Endabgabe.highscore >= 20) {
            let _mousePosition = new Endabgabe.Vector(_event.clientX, _event.clientY);
            for (let moveable of Endabgabe.moveables) {
                if (moveable instanceof Endabgabe.Bird && moveable.isLured) {
                    //console.log(moveable.position);
                    moveable.getFood(_mousePosition);
                }
            }
            let food = new Endabgabe.Food(_mousePosition);
            Endabgabe.moveables.push(food);
            Endabgabe.highscore -= 20;
            setTimeout(deleteFood, 3000);
        }
    }
    function deleteFood() {
        for (let i = 0; i < Endabgabe.moveables.length; i++) {
            if (Endabgabe.moveables[i] instanceof Endabgabe.Food) {
                Endabgabe.moveables.splice(i, 1);
                console.log("All the food was eaten.");
            }
        }
    }
    function update(_background) {
        Endabgabe.crc2.putImageData(_background, 0, 0);
        for (let moveable of Endabgabe.moveables) {
            moveable.move();
            moveable.draw();
        }
        for (let moveable of Endabgabe.moveables) {
            if (moveable instanceof Endabgabe.Bird && moveable.isLured) {
                moveable.eatFood();
            }
        }
        for (let moveable of Endabgabe.moveables) {
            if (moveable instanceof Endabgabe.Snowball) {
                moveable.reachedTarget();
            }
        }
        for (let moveable of Endabgabe.moveables) {
            if (moveable instanceof Endabgabe.Bird && moveable.isHit) {
                deleteBird();
            }
        }
        Endabgabe.showScore();
    }
    function endTheGame() {
        let name = prompt("Your Score " + Endabgabe.highscore, "Please enter your name"); //dann beides in Datenbank! und wenn es ausgefüllt wurde zurück zur startseite!!
        if (name != null) {
            sendHighScore(name, Endabgabe.highscore);
        }
        window.open("https://viereugen.github.io/EIA2/Endabgabe/Endabgabe/Vogelhaus_Predator_v1/startseite.html", "_self");
    }
    async function sendHighScore(_name, _highscore) {
        let query = "highscore=" + _highscore + "&name=" + _name;
        let response = await fetch(url + "?" + query);
        alert(response);
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=main.js.map