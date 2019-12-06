
namespace L02_Load {
    window.addEventListener("DOMContentLoaded", handleLoad);

    function handleLoad(_event: Event): void {
        console.log(_event);
    }
}

/*
namespace Boxes {
    let n: number = 5;
    let color: string;
    let x: number = 0;
    let y: number = 0;
    
    for (let i: number = 0; i < n; i++) {
        y += (i == 2) ? 20 : 50;
        x = (x + 170) % 400;
        switch (i) {
            case 0:
                color = "#ff0000";
                break;
            case 1:
            case 4:
                color = "#00ff00";
                break;
            case 3:
                continue;
            default:
                color = "#0000ff";
        }
        
        for (let size of ["big", "medium", "small"]) {
            createBox(color, x, y, size);
            if (i == 4)
                break;
        }
    }


    function createBox(_color: string, _x: number, _y: number, _size: string): void {
        let div: HTMLDivElement = document.createElement("div");
        document.body.appendChild(div);
        div.classList.add(_size);
        div.style.backgroundColor = _color;
        div.style.left = _x + "px";
        div.style.top = _y + "px";
    }
}
*/

/*
namespace Cows {
    let nums: number[] = [2, 6, 5];
    let results: string[] = [];
    for (let i: number = 0; i < nums.length; i++) {
        let result: string = createCall("m", nums[i]);
        results.push(result);
    }
    console.log(results);

    function createCall(_start: string, _length: number): string {
        for (let k: number = _length; k > 0; k--) {
            if (k == 1 || k == _length / 2)
                _start += "h";
            _start += "u";
        }
        return _start;
    }
}
*/


/*
let v: boolean = true;
console.log(v);

let a = [7, true, "Hallo"];
console.log(a);
a[4] = [101, 102];

let s = {"zahl": 7, wahr: true, "text": "Hallo"};       //Wann müssen Key-Words "" haben?
console.log(s["wahr"]);                                 //Zwei Schreibweisen
console.log(s.zahl);

interface MapStringToBoolean {
    [key: string]: boolean;
}
let m: MapStringToBoolean = {"wert1": true, "wert2": false};
console.log(m);

interface VectorWithMeaning {
    x: number;
    y: number;
    meaning: string;
}
let vector: VectorWithMeaning = {x: 12.4, y: -7.2, meaning: "Ortsvektor"};
console.log(vector);

let v1: number = 5;
let v2: number = 4;
v2 = v1;
v1 = 3;
console.log(v1);
console.log(v2);
*/
