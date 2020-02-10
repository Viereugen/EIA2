"use strict";
var Endabgabe;
(function (Endabgabe) {
    // Funktionen für alle Hintergrundelemente
    function drawBackground() {
        //console.log("Background");
        let gradient = Endabgabe.crc2.createLinearGradient(0, 0, 0, Endabgabe.crc2.canvas.height);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(Endabgabe.goldenRatio, "HSL(100, 30%, 90%)");
        gradient.addColorStop(1, "grey");
        Endabgabe.crc2.fillStyle = gradient;
        Endabgabe.crc2.fillRect(0, 0, Endabgabe.crc2.canvas.width, Endabgabe.crc2.canvas.height);
    }
    Endabgabe.drawBackground = drawBackground;
    function drawSun(_position) {
        //console.log("Sun" + _position);
        let r1 = 25;
        let r2 = 100;
        let gradient = Endabgabe.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(90, 100%, 950%, 1");
        gradient.addColorStop(1, "HSLA(90, 100%, 40%, 0");
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(_position.x, _position.y);
        Endabgabe.crc2.fillStyle = gradient;
        Endabgabe.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        Endabgabe.crc2.fill();
        Endabgabe.crc2.restore();
    }
    Endabgabe.drawSun = drawSun;
    function drawCloud(_position, _size) {
        //console.log("Cloud" + _position, _size);
        let nParticles = 50;
        let radiusParticle = 45;
        let particle = new Path2D();
        let gradient = Endabgabe.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.3)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(_position.x, _position.y);
        Endabgabe.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            Endabgabe.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            Endabgabe.crc2.translate(x, y);
            Endabgabe.crc2.fill(particle);
            Endabgabe.crc2.restore();
        }
        Endabgabe.crc2.restore();
    }
    Endabgabe.drawCloud = drawCloud;
    function drawMountains(_position, _min, _max, _colorHigh, _colorLow) {
        let stepMin = 30;
        let stepMax = 40;
        let x = 0;
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(_position.x, _position.y);
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(0, 0);
        Endabgabe.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            Endabgabe.crc2.lineTo(x, y);
        } while (x < Endabgabe.crc2.canvas.width);
        Endabgabe.crc2.lineTo(x, 0);
        Endabgabe.crc2.closePath();
        let gradient = Endabgabe.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        Endabgabe.crc2.fillStyle = gradient;
        Endabgabe.crc2.fill();
        Endabgabe.crc2.restore();
    }
    Endabgabe.drawMountains = drawMountains;
    function drawTree() {
        let transform = Endabgabe.crc2.getTransform();
        let nBranches = 100;
        let maxRadius = 30;
        let branch = new Path2D();
        branch.arc(200, 470, maxRadius, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "HSL(15, 90%, 20%)"; // Baumstamm
        Endabgabe.crc2.fillRect(180, 450, 30, -200);
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(0, -120);
        do {
            let y = Math.random() * 250;
            let x = (Math.random() - 0.5) * 6 * maxRadius;
            Endabgabe.crc2.save();
            Endabgabe.crc2.translate(0, -y);
            Endabgabe.crc2.translate(x, 0);
            let colorAngle = 100 - Math.random() * 60;
            let color = "HSLA(" + colorAngle + ", 70%, 30%, 0.7)";
            Endabgabe.crc2.fillStyle = color;
            Endabgabe.crc2.fill(branch);
            Endabgabe.crc2.restore();
        } while (--nBranches > 0);
        Endabgabe.crc2.restore();
        Endabgabe.crc2.setTransform(transform);
    }
    Endabgabe.drawTree = drawTree;
    function drawSnowman(_position) {
        //console.log("Snowman");
        let snowman = new Path2D;
        let r1 = 80;
        let r2 = 50;
        let r3 = 35;
        snowman.arc(_position.x, _position.y, r1, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "white";
        Endabgabe.crc2.fill(snowman);
        let snowman1 = new Path2D;
        let y2 = 540 - (r1 + r2);
        snowman1.arc(_position.x + 7, y2, r2, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "white";
        Endabgabe.crc2.fill(snowman1);
        let snowman2 = new Path2D;
        let y3 = y2 + 20 - (r2 + r3);
        snowman2.arc(_position.x, y3, r3, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "white";
        Endabgabe.crc2.fill(snowman2);
        // let smile: Path2D = new Path2D;
        // smile.arc(_position.x, y3, 13, 0, Math.PI);
        // crc2.stroke(smile);
        let eye1 = new Path2D;
        eye1.arc(590, 330, 6, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "black";
        Endabgabe.crc2.fill(eye1);
        Endabgabe.crc2.stroke(eye1);
        let eye2 = new Path2D;
        eye2.arc(610, 335, 4, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "black";
        Endabgabe.crc2.fill(eye2);
        Endabgabe.crc2.stroke(eye2);
        let mouth = new Path2D;
        mouth.arc(585, 353, 4, 0, 2 * Math.PI);
        mouth.arc(595, 353, 4, 0, 2 * Math.PI);
        mouth.arc(605, 353, 4, 0, 2 * Math.PI);
        mouth.arc(615, 353, 4, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "grey";
        Endabgabe.crc2.fill(mouth);
    }
    Endabgabe.drawSnowman = drawSnowman;
    function drawBirdhouse() {
        // Gehäuse
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(0, -120);
        Endabgabe.crc2.fillStyle = "HSL(40, 80%, 25%)";
        Endabgabe.crc2.fillRect(130, 360, 50, -70);
        // Loch
        let hole = new Path2D;
        hole.arc(155, 325, 10, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "black";
        Endabgabe.crc2.fill(hole);
        Endabgabe.crc2.stroke(hole);
        // Dach
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(120, 290); // Strich
        Endabgabe.crc2.lineTo(155, 250); // Ecke oben
        Endabgabe.crc2.lineTo(190, 290);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fillStyle = "HSL(10, 80%, 10%)";
        Endabgabe.crc2.fill();
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.restore();
    }
    Endabgabe.drawBirdhouse = drawBirdhouse;
    // export function drawBirdsInTree(_position: VectorBack, _size: VectorBack): void {
    //     //console.log("Birds in Tree");
    //     let nBirds: number = 3;
    //     let radiusBird: number = 10 + Math.random() * 7;
    //     let bird: Path2D = new Path2D();
    //     bird.arc(0, 0, radiusBird, 0, 2 * Math.PI);
    //     let wing: number = 0 - radiusBird;
    //     bird.arc(wing, 0, radiusBird, 0, 0.5 * Math.PI);
    //     crc2.stroke(bird);
    //     let head: number = 0 - radiusBird;
    //     bird.arc(0, head, (1 / 2) * radiusBird, 0, 2 * Math.PI);
    //     crc2.save();
    //     crc2.translate(_position.x, _position.y);
    //     for (let drawn: number = 0; drawn < nBirds; drawn++) {
    //         let colorAngle: number = 120 - Math.random() * 290;
    //         let color: string = "HSLA(" + colorAngle + ", 90%, 50%, 1)";
    //         crc2.fillStyle = color;
    //         crc2.save();
    //         let x: number = Math.random() * _size.x;
    //         let y: number = - (Math.random() * _size.y);
    //         crc2.translate(x, y);
    //         crc2.fill(bird);
    //         crc2.restore();
    //     }
    //     crc2.restore();
    // }
    // console.log("Background, Mountains, Sun, Cloud, Tree, Birdhouse and Snowman created.");
    // export function drawSlingshotWoodenPart(_position: VectorBack): void {
    //     crc2.beginPath();
    //     crc2.fillStyle = "HSL(30, 80%, 30%)";
    //     crc2.fillRect(_position.x, _position.y, 10, 50);
    //     crc2.stroke();
    //     crc2.save();
    //     crc2.closePath();
    //     crc2.beginPath();
    //     crc2.moveTo(_position.x, _position.y); // Ecke oben an Stiel
    //     crc2.lineTo(_position.x, _position.y + 15); // Ecke unten an Stiel
    //     crc2.lineTo(_position.x - 40, _position.y - 30);
    //     crc2.lineTo(_position.x - 30, _position.y - 30);
    //     crc2.fillStyle = "HSL(30, 80%, 30%)";
    //     crc2.fill();
    //     crc2.closePath();
    //     crc2.beginPath();
    //     crc2.moveTo(_position.x + 10, _position.y); // Ecke oben an Stiel
    //     crc2.lineTo(_position.x + 10, _position.y + 15); // Ecke unten an Stiel
    //     crc2.lineTo(_position.x + 50, _position.y - 30);
    //     crc2.lineTo(_position.x + 40, _position.y - 30);
    //     crc2.fillStyle = "HSL(30, 80%, 30%)";
    //     crc2.fill();
    //     crc2.closePath();
    //     crc2.beginPath();
    //     crc2.moveTo(_position.x + 10, _position.y);
    //     crc2.lineTo(_position.x + 10, _position.y + 15);
    //     crc2.fillStyle = "HSL(30, 80%, 30%)";
    //     crc2.fill();
    //     crc2.closePath();
    // }
    function showScore() {
        Endabgabe.crc2.beginPath();
        //crc2.fillStyle = "darkred";
        Endabgabe.crc2.strokeRect(5, 5, 150, 40);
        Endabgabe.crc2.font = "20px Arial";
        Endabgabe.crc2.fillStyle = "white";
        Endabgabe.crc2.fillText("Punkte: " + Endabgabe.highscore, 20, 30);
    }
    Endabgabe.showScore = showScore;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=background.js.map