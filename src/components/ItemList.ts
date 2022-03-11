/* @date 2021-03-10
 * @author ryumhan
 */

import { autoDataSet } from "../core/OnMemory.js"

export default class ItemList extends HTMLElement {
  connectedCallback() {
    console.debug("ItemList Connected");
    this.render();
  }
  /**
  * Observing the attributes about list.
  */
  static get observedAttributes() {
    return ['list'];
  }

  /**
   * When observing data is changed, this function would be called.
   * Condition - debounced data can be set to memory / only input exist
   */
  attributeChangedCallback() {
    this.render();
  }

  render() {
    const items = JSON.parse(<string>this.attributes.getNamedItem("list")?.value);

    this.innerHTML =
      `<div class ="complete-list">
          ${items.map((item: autoDataSet) => {
        return `<div id = ${item.id}>
                  <strong>${item.text}</strong>
                  <input type = "hidden" value = \'${item.text}\'/>
                </div>`
      }).join('')}
       </div>`
  }
}