"use strict";
var Endabgabe;
(function (Endabgabe) {
    let url = "https://eiatestapp.herokuapp.com/";
    window.addEventListener("load", handleLoad);
    Endabgabe.goldenRatio = 0.62;
    Endabgabe.moveables = [];
    Endabgabe.highscore = 0;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Endabgabe.crc2 = canvas.getContext("2d");
        // Draw everything static
        Endabgabe.drawBackground();
        Endabgabe.drawSun({ x: 700, y: 75 });
        Endabgabe.drawCloud({ x: 300, y: 125 }, { x: 400, y: 100 });
        Endabgabe.drawMountains({ x: 0, y: Endabgabe.crc2.canvas.height * Endabgabe.goldenRatio }, 100, 200, "white", "darkgreen");
        Endabgabe.drawMountains({ x: 0, y: Endabgabe.crc2.canvas.height * Endabgabe.goldenRatio }, 50, 150, "lightgrey", "grey");
        Endabgabe.drawTree();
        Endabgabe.drawBirdhouse();
        Endabgabe.drawSnowman({ x: 600, y: 500 });
        let background = Endabgabe.crc2.getImageData(0, 0, 800, 600);
        // Draw everything dynamic
        drawBirds(25);
        drawSnowflakes(100);
        drawSnowball();
        canvas.addEventListener("click", throwSnowball);
        canvas.addEventListener("auxclick", throwFood);
        window.setTimeout(endTheGame, 20000);
        window.setInterval(update, 20, background); // Update alle 20 ms
    }
    function drawSnowflakes(nSnowflakes) {
        for (let i = 0; i < nSnowflakes; i++) {
            let snowflake = new Endabgabe.Snowflake();
            Endabgabe.moveables.push(snowflake);
        }
    }
    function drawBirds(nBirds) {
        for (let i = 0; i < nBirds; i++) {
            let bird = new Endabgabe.Bird();
            Endabgabe.moveables.push(bird);
        }
    }
    function deleteBird() {
        for (let i = 0; i < Endabgabe.moveables.length; i++) {
            let bird = Endabgabe.moveables[i]; // typecast von Moveables zu Bird
            if (bird.isHit) {
                Endabgabe.highscore += 20;
                if (bird.isEating && bird.isHungry) {
                    Endabgabe.highscore -= 15;
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
            }
        }
        drawSnowball();
    }
    Endabgabe.deleteSnowball = deleteSnowball;
    function throwFood(_event) {
        console.log("Food thrown");
        if (_event.clientY >= 400 && Endabgabe.highscore >= 20) {
            let _mousePosition = new Endabgabe.Vector(_event.clientX, _event.clientY);
            for (let moveable of Endabgabe.moveables) {
                if (moveable instanceof Endabgabe.Bird && moveable.isHungry) {
                    moveable.getFood(_mousePosition);
                }
            }
            let food = new Endabgabe.Food(_mousePosition);
            Endabgabe.moveables.push(food);
            Endabgabe.highscore -= 10;
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
    function endTheGame() {
        let name = prompt("Your Score: " + Endabgabe.highscore + "\nEnter your Name"); //dann beides in Datenbank! und wenn es ausgefüllt wurde zurück zur startseite!!
        if (name != null) {
            sendHighScore(name, Endabgabe.highscore);
            alert("Entry created.");
        }
    }
    async function sendHighScore(_name, _highscore) {
        let query = "highscore=" + _highscore + "&name=" + _name;
        await fetch(url + "?" + query);
        window.open("https://viereugen.github.io/EIA2/Endabgabe/Endabgabe/Vogelhaus_Predator_v1/startseite.html", "_self");
    }
    function update(_background) {
        Endabgabe.crc2.putImageData(_background, 0, 0);
        for (let moveable of Endabgabe.moveables) {
            moveable.move();
            moveable.draw();
        }
        for (let moveable of Endabgabe.moveables) {
            if (moveable instanceof Endabgabe.Bird && moveable.isHungry) {
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
        Endabgabe.drawScore();
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=main.js.map