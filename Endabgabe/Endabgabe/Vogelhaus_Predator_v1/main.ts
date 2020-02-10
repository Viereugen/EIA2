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
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");  //Nachschauen
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBackground();
        drawSun({ x: 700, y: 75 });
        drawCloud({ x: 300, y: 125 }, { x: 350, y: 105 });
        drawMountains({ x: 0, y: crc2.canvas.height * goldenRatio }, 80, 200, "white", "darkgreen");
        drawMountains({ x: 0, y: crc2.canvas.height * goldenRatio }, 40, 180, "lightgrey", "grey");
        drawTree();
        drawSnowman({ x: 600, y: 500 });
        drawBirdhouse();
        // drawBirdsInTree({ x: 510, y: 400 }, { x: 180, y: 120 });
        //showScore();

        let background: ImageData = crc2.getImageData(0, 0, 800, 600);

        drawBirds(25);
        drawSnowflakes(100);
        // drawPartyBird(3);
        drawSlingshot();
        canvas.addEventListener("click", useSlingshot);
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

    // function drawPartyBird(nBirds: number): void {
    //     console.log("Party Bird.");
    //     for (let i: number = 0; i < nBirds; i++) {
    //         let partyBird: PartyBird = new PartyBird();
    //         moveables.push(partyBird);
    //     }
    // }


    export function deleteBird(): void {                    //vllt verschieben
        for (let i: number = 0; i < moveables.length; i++) {
            if (moveables[i].isHit) {
                if (moveables[i].isHit && moveables[i].isLured) {
                    moveables[i].score = 10;
                    highscore += moveables[i].score;
                    console.log("Your Highscore: " + highscore);
                }
                if (!moveables[i].isLured) {
                    moveables[i].score = 20;
                    highscore += moveables[i].score;
                    console.log("Your Highscore: " + highscore);
                }
                moveables.splice(i, 1);
                console.log("Bird was hit and killed!");
            }
        }
    }

    function drawSlingshot(): void {
        //console.log("Slingshot.");
        let slingShot: Slingshot = new Slingshot();
        moveables.push(slingShot);
    }


    function useSlingshot(_event: MouseEvent): void {
        console.log("Slingshot used.");
        let _mousePosition: Vector = new Vector(_event.clientX, _event.clientY);
        for (let moveable of moveables) {
            if (moveable instanceof Slingshot) {
                // console.log("Slingshot started.");
                moveable.targetBird(_mousePosition);
            }
        }
    }

    export function deleteSlingshot(): void {
        for (let i: number = 0; i < moveables.length; i++) {
            if (moveables[i] instanceof Slingshot) {
                moveables.splice(i, 1);
                // console.log("Sling was deleted.");
            }
        }
        drawSlingshot();
    }

    function throwFood(_event: MouseEvent): void {

        console.log("Food thrown.");
        //console.log(_event);

        let _mousePosition: Vector = new Vector(_event.clientX, _event.clientY);
        for (let moveable of moveables) {
            if (moveable instanceof Bird && moveable.isLured) {
                //console.log(moveable.position);
                moveable.getFood(_mousePosition);
            }
        }
        let food: Food = new Food(_mousePosition);
        moveables.push(food);

        setTimeout(deleteFood, 3000);
    }

    function deleteFood(): void {
        for (let i: number = 0; i < moveables.length; i++) {
            if (moveables[i] instanceof Food) {
                moveables.splice(i, 1);
                console.log("All the food was eaten.");
            }
        }
    }

    // function showScore(): void {
    //     crc2.fillStyle = "#0f0f0f";
    //     crc2.fillRect(700, 0, 200, 80);
    //     crc2.font = "20px Typescript";
    //     crc2.fillStyle = "white";
    //     crc2.fillText("Score: ", 660, 25);

    //     crc2.fillText("" + highscore, 720, 25);
    //     crc2.font = "20px Typescript";
    // }

    // update Background & Animation
    function update(_background: ImageData): void {
        //console.log("updated");
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
            if (moveable instanceof Slingshot) {
                moveable.reachedTarget();
            }
        }

        for (let moveable of moveables) {
            if (moveable instanceof Bird && moveable.isHit) {
                deleteBird();
            }
        }
        showScore();
        // drawSlingshotWoodenPart({ x: crc2.canvas.width - 55, y: crc2.canvas.height + 70 });
        // showScore();
    }

    function endTheGame(): void {
        let name: any = prompt("Your Score " + highscore, "Please enter your name"); //dann beides in Datenbank! und wenn es ausgefüllt wurde zurück zur startseite!!
        if (name != null) {
            sendHighScore(name, highscore);
            //self das es 
        }
        window.open("https://melreinhardt.github.io/mrhdt.eia2/Vogelhaus/startingPage.html", "_self");
    }


    function sendHighScore(_name: string, _highscore: number): void {
        let query: string = "highscore=" + _highscore + "&name=" + _name;
        let response: Promise<Response> = fetch(url + "?" + query);
        //let responseText: Promise<string> = response.text();
        alert(response);
    }
}
