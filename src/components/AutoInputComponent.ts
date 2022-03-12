/* @date 2021-03-09
* @author ryumhan
*/
import Component from "./Component.js";
import ItemList from "../components/ItemList.js";

import { InputHandler } from "../core/InputHandler.js";

//Define ItemList, ClearBtn for custom usage
customElements.define("item-list", ItemList);

interface IPropsAutoInput {
  placeholder: string
  id: string
}

export default class AutoInputComponent extends Component {
  constructor(targetElement: HTMLElement, props: IPropsAutoInput) {
    super(targetElement, props);
  }

  Setup() {
    console.debug("AutoInputComponent - Initialize state");
    this.state = { itemList: [], input: " " };
  }

  /**
   * Only This SetState function will be called without calling Component Class's Setstate
   * input function would not be rendered but only changed child element's attribute value.
   * @param newState data from input value
   */
  SetState(newState: any): void {
    //Update State
    this.state.itemList = newState.itemList;
    this.state.input = newState.input;

    //Only item-list Component Rerender
    const child = document.getElementById(this.props.id + "-list");
    child?.setAttribute("input", this.state.input);
    child?.setAttribute("list", JSON.stringify(this.state.itemList));
  }

  SetEvent() {
    let focusPos = -1;

    const id = this.props.id;
    const inputElement = <HTMLInputElement>document.getElementById(id);
    inputElement.addEventListener("click", (e: MouseEvent) => {
      this.SetState({ input: "", itemList: [] });
      focusPos = -1;
    });

    const handler: InputHandler = new InputHandler();
    //When Typing the character into the input box.
    inputElement?.addEventListener("input", () => {
      //Only availabe input exist
      handler.Debounce(() => {
        //Input value on Time.
        const input = inputElement?.value;
        if (input.trim().length && this.state.data != input) {
          handler.GetMethod(input, () => {
            this.SetState({ input: input, itemList: handler.GetOnMemory() });
          });
        }
      }, 400);
    });


    //When Only arrow or esc, enter key
    inputElement.addEventListener("keydown", (e: KeyboardEvent) => {
      e.stopPropagation();
      const keyType = e.code;
      if (!this.state.itemList.length || (keyType != "Enter" && keyType != "Escape"
        && keyType != "ArrowUp" && keyType != "ArrowDown")) {
        return;
      }

      if (keyType == "Escape") {
        //Clear State and Rerender Item List
        this.SetState({ input: "", itemList: [] });
        focusPos = -1;
        return;
      }

      if (keyType == "Enter") {
        //Prevent any Element working
        e.preventDefault();
        const current = document.getElementsByName("item" + focusPos)[0];
        //Clear State and Rerender Item List
        const val = current?.getElementsByTagName("input")[0].value;
        inputElement.value = val;

        this.SetState({ input: val, itemList: [] });
        focusPos = -1;
      }

      const size = handler.GetOnMemory().length;
      if (focusPos != -1) {
        const prev = document.getElementsByName("item" + focusPos)[0];
        prev?.classList.remove("complete-active");
      }

      if (keyType == "ArrowUp") {
        focusPos--;
        focusPos = focusPos == -1 ? size - 1 : focusPos;
      }

      if (keyType == "ArrowDown") {
        focusPos++;
        focusPos %= size;
      }

      console.debug("key", keyType, "pos", focusPos);
      const current = document.getElementsByName("item" + focusPos)[0];
      current?.setAttribute("class", "complete-active");
    });
  }

  UITemplate() {
    console.log("AutoInputComponent is Created");
    const placeholder: string = this.props.placeholder;
    const id = this.props.id;

    const input = this.state.input;
    const items = JSON.stringify(this.state.itemList);

    return `
            <div class = "auto-input-group">
                <input type = "search" placeholder = \'${placeholder}\' id = ${id} autocomplete="off">
                <item-list id = ${id + "-list"} input = \'${input}\' list=\'${items}\'/>
            </div>
           `
  }
}