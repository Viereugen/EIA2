namespace Endabgabe {

    export function drawBackground(): void {

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(goldenRatio, "HSL(100, 30%, 90%)");
        gradient.addColorStop(1, "grey");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    export function drawSun(_position: BackgroundVektor): void {

        let r1: number = 25;
        let r2: number = 100;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(90, 100%, 80%, 1");
        gradient.addColorStop(1, "HSLA(90, 100%, 40%, 0");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    export function drawCloud(_position: BackgroundVektor, _size: BackgroundVektor): void {
        let nParticles: number = 50;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.3)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();
    }

    export function drawMountains(_position: BackgroundVektor, _min: number, _max: number, _colorHigh: string, _colorLow: string): void {
        let stepMin: number = 50;
        let stepMax: number = 70;
        let x: number = 0;

        crc2.save();

        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }

    export function drawTree(): void {
        let transform: DOMMatrix = crc2.getTransform();

        let nBranches: number = 100;
        let maxRadius: number = 70;
        let branch: Path2D = new Path2D();
        branch.arc(200, 470, maxRadius, 0, 2 * Math.PI);

        crc2.fillStyle = "HSL(15, 90%, 20%)"; // Baumstamm
        crc2.fillRect(175, 450, 50, -200);
        crc2.save();
        crc2.translate(0, -120);

        do {
            let y: number = Math.random() * 250;
            let x: number = (Math.random() - 0.5) * 100;

            crc2.save();
            crc2.translate(0, -y);
            crc2.translate(x, 0);

            let colorAngle: number = 100 - Math.random() * 60;
            let color: string = "HSLA(" + colorAngle + ", 70%, 30%, 0.7)";

            crc2.fillStyle = color;
            crc2.fill(branch);
            crc2.restore();
        } while (--nBranches > 0);

        crc2.restore();
        crc2.setTransform(transform);
    }

    export function drawSnowman(_position: BackgroundVektor): void {

        let snowman: Path2D = new Path2D;
        let r1: number = 80;
        let r2: number = 50;
        let r3: number = 35;

        snowman.arc(_position.x, _position.y, r1, 0, 2 * Math.PI);
        crc2.fillStyle = "white";
        crc2.fill(snowman);


        let snowman1: Path2D = new Path2D;
        let y2: number = 540 - (r1 + r2);

        snowman1.arc(_position.x + 7, y2, r2, 0, 2 * Math.PI);
        crc2.fillStyle = "white";
        crc2.fill(snowman1);

        let snowman2: Path2D = new Path2D;
        let y3: number = y2 + 20 - (r2 + r3);

        snowman2.arc(_position.x, y3, r3, 0, 2 * Math.PI);
        crc2.fillStyle = "white";
        crc2.fill(snowman2);

        let eye1: Path2D = new Path2D;

        eye1.arc(590, 330, 6, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill(eye1);
        crc2.stroke(eye1);

        let eye2: Path2D = new Path2D;

        eye2.arc(610, 335, 4, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill(eye2);
        crc2.stroke(eye2);

        let mouth: Path2D = new Path2D;

        mouth.arc(585, 353, 4, 0, 2 * Math.PI);
        mouth.arc(595, 353, 4, 0, 2 * Math.PI);
        mouth.arc(605, 353, 4, 0, 2 * Math.PI);
        mouth.arc(615, 353, 4, 0, 2 * Math.PI);


        crc2.fillStyle = "grey";
    
        crc2.fill(mouth);

    }

    export function drawBirdhouse(): void {

        crc2.save();
        crc2.translate(0, -120);
        crc2.fillStyle = "HSL(40, 80%, 25%)";
        crc2.fillRect(130, 360, 50, -70);

        // Hole
        let hole: Path2D = new Path2D;
        hole.arc(155, 325, 10, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill(hole);
        crc2.stroke(hole);

        // Roof
        crc2.beginPath();
        crc2.moveTo(120, 290); 
        crc2.lineTo(155, 250); 
        crc2.lineTo(190, 290);
        crc2.closePath();
        crc2.fillStyle = "HSL(10, 80%, 10%)";
        crc2.fill();
        crc2.closePath();
        crc2.restore();

    }

    
    export function drawScore(): void {
        crc2.beginPath();
        crc2.strokeRect(5, 5, 150, 40);
        crc2.font = "20px Arial";
        crc2.fillStyle = "white";
        crc2.fillText("Punkte: " + highscore, 20, 30);
    }
}