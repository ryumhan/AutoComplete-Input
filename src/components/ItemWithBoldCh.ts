/* @date 2021-03-13
 * @author ryumhan
 */

export class ItemWithBoldCh extends HTMLElement {
    connectedCallback() {
        console.debug("Item Connected");
        this.render();
    }

    updateToParent(value: string, targetId: string) {
        const target = <HTMLInputElement>document.getElementById(targetId);
        this.addEventListener("mousedown", () => {
            console.debug("ItemWithBoldCh mousedown ", value);
            target.value = value;
        })
    }

    render() {
        const itemId = this.attributes.getNamedItem("itemId")?.value;
        const name: string = <string>this.attributes.getNamedItem("name")?.value;
        const input: string = <string>this.attributes.getNamedItem("input")?.value;
        const subs: string = <string>this.attributes.getNamedItem("subs")?.value;

        this.innerHTML =
            `<div itemId = ${itemId} name = ${name}>
                <strong style = "color : blue">${input}</strong>${subs}
                <input type = "hidden" value = \'${input + subs}\'/>
             </div>`


        const parentId: string = <string>this.attributes.getNamedItem("inputId")?.value;
        this.updateToParent(input + subs, parentId);
    }
}