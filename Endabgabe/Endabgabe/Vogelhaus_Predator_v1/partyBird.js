"use strict";
var Endabgabe;
(function (Endabgabe) {
    class PartyBird extends Endabgabe.Moveable {
        constructor() {
            super();
            this.isPartyBird = true;
            //console.log("constructed");
            let x = 800 * Math.random();
            let y = 700 * Endabgabe.goldenRatio * Math.random();
            this.position = new Endabgabe.Vector(x, y);
            // Geschwindigkeit & Richtung
            this.velocity = new Endabgabe.Vector(-4, 3);
            this.isHit = false;
        }
        hitPartyBird(_mousePosition) {
            this.aim = _mousePosition;
            if (this.aim && (this.position == this.aim || (this.position.x <= this.aim.x + 10 && this.position.y <= this.aim.y + 10 && this.position.x >= this.aim.x - 10 && this.position.y >= this.aim.y - 10))) {
                this.isHit = true;
                console.log("Partybird is hit: " + this.isHit);
            }
        }
        draw() {
            //sitzender/laufender Vogel
            if (this.position.y >= 490) {
                Endabgabe.crc2.beginPath();
                Endabgabe.crc2.save();
                Endabgabe.crc2.translate(this.position.x, this.position.y);
                Endabgabe.crc2.arc(0, 0, 15, 0, 2 * Math.PI);
                let head = -15;
                Endabgabe.crc2.arc(head, 0, 15, 0, 0.5 * Math.PI);
                Endabgabe.crc2.arc(0, head, (1 / 2) * 15, 0, 2 * Math.PI);
                for (let drawn = 0; drawn < 20; drawn++) {
                    let colorAngle = 120 - Math.random() * 320;
                    let color = "HSLA(" + colorAngle + ", 90%, 60%, 1)";
                    Endabgabe.crc2.fillStyle = color;
                    Endabgabe.crc2.fill();
                    // crc2.restore();
                }
                Endabgabe.crc2.restore();
                Endabgabe.crc2.closePath();
            }
            // fliegender Vogel
            else {
                Endabgabe.crc2.beginPath();
                Endabgabe.crc2.save();
                Endabgabe.crc2.translate(this.position.x, this.position.y);
                Endabgabe.crc2.arc(0, 0, 15, 0, 2 * Math.PI);
                Endabgabe.crc2.arc(-15, -2, (1 / 2) * 15, 0, 2 * Math.PI);
                Endabgabe.crc2.ellipse(5, -5, (1 / 3) * 15, 15, 13, 0, 2 * Math.PI);
                for (let drawn = 0; drawn < 20; drawn++) {
                    let colorAngle = 120 - Math.random() * 290;
                    let color = "HSLA(" + colorAngle + ", 90%, 50%, 0.7)";
                    Endabgabe.crc2.fillStyle = color;
                    Endabgabe.crc2.fill();
                    // crc2.restore();
                }
                Endabgabe.crc2.restore();
                Endabgabe.crc2.closePath();
            }
        }
    }
    Endabgabe.PartyBird = PartyBird;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=partyBird.js.map