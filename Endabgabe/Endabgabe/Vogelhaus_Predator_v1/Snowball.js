"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Snowball extends Endabgabe.Moveable {
        constructor() {
            super();
            this.position = new Endabgabe.Vector(Endabgabe.crc2.canvas.width - 60, Endabgabe.crc2.canvas.height - 60);
            // Geschwindigkeit & Richtung
            this.velocity = new Endabgabe.Vector(0, 0);
        }
        //
        targetBird(_mousePosition) {
            this.aim = _mousePosition;
            let newVelocityX = (_mousePosition.x - this.position.x) * 0.09;
            let newVelocityY = (_mousePosition.y - this.position.y) * 0.09;
            let newVelocity = new Endabgabe.Vector(newVelocityX, newVelocityY);
            this.velocity = newVelocity;
        }
        reachedTarget() {
            if (this.aim && (this.position == this.aim || (this.position.x <= this.aim.x + 10 && this.position.y <= this.aim.y + 10 && this.position.x >= this.aim.x - 10 && this.position.y >= this.aim.y - 10))) {
                let stop = new Endabgabe.Vector(0, 0);
                this.velocity = stop;
                for (let moveable of Endabgabe.moveables) {
                    if (moveable instanceof Endabgabe.Bird) {
                        moveable.hitBird(this.aim);
                    }
                }
                setTimeout(Endabgabe.deleteSnowball, 500);
            }
        }
        draw() {
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.save();
            Endabgabe.crc2.translate(this.position.x, this.position.y);
            Endabgabe.crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            Endabgabe.crc2.fillStyle = "white";
            Endabgabe.crc2.fill();
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.restore();
            Endabgabe.crc2.closePath();
        }
    }
    Endabgabe.Snowball = Snowball;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Snowball.js.map