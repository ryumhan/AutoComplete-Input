/* @date 2021-03-10
 * @author ryumhan
 */

export default class ClearButton extends HTMLElement {
  connectedCallback() {
    console.log("ClearButton Connected");
    this.render();
  }

  render() {
    this.innerHTML = `
        <option id="autolist">Clear All</datalist>
      `
  }
}