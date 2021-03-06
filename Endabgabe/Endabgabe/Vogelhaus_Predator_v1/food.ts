namespace Endabgabe {
    export class Food extends Moveable {

        constructor(_position: Vector) {
            super();
            this.position = new Vector(_position.x, _position.y);
            // Geschwindigkeit & Richtung
            this.velocity = new Vector(0, 0);
        }
//
        draw(): void {

            for (let i: number = 0; i < 10 ; i++) {

            crc2.beginPath();
            crc2.save();

            crc2.translate(this.position.x + i, this.position.y);
            crc2.arc(0, 0, 5, 0, 2 * Math.PI);

            crc2.fillStyle = "HSLA(20, 70%, 30%, 0.5)";
            crc2.fill();
            crc2.restore();
            crc2.closePath();

            }
        }
    }
}