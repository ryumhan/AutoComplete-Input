/* @date 2021-03-10
 * @author ryumhan
 */

import ClearButton from "./ClearButton.js";

customElements.define("clear-list", ClearButton);

export default class ItemList extends HTMLElement {
  connectedCallback() {
    console.log("ItemList connected");
    this.render();
  }

  render() {
    const items = ["test", "test2"];
    this.innerHTML = `
      <datalist id="autolist">
        ${items.map((item: any) => `<option>${item}</option>`).join('')}
        <clear-list/>
      </datalist>
    `
  }
}