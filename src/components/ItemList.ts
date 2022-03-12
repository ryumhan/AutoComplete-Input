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
   * When observing list is changed, this function would be called.
   * Condition - debounced data can be set to memory / only input exist
   */
  attributeChangedCallback() {
    console.debug("ItemList Rerender, attributeChanged");
    this.render();
  }

  MakeAutoCompleteList(items: Array<autoDataSet>, input: string): string {
    const template: string = items.map((item: autoDataSet, index: number) => {
      const val = item.text;
      const pos = val.indexOf(input);
      if (pos == -1) {
        return `<div id = ${item.id} name = "item${index.toString()}\">
                  ${val}
                  <input type = "hidden" value = \'${val}\'/>
                </div>`;
      }

      const subs: string = val.substring(pos + input.length, val.length);
      //if matched character exist with input
      return `<div id = ${item.id} name = "item${index.toString()}\">
                  <strong style = "color : blue">${input}</strong>${subs}
                  <input type = "hidden" value = \'${val}\'/>
              </div>`;
    }).join('');

    return template;
  }

  render() {
    const items: Array<autoDataSet> = JSON.parse(<string>this.attributes.getNamedItem("list")?.value);
    const input: string = <string>this.attributes.getNamedItem("input")?.value;
    console.debug("ItemList Rerender", items, input);

    this.innerHTML =
      `<div class ="complete-list">
          ${this.MakeAutoCompleteList(items, input)}
       </div>`
  }
}