/* @date 2021-03-14
 * @author ryumhan
 */

export class SearchBtn extends HTMLElement {
    /**
     * When Button clicked, using input value from target dom from parent, call the callback function
     * @param dom input element target to get value 
     */
    SetUpEvent(dom: HTMLInputElement) {
        this.addEventListener("click", () => {
            const value = dom.value;
            console.info("clicked", value);
        })
    }

    /**
     * When SearchBtn Created, call this
     */
    connectedCallback() {
        console.debug("SearchBtn Connected");
        this.render();
    }

    /**
     * render SearchBtn Element
     */
    render() {
        const name: string = <string>this.attributes.getNamedItem("name")?.value;
        const from: string = <string>this.attributes.getNamedItem("fromId")?.value;

        this.innerHTML =
            `<button class = "searchBtn">${name}</button>`;

        this.SetUpEvent(<HTMLInputElement>document.getElementById(from))
    }
}
