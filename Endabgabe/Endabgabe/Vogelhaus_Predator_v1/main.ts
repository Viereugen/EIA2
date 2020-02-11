namespace Endabgabe {
    export interface VectorBack {
        x: number;
        y: number;
    }

    let url: string = "https://eiatestapp.herokuapp.com/";
    console.log(url);

    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
    export let goldenRatio: number = 0.62;

    export let moveables: Moveable[] = [];

    export let highscore: number = 0;
    console.log("Your Highscore: " + highscore);

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        drawSun({ x: 700, y: 75 });
        drawCloud({ x: 300, y: 125 }, { x: 400, y: 100 });
        drawMountains({ x: 0, y: crc2.canvas.height * goldenRatio }, 100, 200, "white", "darkgreen");
        drawMountains({ x: 0, y: crc2.canvas.height * goldenRatio }, 50, 150, "lightgrey", "grey");
        drawTree();
        drawBirdhouse();
        drawSnowman({ x: 600, y: 500 });

        let background: ImageData = crc2.getImageData(0, 0, 800, 600);

        drawBirds(25);
        drawSnowflakes(100);
        drawSnowball();
        canvas.addEventListener("click", throwSnowball);
        canvas.addEventListener("auxclick", throwFood); // nach rechtsklick suchen

        window.setTimeout(endTheGame, 20000);

        window.setInterval(update, 20, background); // triggert alle 20ms die update-Funktion für den Hintergrund & neue Position der animierten Elemente
    }

    function drawBirds(nBirds: number): void {
        console.log("(Hotdog) birds.");

        for (let i: number = 0; i < nBirds; i++) {
            let bird: Bird = new Bird();
            moveables.push(bird);
        }
    }

    function drawSnowflakes(nSnowflakes: number): void {
        console.log("Snowflakes.");

        for (let i: number = 0; i < nSnowflakes; i++) {
            let snowflake: Snowflake = new Snowflake();
            moveables.push(snowflake);
        }
    }


    export function deleteBird(): void {                
        for (let i: number = 0; i < moveables.length; i++) {
            let bird: Bird = moveables[i] as Bird; // typecast von Moveables zu Bird
            if (bird.isHit) {
                if (bird.isEating) {
                    highscore += 10;
                    console.log("Your Highscore: " + highscore);
                }
                if (!bird.isLured) {
                    highscore += 25;
                    console.log("Your Highscore: " + highscore);
                }
                moveables.splice(i, 1);
                console.log("Bird was hit and killed!");
            }
        }
    }

    function drawSnowball(): void {
        let snowball: Snowball = new Snowball();
        moveables.push(snowball);
    }


    function throwSnowball(_event: MouseEvent): void {
        console.log("Snowball thrown");
        let _mousePosition: Vector = new Vector(_event.clientX, _event.clientY);
        for (let moveable of moveables) {
            if (moveable instanceof Snowball) {
                moveable.targetBird(_mousePosition);
            }
        }
    }

    export function deleteSnowball(): void {
        for (let i: number = 0; i < moveables.length; i++) {
            if (moveables[i] instanceof Snowball) {
                moveables.splice(i, 1);
                // console.log("Sling was deleted.");
            }
        }
        drawSnowball();
    }

    function throwFood(_event: MouseEvent): void {

        console.log("Food thrown.");
        //console.log(_event);
        if (_event.clientY >= 400 && highscore >= 20) {
            let _mousePosition: Vector = new Vector(_event.clientX, _event.clientY);
            for (let moveable of moveables) {
                if (moveable instanceof Bird && moveable.isLured) {
                    //console.log(moveable.position);
                    moveable.getFood(_mousePosition);
                }
            }
            let food: Food = new Food(_mousePosition);
            moveables.push(food);
            highscore -= 20;
            setTimeout(deleteFood, 3000);
        }
    }

    function deleteFood(): void {
        for (let i: number = 0; i < moveables.length; i++) {
            if (moveables[i] instanceof Food) {
                moveables.splice(i, 1);
                console.log("All the food was eaten.");
            }
        }
    }


    function update(_background: ImageData): void {
        crc2.putImageData(_background, 0, 0);

        for (let moveable of moveables) {
            moveable.move();
            moveable.draw();
        }

        for (let moveable of moveables) {
            if (moveable instanceof Bird && moveable.isLured) {
                moveable.eatFood();
            }
        }

        for (let moveable of moveables) {
            if (moveable instanceof Snowball) {
                moveable.reachedTarget();
            }
        }

        for (let moveable of moveables) {
            if (moveable instanceof Bird && moveable.isHit) {
                deleteBird();
            }
        }
        showScore();
    }

    function endTheGame(): void {
        let name: any = prompt("Your Score " + highscore, "Please enter your name"); //dann beides in Datenbank! und wenn es ausgefüllt wurde zurück zur startseite!!
        if (name != null) {
            sendHighScore(name, highscore);
        }
        window.open("https://viereugen.github.io/EIA2/Endabgabe/Endabgabe/Vogelhaus_Predator_v1/startseite.html", "_self");
    }


    async function sendHighScore(_name: string, _highscore: number): Promise<void> {
        let query: string = "highscore=" + _highscore + "&name=" + _name;
        let response: Response = await fetch(url + "?" + query);
        alert(response);
    }
}
