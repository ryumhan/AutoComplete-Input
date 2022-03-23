/* @date 2021-03-09
 * @author ryumhan
 */

require("../simple.css");

import AutoInputComponent from "./components/AutoInputComponent";

/**
 * Main section For App running.
 * App only have AutoInputComponent Element.
 */
const inputElement = document.querySelector('#autocomplete-input');

function render() {
    /**
     * requestAnimationFrame doesn't district main thread
     */
    requestAnimationFrame(() => {
        if (inputElement instanceof HTMLElement) {
            new AutoInputComponent(inputElement, {
                placeholder: "Title, Director, Actors", id: "customAuto", interval: 300
            });
        }
    })
}

render();