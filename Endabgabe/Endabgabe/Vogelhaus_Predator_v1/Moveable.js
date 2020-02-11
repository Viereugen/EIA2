"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Moveable {
        constructor() {
            let x = 800 * Math.random();
            let y = 700 * Endabgabe.goldenRatio * Math.random();
            this.position = new Endabgabe.Vector(x, y);
            // Geschwindigkeit & Richtung, wird von Subklassen überschrieben
            this.velocity = new Endabgabe.Vector(0, 0);
        }
        move() {
            this.position.add(this.velocity);
            //Bird-Loop
            if (this.position.x < -50)
                this.position.x += Endabgabe.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += Endabgabe.crc2.canvas.height;
            if (this.position.x > 800)
                this.position.x -= Endabgabe.crc2.canvas.width;
            if (this.position.y > 600)
                this.position.y -= Endabgabe.crc2.canvas.height;
        }
        draw() {
            //console.log("draw it");
        }
    }
    Endabgabe.Moveable = Moveable;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=moveable.js.map