/* @date 2021-03-12
 * @author ryumhan
 */

export class Item extends HTMLElement {
    /**
     * Set Event function for Updating value into Target Element. 
     * @param value value to update
     * @param targetId target Element to update
     */
    UpdateToParent(value: string, targetId: string) {
        const target = <HTMLInputElement>document.getElementById(targetId);
        this.addEventListener("mousedown", () => {
            console.debug("Item mousedown ", value);
            target.value = value;
        })
    }

    /**
     * When Item created, initially called
     */
    connectedCallback() {
        console.debug("Item Connected");
        this.render();
    }

    /**
     * render all the element for Item list
     */
    render() {
        const itemId = this.attributes.getNamedItem("itemId")?.value;
        const name: string = <string>this.attributes.getNamedItem("name")?.value;
        const itemVal: string = <string>this.attributes.getNamedItem("itemVal")?.value;

        this.innerHTML =
            `<div itemId = ${itemId} name = "${name}">
                    ${itemVal}
                    <input type = "hidden" value = \'${itemVal}\'/>
             </div>`;

        const parentId: string = <string>this.attributes.getNamedItem("inputId")?.value;
        this.UpdateToParent(itemVal, parentId);
    }
}
