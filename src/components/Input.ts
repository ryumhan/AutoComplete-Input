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

  element.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      console.log("enter!");
      return;
    }

    if (!element.value) {
      return;
    }

    if (inDebounce_) {
      clearTimeout(inDebounce_);
    }
    //Set Timer
    inDebounce_ = setTimeout(() => {
      //If time is enough
      event.setInput(element.value);
      if (element.value) {
        const data = fetchItems(uri + element.value);
        event.setItemList(data);
      }
    }, interval);
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
