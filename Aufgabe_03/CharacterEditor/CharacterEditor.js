"use strict";
var CharacterEditor;
(function (CharacterEditor) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Start");
        let form = document.querySelector("div#form");
        let slider = document.querySelector("input#amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        console.log(_event);
        let drink = document.querySelector("select");
        console.log(drink.value);
        let inputs = document.querySelectorAll("input");
        console.log(inputs);
        let order = document.querySelector("div#order");
        order.innerHTML = "";
        let totalPrice = 0;
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            if (entry[0] == "Amount") {
                order.innerHTML += item.value + " Liter<br />";
                totalPrice *= 2 * Number(item.value);
            }
            else {
                let price = Number(item.getAttribute("price"));
                totalPrice += price;
                order.innerHTML += item.value + " " + price + "  €" + "<br />";
            }
        }
        order.innerHTML += "Total " + Math.round(totalPrice * 100) / 100 + "  €" + "<br />";
    }
    function displayAmount(_event) {
        let progress = document.querySelector("progress");
        let amount = _event.target.value;
        progress.value = parseFloat(amount);
    }
})(CharacterEditor || (CharacterEditor = {}));
//# sourceMappingURL=CharacterEditor.js.map