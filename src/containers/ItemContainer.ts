/* @date 2021-03-09
* @author ryumhan
*/

import { InputHandler } from "../core/InputHandler.js";
import ItemList from "../components/ItemList.js";

//Define ItemList, ClearBtn for custom usage
customElements.define("item-list", ItemList);

/**
 * container class for wrapping Presentational component ItemList
 */
export default class ItemContainer extends HTMLElement {
    private handler_: InputHandler = new InputHandler();

    connectedCallback() {
        console.log("ItemContainer Connected");
        this.render();
    }

    /**
     * Observing the attributes about data.
     */
    static get observedAttributes() {
        return ['data'];
    }

    /**
     * When observing data is changed, this function would be called.
     * Condition - debounced data can be set to memory.
     */
    attributeChangedCallback() {
        this.handler_.Debounce(() => {
            const input = <string>this.attributes.getNamedItem("data")?.value;
            this.handler_.GetMethod(input);

            console.log("rerendering attributeChanged :", input);
            this.render();
        }, 500);
    }

    render() {
        const items = JSON.stringify(this.handler_.GetOnMemory());
        const id = this.attributes.getNamedItem("listId")?.value;
        // Add Element 
        this.innerHTML =
            `<item-list listId=${id} list=\'${items}\'/>`
    }
}