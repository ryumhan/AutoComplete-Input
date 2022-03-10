/* @date 2021-03-10
 * @author ryumhan
 */

import { autoDataSet } from "../core/InputHandler.js"

export default class ItemList extends HTMLElement {
  connectedCallback() {
    console.log("ItemList Connected");
    this.render();
  }

  /**
   * Observing the attributes about data.
   */
  static get observedAttributes() {
    return ['list'];
  }

  /**
   * When observing data is changed, this function would be called.
   * condition - debounce
   */
  attributeChangedCallback() {
    console.log('attributeChangedCallback , ItemList')
  }

  render() {
    const id = this.attributes.getNamedItem("listId")?.value;
    const items = JSON.parse(<string>this.attributes.getNamedItem("list")?.value);

    this.innerHTML =
      `<datalist id=${id}>
          ${items.map((item: autoDataSet) => `<option id = ${item.id} value = ${item.text}>`).join('')}
       </datalist>`
  }
}