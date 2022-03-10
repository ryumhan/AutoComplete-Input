/* @date 2021-03-09
* @author ryumhan
*/
import Component from "../components/Component.js";
import { InputHandler } from "../core/InputHandler.js";
import ItemList from "../components/ItemList.js";

/**
 * container class for wrapping Presentational component ItemList
 */
export default class ItemContainer extends HTMLElement {
    private handler_: InputHandler = new InputHandler

    Setup() {
        // this.state = {};
    }

    UIElements() {
        // const { itemList } = this.state;
        // const placeholder = this.props;

        return `<></>`
    }

    SetEvent() {

    }
}