/* @date 2021-03-09
* @author ryumhan
*/
import Component from "./Component.js";
import ItemContainer from "../containers/ItemContainer.js";

//Define ItemList, ClearBtn for custom usage
customElements.define("input-container", ItemContainer);

interface IPropsAutoInput {
  placeholder: string
  id: string
  listId: string
}

export default class AutoInputComponent extends Component {
  constructor(targetElement: HTMLElement, props: IPropsAutoInput) {
    super(targetElement, props);
  }

  Setup() { }

  SetEvent() {
    const id = this.props.id;
    const inputElement = <HTMLInputElement>document.getElementById(id);

    inputElement?.addEventListener("keyup", (e: KeyboardEvent) => {
      const input = inputElement?.value;
      this.SetState({ data: input });

      e.stopPropagation();
    });
  }

  /**
   * Only This SetState function will be called without calling Component Class's Setstate
   * input function would not be rendered but only changed child element's attribute value.
   * @param newState data from input value
   */
  SetState(newState: any): void {
    const child = document.getElementById(this.props.id + "-container");
    child?.setAttribute("data", newState.data);
  }

  UITemplate() {
    console.log("AutoInputComponent is Templated");

    const placeholder: string = this.props.placeholder;
    const listId = this.props.listId;
    const id = this.props.id;

    return `
            <div class = "auto-input-group">
                <input type = "search" placeholder = \'${placeholder}\' list = ${listId} id = ${id}>
                  <input-container id = ${id + "-container"} listId=${listId}><input-container/> 
                </input>
            </div>
            `
  }
}