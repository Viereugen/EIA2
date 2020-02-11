namespace Endabgabe {
    export abstract class Moveable {
        position: Vector;
        velocity: Vector;

        constructor() {                     
            let x: number = 800 * Math.random();
            let y: number = 700 * goldenRatio * Math.random();
            this.position = new Vector(x, y);

            // Geschwindigkeit & Richtung, wird von Subklassen überschrieben
            this.velocity = new Vector(0, 0);
        }

        move(): void {
            this.position.add(this.velocity);

            //Bird-Loop
            if (this.position.x < -50)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > 800)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > 600)
                this.position.y -= crc2.canvas.height;
            }

        draw(): void {
            //console.log("draw it");
        }
    }
}