import { IEvent } from "../controller/model";
import { IState } from "../controller/model";
import { IPropsAutoInput } from "./AutoInputComponent";
import { fetchItems } from "../core/fetchItems";

const addDebounceEvent = (
  element: HTMLInputElement,
  event: IEvent,
  interval: number,
  uri: string
) => {
  let inDebounce_: NodeJS.Timeout;

  const getList = () => {
    const value = element.value;
    //If time is enough
    event.setInput(value);
    if (value) {
      const data = fetchItems(uri + value);
      event.setItemList(data);
    }
  };

  element.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.isComposing) {
      return;
    }

    if (e.key == "Enter") {
      event.enterItem();
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      event.arrowHandler(e.key);
      //fixed cursor
      e.preventDefault();
      return;
    }

    if (inDebounce_) {
      clearTimeout(inDebounce_);
    }
    //Set Timer
    inDebounce_ = setTimeout(() => {
      getList();
    }, interval);
  });

  element.addEventListener("focusout", (e: Event) => {
    event.clearItemList();
  });

  element.addEventListener("focusin", (e: Event) => {
    getList();
  });
};

export function Input(
  targetElement: HTMLElement,
  state: IState,
  props: IPropsAutoInput,
  event: IEvent
) {
  console.log("Input Functional Component is called");

  const { placeholder, interval, uri } = props;
  const { input } = state;

  const element = <HTMLInputElement>targetElement.cloneNode(true);
  element.placeholder = placeholder;

  if (input) {
    element.value = input;
  }

  addDebounceEvent(element, event, interval, uri);
  return element;
}
