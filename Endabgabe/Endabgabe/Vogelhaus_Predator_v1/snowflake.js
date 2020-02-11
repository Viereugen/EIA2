"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Snowflake extends Endabgabe.Moveable {
        constructor() {
            super();
            // console.log("constructed");
            // Geschwindigkeit & Richtung
            let a = Math.random() * 1.5;
            let b = Math.random() * 7;
            this.velocity = new Endabgabe.Vector(a, b);
        }
        draw() {
            //console.log("drawn");
            let gradient = Endabgabe.crc2.createRadialGradient(0, 0, 0, 0, 0, 13);
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.save();
            Endabgabe.crc2.translate(this.position.x, this.position.y);
            // crc2.scale(this.size, this.size);
            Endabgabe.crc2.arc(0, 0, 3, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.8)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0.1)");
            Endabgabe.crc2.fillStyle = gradient;
            Endabgabe.crc2.fill();
            Endabgabe.crc2.restore();
            Endabgabe.crc2.closePath();
        }
    }
    Endabgabe.Snowflake = Snowflake;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Snowflake.js.map