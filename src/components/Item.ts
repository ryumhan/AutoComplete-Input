/* @date 2021-03-12
 * @author ryumhan
 */

export class Item extends HTMLElement {
    connectedCallback() {
        console.debug("Item Connected");
        this.render();
    }

    updateToParent(value: string, targetId: string) {
        const target = <HTMLInputElement>document.getElementById(targetId);
        this.addEventListener("mousedown", (e: MouseEvent) => {
            e.stopPropagation();
            console.debug("Item mousedown ", value);
            target.value = value;
        })
    }

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
        this.updateToParent(itemVal, parentId);
    }
}
