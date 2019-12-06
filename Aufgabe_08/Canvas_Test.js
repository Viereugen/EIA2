"use strict";
var L08;
(function (L08) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        console.log(document.querySelector("canvas"));
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        crc2.fillStyle = "#00fa83";
        crc2.fillRect(0, 0, 500, 1000);
        // x	    The x-coordinate of the upper-left corner of the rectangle	
        // y	    The y-coordinate of the upper-left corner of the rectangle	
        // width	The width of the rectangle, in pixels	
        // height	The height of the rectangle, in pixels
        crc2.clearRect(30, 20, 90, 50);
        crc2.strokeRect(40, 30, 20, 20);
        crc2.strokeRect(90, 30, 20, 20);
        crc2.beginPath();
        crc2.arc(50, 100, 20, 0, 1.5 * Math.PI);
        // x	    The x-coordinate of the center of the circle	
        // y	    The y-coordinate of the center of the circle	
        // r	    The radius of the circle	
        // sAngle	The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)	
        // eAngle	The ending angle, in radians
        crc2.closePath();
        crc2.strokeStyle = "blue";
        crc2.stroke();
        crc2.beginPath();
        crc2.ellipse(100, 100, 15, 25, 0, 0, 2 * Math.PI);
        // x    The x-axis coordinate of the center.
        // y    The y-axis coordinate of the center.
        // radiusX
        // radiusY
        // rotation
        // start Angle
        // endAngle
        crc2.stroke();
        crc2.beginPath();
        crc2.moveTo(200, 50);
        crc2.lineTo(200, 100);
        crc2.lineTo(250, 100);
        crc2.closePath();
        crc2.stroke();
        // Bezier kurven Test /  Muss man Code Verstehen? (This)
        crc2.fillStyle = "#ffffff";
        crc2.fillText("blablaTest", 120, 100);
        //Unterschied Stroke und Fill ?
        let path = new Path2D();
        path.arc(60, 60, 50, 0, 2 * Math.PI);
        crc2.strokeStyle = "red";
        crc2.stroke(path);
        //translate(), rotate(), scale()
        //resetTransform() ,  save()/restore(), getTransform()/setTransform
        // let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 100);
        // gradient.addColorStop(0, "black");
        // gradient.addColorStop(.3, "black");
        // gradient.addColorStop(.3, "red");
        // gradient.addColorStop(.7, "red");
        // gradient.addColorStop(.7, "gold");
        // gradient.addColorStop(1, "gold");
        // crc2.fillStyle = gradient;
        // crc2.fillRect(0, 0, 200, 100);
        // //DEUTSCHLANDFLAGGE
        // let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D> document.createElement('canvas').getContext('2d');
        // pattern.canvas.width = 40;
        // pattern.canvas.height = 20;
        // pattern.fillStyle = '#fec';
        // pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        // pattern.moveTo(0, 10);
        // pattern.lineTo(10, 10);
        // pattern.lineTo(20, 0);
        // pattern.lineTo(30, 0);
        // pattern.lineTo(40, 10);
        // pattern.lineTo(30, 20);
        // pattern.lineTo(20, 20);
        // pattern.lineTo(10, 10);
        // pattern.stroke();
        // crc2.fillStyle = crc2.createPattern(pattern.canvas, 'repeat');
        // crc2.fillRect(0, 0, canvas.width, canvas.height);
        // // function getRNGNumber(_maxNumber: number): number {
        // //     return Math.floor(Math.random() * _maxNumber); }
        // console.log(crc2);
    }
})(L08 || (L08 = {}));
//# sourceMappingURL=Canvas_Test.js.map