namespace Endabgabe {
    window.addEventListener("load", handleLoad);

    let url: string = "https://eiatestapp.herokuapp.com/";

    function handleLoad(_event: Event): void {
    document.getElementById("highscoreButton").addEventListener("click", displayHighScore);
    }
    //
    async function displayHighScore(_event: Event): Promise<void> {
        let query: string = "command=retrieve";
        let response: Response = await fetch(url + "?" + query);
        let responseText: string = await response.text();
        
        let highscorelists: HTMLDivElement = <HTMLDivElement>document.querySelector("div#serverResponse");
        highscorelists.innerText = responseText;
    }
}