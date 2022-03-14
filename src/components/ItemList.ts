/* @date 2021-03-10
 * @author ryumhan
 */

import { autoDataSet } from "../core/OnMemory.js"
import { Item } from "./Item.js";
import { ItemWithBoldCh } from "./ItemWithBoldCh.js"

customElements.define("autocomplete-item", Item);
customElements.define("autocomplete-itemwiths", ItemWithBoldCh);

export class ItemList extends HTMLElement {
  /**
   * Using Items and input data, make the autocomplete list
   * @param items item list from api data
   * @param input input user typed
   * @returns string value about UI template made in this function.
   */
  MakeAutoCompleteList(items: Array<autoDataSet>, input: string): string {
    const template: string = items.map((item: autoDataSet, index: number) => {
      //get values
      const inputId: string = <string>this.attributes.getNamedItem("id")?.value.split("-list")[0];
      const val: string = item.text;
      const pos: number = val.indexOf(input);
      //including item if matched character exist with input
      if (pos != -1) {
        const substring: string = val.substring(pos + input.length, val.length);
        return `<autocomplete-itemwiths inputId = ${inputId} itemId = ${item.id} name = "item${index.toString()}\" itemVal =\'${val}\' input =\'${input}\' subs =\'${substring}\'></autocomplete-itemwiths>`;
      }
      //not including item
      return `<autocomplete-item inputId = ${inputId} itemId = ${item.id} name = "item${index.toString()}\" itemVal =\'${val}\'></autocomplete-item>`;
    }).join('');

    return template;
  }

  /**
   * When ItemList is created, then this function would be called first.
   */
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