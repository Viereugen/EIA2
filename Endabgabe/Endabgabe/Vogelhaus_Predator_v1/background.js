"use strict";
var Endabgabe;
(function (Endabgabe) {
    function drawBackground() {
        let gradient = Endabgabe.crc2.createLinearGradient(0, 0, 0, Endabgabe.crc2.canvas.height);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(Endabgabe.goldenRatio, "HSL(100, 30%, 90%)");
        gradient.addColorStop(1, "grey");
        Endabgabe.crc2.fillStyle = gradient;
        Endabgabe.crc2.fillRect(0, 0, Endabgabe.crc2.canvas.width, Endabgabe.crc2.canvas.height);
    }
    Endabgabe.drawBackground = drawBackground;
    function drawSun(_position) {
        let r1 = 25;
        let r2 = 100;
        let gradient = Endabgabe.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(90, 100%, 80%, 1");
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
        let nParticles = 50;
        let radiusParticle = 50;
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
        let stepMin = 50;
        let stepMax = 70;
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
        let maxRadius = 70;
        let branch = new Path2D();
        branch.arc(200, 470, maxRadius, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "HSL(15, 90%, 20%)"; // Baumstamm
        Endabgabe.crc2.fillRect(175, 450, 50, -200);
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(0, -120);
        do {
            let y = Math.random() * 250;
            let x = (Math.random() - 0.5) * 100;
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
        Endabgabe.crc2.save();
        Endabgabe.crc2.translate(0, -120);
        Endabgabe.crc2.fillStyle = "HSL(40, 80%, 25%)";
        Endabgabe.crc2.fillRect(130, 360, 50, -70);
        // Hole
        let hole = new Path2D;
        hole.arc(155, 325, 10, 0, 2 * Math.PI);
        Endabgabe.crc2.fillStyle = "black";
        Endabgabe.crc2.fill(hole);
        Endabgabe.crc2.stroke(hole);
        // Roof
        Endabgabe.crc2.beginPath();
        Endabgabe.crc2.moveTo(120, 290);
        Endabgabe.crc2.lineTo(155, 250);
        Endabgabe.crc2.lineTo(190, 290);
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.fillStyle = "HSL(10, 80%, 10%)";
        Endabgabe.crc2.fill();
        Endabgabe.crc2.closePath();
        Endabgabe.crc2.restore();
    }
    Endabgabe.drawBirdhouse = drawBirdhouse;
    function drawScore() {
        Endabgabe.crc2.beginPath();
        //crc2.fillStyle = "darkred";
        Endabgabe.crc2.strokeRect(5, 5, 150, 40);
        Endabgabe.crc2.font = "20px Arial";
        Endabgabe.crc2.fillStyle = "white";
        Endabgabe.crc2.fillText("Punkte: " + Endabgabe.highscore, 20, 30);
    }
    Endabgabe.drawScore = drawScore;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=background.js.map