namespace Endabgabe {
    export class Bird extends Moveable {
        color: string;
        aim: Vector;
        isHungry: boolean;
        isEating: boolean;
        isHit: boolean;

        constructor() {

            super();            
            this.velocity = new Vector(Math.random() * -2, -1 + Math.random() * 3);
            this.color = Bird.getRandomColor();

            // hungrige Vögel
            if (Math.random() <= 0.3) {
                this.isHungry = true;
                console.log("I am lured & hungry.");
            } else {
                this.isHungry = false;
            }
            this.isHit = false;
            this.isEating = false;
        }

        static getRandomColor(): string {
            let colorAngle: number = Math.random() * 150;
            let color: string = "HSLA(" + colorAngle + ", 100%, 35%, 1)";

            return color;
        }

        getFood(_mousePosition: Vector): void {
            this.aim = _mousePosition;
            this.isEating = true;
            let newVelocityX: number = (_mousePosition.x - this.position.x) * 0.01;
            let newVelocityY: number = (_mousePosition.y - this.position.y) * 0.01;
            let newVelocity: Vector = new Vector(newVelocityX, newVelocityY);
            this.velocity = newVelocity;
        }

        eatFood(): void {
            if (this.aim && this.isEating && (this.position == this.aim || (this.position.x <= this.aim.x + 12 && this.position.y <= this.aim.y + 12 && this.position.x >= this.aim.x - 12 && this.position.y >= this.aim.y - 12))) {
                let stop: Vector = new Vector(0, 0);
                this.velocity = stop;
                this.aim = new Vector(1000, 1000);


                setTimeout(this.changeDirection, 2000);
            }
        }

        changeDirection(): void {
            for (let i: number = 0; i <= moveables.length; i++) {
                if (moveables[i] instanceof Bird) {
                    let bird: Bird = moveables[i] as Bird;
                    if (bird.isHungry) {
                        let a: number = Math.random() * -4;
                        let b: number = 1 - Math.random() * 4;
                        bird.velocity = new Vector(a, b);
                        bird.isEating = false;
                    }
                }
            }
        }

        hitBird(_mousePosition: Vector): void {
            this.aim = _mousePosition;
            if (this.aim && (this.position == this.aim || (this.position.x <= this.aim.x + 27 && this.position.y <= this.aim.y + 27 && this.position.x >= this.aim.x - 27 && this.position.y >= this.aim.y - 27))) {
                this.isHit = true;
                console.log("Bird is hit: " + this.isHit);
            }
        }
        //
        draw(): void {

            //laufende Vögel
            if (this.position.y >= 400) {

                // Körper
                crc2.fillStyle = this.color;
                crc2.beginPath();
                crc2.save();
                crc2.translate(this.position.x, this.position.y);
                crc2.ellipse(28, 30, 40, 20, Math.PI / 2 - 10, 0, 2 * Math.PI);
                crc2.closePath();

                // Kopf
                crc2.arc(10, 0, 14, 0, 2 * Math.PI);
                crc2.closePath();
                crc2.fill();

                // Schnabel
                crc2.beginPath();
                crc2.moveTo(0, -5); 
                crc2.lineTo(0, 5); // Obere Ecke
                crc2.lineTo(-12, 8);
                crc2.closePath();
                crc2.fillStyle = "orange";
                crc2.fill();

                // Füße
                crc2.beginPath();
                crc2.moveTo(30, 55); 
                crc2.lineTo(30, 65); // Obere Ecke
                crc2.lineTo(18, 68);

                crc2.moveTo(38, 55);
                crc2.lineTo(38, 65); // Obere Ecke
                crc2.lineTo(28, 68);

                crc2.fillStyle = "black";
                crc2.stroke();

                crc2.restore();
                crc2.closePath();
            }

            // fliegende Vögel
            else {
                // Körper
                crc2.fillStyle = this.color;
                crc2.beginPath();
                crc2.save();
                crc2.translate(this.position.x, this.position.y);
                crc2.ellipse(28, 30, 40, 20, 60, 0, 2 * Math.PI);
                crc2.arc(60, 20, 15, 0, 0.5 * Math.PI);
                crc2.closePath();
                // Kopf
                crc2.arc(5, 5, 14, 0, 2 * Math.PI);
                crc2.closePath();
                crc2.fill();
                // Schnabel
                crc2.beginPath();
                crc2.moveTo(-5, 0); 
                crc2.lineTo(-5, 10); // Obere Ecke
                crc2.lineTo(-20, 10);
                crc2.closePath();
                crc2.fillStyle = "orange";
                crc2.fill();

                crc2.closePath();

                crc2.restore();

            }
        }
    }
}