namespace Endabgabe {
    export class Snowflake extends Moveable {
        
        constructor() {
            super();

            // Geschwindigkeit & Richtung
            let a: number = Math.random() * 1.5;
            let b: number = Math.random() * 7 ;
            this.velocity = new Vector(a, b);
        }

        draw(): void {

            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, 13);

            crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            // crc2.scale(this.size, this.size);
            crc2.arc(0, 0, 3, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.8)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0.1)");

            crc2.fillStyle = gradient;
            crc2.fill();
            crc2.restore();
            crc2.closePath();
        }
    }
}