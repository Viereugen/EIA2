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
        let canvas = document.querySelector("canvas"); //Nachschauen
        if (!canvas)
            return;
        Endabgabe.crc2 = canvas.getContext("2d");
        Endabgabe.drawBackground();
        Endabgabe.drawSun({ x: 700, y: 75 });
        Endabgabe.drawCloud({ x: 300, y: 125 }, { x: 350, y: 105 });
        Endabgabe.drawMountains({ x: 0, y: Endabgabe.crc2.canvas.height * Endabgabe.goldenRatio }, 80, 200, "white", "darkgreen");
        Endabgabe.drawMountains({ x: 0, y: Endabgabe.crc2.canvas.height * Endabgabe.goldenRatio }, 40, 180, "lightgrey", "grey");
        Endabgabe.drawTree();
        Endabgabe.drawSnowman({ x: 600, y: 500 });
        Endabgabe.drawBirdhouse();
        // drawBirdsInTree({ x: 510, y: 400 }, { x: 180, y: 120 });
        //showScore();
        let background = Endabgabe.crc2.getImageData(0, 0, 800, 600);
        drawBirds(25);
        drawSnowflakes(100);
        // drawPartyBird(3);
        drawSlingshot();
        canvas.addEventListener("click", useSlingshot);
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
    // function drawPartyBird(nBirds: number): void {
    //     console.log("Party Bird.");
    //     for (let i: number = 0; i < nBirds; i++) {
    //         let partyBird: PartyBird = new PartyBird();
    //         moveables.push(partyBird);
    //     }
    // }
    function deleteBird() {
        for (let i = 0; i < Endabgabe.moveables.length; i++) {
            if (Endabgabe.moveables[i].isHit) {
                if (Endabgabe.moveables[i].isHit && Endabgabe.moveables[i].isLured) {
                    Endabgabe.moveables[i].score = 10;
                    Endabgabe.highscore += Endabgabe.moveables[i].score;
                    console.log("Your Highscore: " + Endabgabe.highscore);
                }
                if (!Endabgabe.moveables[i].isLured) {
                    Endabgabe.moveables[i].score = 20;
                    Endabgabe.highscore += Endabgabe.moveables[i].score;
                    console.log("Your Highscore: " + Endabgabe.highscore);
                }
                Endabgabe.moveables.splice(i, 1);
                console.log("Bird was hit and killed!");
            }
        }
    }
    Endabgabe.deleteBird = deleteBird;
    function drawSlingshot() {
        //console.log("Slingshot.");
        let slingShot = new Endabgabe.Slingshot();
        Endabgabe.moveables.push(slingShot);
    }
    function useSlingshot(_event) {
        console.log("Slingshot used.");
        let _mousePosition = new Endabgabe.Vector(_event.clientX, _event.clientY);
        for (let moveable of Endabgabe.moveables) {
            if (moveable instanceof Endabgabe.Slingshot) {
                // console.log("Slingshot started.");
                moveable.targetBird(_mousePosition);
            }
        }
    }
    function deleteSlingshot() {
        for (let i = 0; i < Endabgabe.moveables.length; i++) {
            if (Endabgabe.moveables[i] instanceof Endabgabe.Slingshot) {
                Endabgabe.moveables.splice(i, 1);
                // console.log("Sling was deleted.");
            }
        }
        drawSlingshot();
    }
    Endabgabe.deleteSlingshot = deleteSlingshot;
    function throwFood(_event) {
        console.log("Food thrown.");
        //console.log(_event);
        let _mousePosition = new Endabgabe.Vector(_event.clientX, _event.clientY);
        for (let moveable of Endabgabe.moveables) {
            if (moveable instanceof Endabgabe.Bird && moveable.isLured) {
                //console.log(moveable.position);
                moveable.getFood(_mousePosition);
            }
        }
        let food = new Endabgabe.Food(_mousePosition);
        Endabgabe.moveables.push(food);
        setTimeout(deleteFood, 3000);
    }
    function deleteFood() {
        for (let i = 0; i < Endabgabe.moveables.length; i++) {
            if (Endabgabe.moveables[i] instanceof Endabgabe.Food) {
                Endabgabe.moveables.splice(i, 1);
                console.log("All the food was eaten.");
            }
        }
    }
    // function showScore(): void {
    //     crc2.fillStyle = "#0f0f0f";
    //     crc2.fillRect(700, 0, 200, 80);
    //     crc2.font = "20px Typescript";
    //     crc2.fillStyle = "white";
    //     crc2.fillText("Score: ", 660, 25);
    //     crc2.fillText("" + highscore, 720, 25);
    //     crc2.font = "20px Typescript";
    // }
    // update Background & Animation
    function update(_background) {
        //console.log("updated");
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
            if (moveable instanceof Endabgabe.Slingshot) {
                moveable.reachedTarget();
            }
        }
        for (let moveable of Endabgabe.moveables) {
            if (moveable instanceof Endabgabe.Bird && moveable.isHit) {
                deleteBird();
            }
        }
        Endabgabe.showScore();
        // drawSlingshotWoodenPart({ x: crc2.canvas.width - 55, y: crc2.canvas.height + 70 });
        // showScore();
    }
    function endTheGame() {
        let name = prompt("Your Score " + Endabgabe.highscore, "Please enter your name"); //dann beides in Datenbank! und wenn es ausgefüllt wurde zurück zur startseite!!
        if (name != null) {
            sendHighScore(name, Endabgabe.highscore);
            //self das es 
        }
        window.open("https://viereugen.github.io/EIA2/Endabgabe/Endabgabe/Vogelhaus_Predator_v1/startseite.html", "_self");
    }
    function sendHighScore(_name, _highscore) {
        let query = "highscore=" + _highscore + "&name=" + _name;
        let response = fetch(url + "?" + query);
        let responseText = response.text();
        alert(response);
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=main.js.map