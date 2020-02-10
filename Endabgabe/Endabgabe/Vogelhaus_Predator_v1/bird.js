"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Bird extends Endabgabe.Moveable {
        constructor() {
            super();
            // console.log("constructed");
            // Geschwindigkeit & Richtung
            this.velocity = new Endabgabe.Vector(-1, 1);
            // Farbe für Vögel
            this.color = Bird.getRandomColor();
            // anlockbare Vögel
            if (Math.random() <= 0.2) {
                this.isLured = true;
                console.log("I am lured & hungry.");
            }
            else {
                this.isLured = false;
            }
            this.isHit = false;
        }
        static getRandomColor() {
            let colorAngle = Math.random() * 150;
            let color = "HSLA(" + colorAngle + ", 100%, 35%, 1)";
            return color;
        }
        getFood(_mousePosition) {
            this.aim = _mousePosition;
            let newVelocityX = (_mousePosition.x - this.position.x) * 0.01;
            let newVelocityY = (_mousePosition.y - this.position.y) * 0.01;
            let newVelocity = new Endabgabe.Vector(newVelocityX, newVelocityY);
            this.velocity = newVelocity;
            // console.log("Birds are lured to food.");
        }
        eatFood() {
            if (this.aim && (this.position == this.aim || (this.position.x <= this.aim.x + 12 && this.position.y <= this.aim.y + 12 && this.position.x >= this.aim.x - 12 && this.position.y >= this.aim.y - 12))) {
                let stop = new Endabgabe.Vector(0, 0);
                this.velocity = stop;
                // console.log("Birds stopped to eat.");
                this.aim = new Endabgabe.Vector(1000, 1000);
                setTimeout(this.changeDirection, 1300);
            }
        }
        changeDirection() {
            for (let moveable of Endabgabe.moveables) {
                if (moveable instanceof Bird && moveable.isLured) {
                    this.aim = new Endabgabe.Vector(1000, 1000);
                    // if (Math.random() * 5 < 0.07) {
                    let a = Math.random() * 5;
                    let b = Math.random() * 5;
                    moveable.velocity = new Endabgabe.Vector(a, b);
                    // }
                }
            }
        }
        hitBird(_mousePosition) {
            this.aim = _mousePosition;
            if (this.aim && (this.position == this.aim || (this.position.x <= this.aim.x + 27 && this.position.y <= this.aim.y + 27 && this.position.x >= this.aim.x - 27 && this.position.y >= this.aim.y - 27))) {
                this.isHit = true;
                console.log("Bird is hit: " + this.isHit);
            }
        }
        draw() {
            //sitzende/laufende Vögel
            if (this.position.y >= 400) {
                Endabgabe.crc2.fillStyle = this.color;
                Endabgabe.crc2.beginPath();
                Endabgabe.crc2.save();
                Endabgabe.crc2.translate(this.position.x, this.position.y);
                Endabgabe.crc2.ellipse(28, 30, 40, 20, Math.PI / 2 - 10, 0, 2 * Math.PI);
                Endabgabe.crc2.closePath();
                Endabgabe.crc2.arc(10, 0, 14, 0, 2 * Math.PI);
                Endabgabe.crc2.closePath();
                Endabgabe.crc2.fill();
                Endabgabe.crc2.beginPath();
                Endabgabe.crc2.moveTo(0, -5); // Strich
                Endabgabe.crc2.lineTo(0, 5); // Ecke oben
                Endabgabe.crc2.lineTo(-12, 8);
                Endabgabe.crc2.closePath();
                Endabgabe.crc2.fillStyle = "orange";
                Endabgabe.crc2.fill();
                Endabgabe.crc2.beginPath();
                Endabgabe.crc2.moveTo(30, 55); // Strich
                Endabgabe.crc2.lineTo(30, 65); // Ecke oben
                Endabgabe.crc2.lineTo(18, 68);
                Endabgabe.crc2.moveTo(38, 55); // Strich
                Endabgabe.crc2.lineTo(38, 65); // Ecke oben
                Endabgabe.crc2.lineTo(28, 68);
                Endabgabe.crc2.fillStyle = "black";
                Endabgabe.crc2.stroke();
                Endabgabe.crc2.restore();
                Endabgabe.crc2.closePath();
            }
            // fliegende Vögel
            else {
                Endabgabe.crc2.fillStyle = this.color;
                Endabgabe.crc2.beginPath();
                Endabgabe.crc2.save();
                Endabgabe.crc2.translate(this.position.x, this.position.y);
                Endabgabe.crc2.ellipse(28, 30, 40, 20, 60, 0, 2 * Math.PI);
                Endabgabe.crc2.arc(60, 20, 15, 0, 0.5 * Math.PI);
                Endabgabe.crc2.closePath();
                Endabgabe.crc2.arc(5, 5, 14, 0, 2 * Math.PI);
                Endabgabe.crc2.closePath();
                Endabgabe.crc2.fill();
                Endabgabe.crc2.beginPath();
                Endabgabe.crc2.moveTo(-5, 0); // Strich
                Endabgabe.crc2.lineTo(-5, 10); // Ecke oben
                Endabgabe.crc2.lineTo(-20, 10);
                Endabgabe.crc2.closePath();
                Endabgabe.crc2.fillStyle = "orange";
                Endabgabe.crc2.fill();
                Endabgabe.crc2.closePath();
                Endabgabe.crc2.restore();
            }
        }
    }
    Endabgabe.Bird = Bird;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=bird.js.map