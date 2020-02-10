namespace Endabgabe {
    export abstract class Moveable {
        position: Vector;
        velocity: Vector;
        isHit: boolean;
        isLured: boolean;
        score: number;
        isPartyBird: boolean; 

        constructor() {
            // console.log("constructed");   
                     
            let x: number = 800 * Math.random();
            let y: number = 700 * goldenRatio * Math.random();
            this.position = new Vector(x, y);

            // Geschwindigkeit & Richtung, wird von Subklassen überschrieben
            this.velocity = new Vector(0, 0);
        }

        move(): void {
            //console.log("moved");
            this.position.add(this.velocity);

            //Vogel-Endless-Schleife
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
            //console.log("Moveable drawn");
        }
    }
}