/* @date 2021-03-13
 * @author ryumhan
 */

import { Item } from "./Item";

/**
 * ItemWithBoldCh get connectedCallback, UpdateToParent function from Item.
 */
export class ItemWithBoldCh extends Item {
    /**
     * ItemWithBoldCh has strong tag for emphaszing the character user input
     */
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
        this.UpdateToParent(input + subs, parentId);
    }
}