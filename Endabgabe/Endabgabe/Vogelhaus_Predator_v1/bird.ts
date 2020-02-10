namespace Endabgabe {
    export class Bird extends Moveable {
        color: string;
        aim: Vector;
        isLured: boolean;
        isHit: boolean;
        score: number;

        constructor() {
            super();
            // console.log("constructed");

            // Geschwindigkeit & Richtung
            this.velocity = new Vector(-1, 1);

            // Farbe für Vögel
            this.color = Bird.getRandomColor();

            // anlockbare Vögel
            if (Math.random() <= 0.2) {
                this.isLured = true;
                console.log("I am lured & hungry.");
            } else {
                this.isLured = false;
            }
            this.isHit = false;
        }

        static getRandomColor(): string {
            let colorAngle: number = Math.random() * 150;
            let color: string = "HSLA(" + colorAngle + ", 100%, 35%, 1)";

            return color;
        }

        getFood(_mousePosition: Vector): void {
            this.aim = _mousePosition;
            let newVelocityX: number = (_mousePosition.x - this.position.x) * 0.01;
            let newVelocityY: number = (_mousePosition.y - this.position.y) * 0.01;
            let newVelocity: Vector = new Vector(newVelocityX, newVelocityY);
            this.velocity = newVelocity;
            // console.log("Birds are lured to food.");
        }

        eatFood(): void {
            if (this.aim && (this.position == this.aim || (this.position.x <= this.aim.x + 12 && this.position.y <= this.aim.y + 12 && this.position.x >= this.aim.x - 12 && this.position.y >= this.aim.y - 12))) {
                let stop: Vector = new Vector(0, 0);
                this.velocity = stop;
                // console.log("Birds stopped to eat.");
                this.aim = new Vector(1000, 1000);


                setTimeout(this.changeDirection, 1300);
            }
        }

        changeDirection(): void {
            for (let moveable of moveables) {
                if (moveable instanceof Bird && moveable.isLured) {
                    this.aim = new Vector(1000, 1000);
                    // if (Math.random() * 5 < 0.07) {
                    let a: number = Math.random() * 5;
                    let b: number = Math.random() * 5;
                    moveable.velocity = new Vector(a, b);
                    // }
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

        deleteBird(): void {                    //vllt verschieben
            for (let i: number = 0; i < moveables.length; i++) {
                if (moveables[i].isHit) {
                    if (moveables[i].isHit && moveables[i].isLured) {
                        moveables[i].score = 10;
                        highscore += moveables[i].score;
                        console.log("Your Highscore: " + highscore);
                    }
                    if (moveables[i].isHit && moveables[i].isPartyBird) {
                        moveables[i].score = 50;
                        highscore += moveables[i].score;
                        console.log("Your Highscore: " + highscore);
                    }
                    if (!moveables[i].isLured && !moveables[i].isPartyBird) {
                        moveables[i].score = 20;
                        highscore += moveables[i].score;
                        console.log("Your Highscore: " + highscore);
                    }
                    moveables.splice(i, 1);
                    console.log("Bird was hit and killed!");
                }
            }
        }


        draw(): void {

            //sitzende/laufende Vögel

            if (this.position.y >= 400) {
                crc2.fillStyle = this.color;
                crc2.beginPath();
                crc2.save();
                crc2.translate(this.position.x, this.position.y);
                crc2.ellipse(28, 30, 40, 20, Math.PI / 2 - 10, 0, 2 * Math.PI);
                crc2.closePath();

                crc2.arc(10, 0, 14, 0, 2 * Math.PI);
                crc2.closePath();
                crc2.fill();

                crc2.beginPath();
                crc2.moveTo(0, -5); // Strich
                crc2.lineTo(0, 5); // Ecke oben
                crc2.lineTo(-12, 8);
                crc2.closePath();
                crc2.fillStyle = "orange";
                crc2.fill();


                crc2.beginPath();
                crc2.moveTo(30, 55); // Strich
                crc2.lineTo(30, 65); // Ecke oben
                crc2.lineTo(18, 68);

                crc2.moveTo(38, 55); // Strich
                crc2.lineTo(38, 65); // Ecke oben
                crc2.lineTo(28, 68);

                crc2.fillStyle = "black";
                crc2.stroke();

                crc2.restore();
                crc2.closePath();
            }

            // fliegende Vögel

            else {
                crc2.fillStyle = this.color;
                crc2.beginPath();
                crc2.save();
                crc2.translate(this.position.x, this.position.y);
                crc2.ellipse(28, 30, 40, 20, 60, 0, 2 * Math.PI);
                crc2.arc(60, 20, 15, 0, 0.5 * Math.PI);
                crc2.closePath();

                crc2.arc(5, 5, 14, 0, 2 * Math.PI);
                crc2.closePath();
                crc2.fill();

                crc2.beginPath();
                crc2.moveTo(-5, 0); // Strich
                crc2.lineTo(-5, 10); // Ecke oben
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