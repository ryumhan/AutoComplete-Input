/* @date 2021-03-09
* @author ryumhan
*/
import Component from "./Component.js";

import { ItemList } from "../components/ItemList.js";
import { InputHandler } from "../core/InputHandler.js";
import { SearchBtn } from "./SearchBtn.js";

//Define ItemList, ClearBtn for custom usage
customElements.define("item-list", ItemList);
customElements.define("search-btn", SearchBtn);

interface IPropsAutoInput {
  placeholder: string // placeholder msg of input element
  id: string          // id of input element
  interval: number    //interval for debounce requesting
}

export default class AutoInputComponent extends Component {
  constructor(targetElement: HTMLElement, props: IPropsAutoInput) {
    super(targetElement, props);
  }

  /**
   * Update focus position number to state.
   * @param focusPos position of items selected to update.
   */
  private updateFocus(focusPos: number, event: KeyboardEvent) {
    const current = document.getElementsByName("item" + focusPos)[0];
    current?.setAttribute("class", "complete-active");

    this.SetState({ focusPos: focusPos });
    console.debug("updateFocus", this.state.focusPos, "key", event.code, "pos", focusPos);
  }


  /**
   * Clear All the data in state.
   */
  private clearAll() {
    //set display none for hiding
    document.getElementById(this.props.id + "-list")?.setAttribute("style", "display : none");

    this.SetState({ itemList: [], input: " ", focusPos: -1 });
    console.debug("clearAll", this.state.focusPos);
  }

  /**
   * If arrow button input from user, then selected Item is moved.
   * so remove the colored element for next selected element
   */
  private initItem(focusPos: number) {
    // Arrow handle If moving to element, selection is changed.
    if (focusPos != -1) {
      const prev = document.getElementsByName("item" + focusPos)[0];
      prev?.classList.remove("complete-active");
    }
  }

  /**
   * Initially called SetUp functioin when element created
   */
  Setup() {
    console.debug("AutoInputComponent Setup - Initialize state");
    this.state = { itemList: [], input: " ", focusPos: -1 };
  }

  /**
   * Only This SetState function will be called without calling Component Class's Setstate
   * input function would not be rendered but only changed child element's attribute value.
   * @param newState data from input value
   */
  SetState(newState: any): void {
    //Update focusPos First
    this.state.focusPos = newState.focusPos;
    if (!newState.itemList || !newState.input) {
      return;
    }

    //Update Other State
    this.state.itemList = newState.itemList;
    this.state.input = newState.input;

    //Only item-list Component Rerender
    const child = document.getElementById(this.props.id + "-list");
    child?.setAttribute("input", this.state.input);
    child?.setAttribute("list", JSON.stringify(this.state.itemList));

    //display on When item exist
    if (this.state.itemList.length) {
      child?.setAttribute("style", "display : block");
    }
  }

  SetEvent() {
    const id = this.props.id;
    const handler: InputHandler = new InputHandler();
    const inputElement = <HTMLInputElement>document.getElementById(id);

    //When input is out of focus
    inputElement?.addEventListener("focusout", () => {
      this.clearAll();
    });

    //When input is on focus
    inputElement?.addEventListener("focusin", () => {
      const input = inputElement?.value;

      if (input.trim().length) {
        handler.GetMethod(input, () => {
          this.SetState({ input: input, itemList: handler.GetOnMemory(), focusPos: -1 });
        });
      }
    });

    //When input is changed.
    inputElement?.addEventListener("input", () => {
      handler.Debounce(() => {
        //Input value on Time.
        const input = inputElement?.value;
        if (!input.trim().length) {
          return this.clearAll();
        }

        //unnecessary call would be blocked for all browswer
        if (input == this.state.input && this.state.itemList.length) {
          return;
        }

        handler.GetMethod(input, () => {
          this.SetState({ input: input, itemList: handler.GetOnMemory(), focusPos: -1 });
        });

      }, this.props.interval); // intervally debouncing
    });

    //When Only arrow or esc, enter key
    inputElement?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (!this.state.itemList.length || e.isComposing) {
        return;
      }

      //KeyType Set for switching
      const keyType = e.code;
      const size = handler.GetOnMemory().length;
      let focusPos = this.state.focusPos;

      switch (keyType) {

        case "Escape":
          return this.clearAll();

        case "Enter":
          const selected = document.getElementsByName("item" + focusPos)[0];
          const val = selected?.getElementsByTagName("input")[0].value;

          inputElement.value = val ? val : this.state.input;
          //Prevent any Other working
          e.preventDefault();
          return this.clearAll();

        case "ArrowUp":
          this.initItem(focusPos);
          //Update focus value and Element
          this.updateFocus(--focusPos < 0 ? size - 1 : focusPos, e)
          break;

        case "ArrowDown":
          this.initItem(focusPos);
          //Update focus value and Element
          this.updateFocus((++focusPos) % size, e);
          break;

        default:
          break;
      }
    });
  }

  UITemplate() {
    const placeholder: string = this.props.placeholder;
    const id = this.props.id;

    const input = this.state.input;
    const items = JSON.stringify(this.state.itemList);

    return `
            <div class = "auto-input-group">
                <input type = "search" placeholder = \'${placeholder}\' id = ${id} autocomplete="off">
                <search-btn name = "Search" fromId = ${id}></search-btn>
                <item-list id = ${id + "-list"} input = \'${input}\' list=\'${items}\' style = "display : none"/>
            </div>
           `
  }
}