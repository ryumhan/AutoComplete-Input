/* @date 2021-03-09
 * @author ryumhan
 */

require("../simple.css");

import AutoInputComponent from "./components/AutoInputComponent";

/**
 * Main section For App running.
 * App only have AutoInputComponent Element.
 */
const App = document.querySelector('#app');

function render() {
    /**
     * requestAnimationFrame doesn't district main thread
     */
    requestAnimationFrame(() => {
        if (App instanceof HTMLElement) {
            new AutoInputComponent(App, {
                placeholder: "Title, Director, Actors", id: "customAuto", interval: 300
            });
        }
    })
}

render();