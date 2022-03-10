/* @date 2021-03-09
 * @author ryumhan
 */
import AutoInputComponent from "./components/AutoInputComponent.js";

class Main {
    constructor() {
        const App = document.querySelector('#app');
        if (App instanceof HTMLElement) {
            new AutoInputComponent(App, { placeholder: "Title,Director,Actor", id: "customAuto", listId: "autolist" });
        }
    }
}

new Main