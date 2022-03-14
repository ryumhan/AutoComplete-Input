/* @date 2021-03-09
 * @author ryumhan
 */
import AutoInputComponent from "./components/AutoInputComponent.js";

/**
 * Main section For App running.
 * App only have AutoInputComponent Element.
 */
class Main {
    constructor() {
        const App = document.querySelector('#app');
        if (App instanceof HTMLElement) {
            new AutoInputComponent(App, {
                placeholder: "Title, Director, Actor", id: "customAuto", interval: 300
            });
        }
    }
}

new Main