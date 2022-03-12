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

  private updateFocus(focusPos: number) {
    this.SetState({ focusPos: focusPos });
    console.debug("updateFocus", this.state.focusPos);
  }


  private clearAll() {
    this.SetState({ itemList: [], input: " ", focusPos: -1 });
    console.debug("clearAll", this.state.focusPos);
  }

  Setup() {
    console.debug("AutoInputComponent - Initialize state");
    this.state = { itemList: [], input: " ", focusPos: -1 };
  }

  /**
   * Only This SetState function will be called without calling Component Class's Setstate
   * input function would not be rendered but only changed child element's attribute value.
   * @param newState data from input value
   */
  SetState(newState: any): void {
    //Update focusPos first
    this.state.focusPos = newState.focusPos;
    if (!newState.itemList || !newState.input) {
      return
    }

    //Update Other State
    this.state.itemList = newState.itemList;
    this.state.input = newState.input;

    //Only item-list Component Rerender
    const child = document.getElementById(this.props.id + "-list");
    child?.setAttribute("input", this.state.input);
    child?.setAttribute("list", JSON.stringify(this.state.itemList));
  }

  SetEvent() {
    const id = this.props.id;
    const handler: InputHandler = new InputHandler();
    const inputElement = <HTMLInputElement>document.getElementById(id);

    inputElement.addEventListener("click", (e: MouseEvent) => {
      this.clearAll();
    });

    //When Typing the character into the input box.
    inputElement?.addEventListener("input", () => {
      //Only availabe input exist
      handler.Debounce(() => {
        //Input value on Time.
        const input = inputElement?.value;
        if (!input.trim().length) {
          return this.clearAll();
        }

        handler.GetMethod(input, () => {
          this.SetState({ input: input, itemList: handler.GetOnMemory(), focusPos: -1 });
        });

      }, 300);
    });


    //When Only arrow or esc, enter key
    inputElement.addEventListener("keydown", (e: KeyboardEvent) => {
      const keyType = e.code;
      if (!this.state.itemList.length || (keyType != "Enter" && keyType != "Escape"
        && keyType != "ArrowUp" && keyType != "ArrowDown")) {
        return;
      }

      if (keyType == "Escape") {
        //Clear State and Rerender Item List
        return this.clearAll();
      }

      // For Korean Typing
      if (e.isComposing) {
        return;
      }

      let focusPos = this.state.focusPos;
      if (keyType == "Enter") {
        const current = document.getElementsByName("item" + focusPos)[0];
        //Clear State and Rerender Item List
        const val = current?.getElementsByTagName("input")[0].value;
        inputElement.value = val;

        return this.clearAll();
      }

      // If moving to element, selection is changed.
      if (focusPos != -1) {
        const prev = document.getElementsByName("item" + focusPos)[0];
        prev?.classList.remove("complete-active");
      }

      const size = handler.GetOnMemory().length;
      if (keyType == "ArrowUp") {
        focusPos--;
        focusPos = focusPos == -1 ? size - 1 : focusPos;
      }

      if (keyType == "ArrowDown") {
        focusPos++;
        focusPos %= size;
      }

      //Update focus value and Element
      this.updateFocus(focusPos);

      const current = document.getElementsByName("item" + focusPos)[0];
      current?.setAttribute("class", "complete-active");
      //Prevent any Other working
      e.preventDefault();
      console.debug("key", keyType, "pos", focusPos);
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