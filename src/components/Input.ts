import { IEvent } from "../controller/model";
import { IState } from "../controller/model";
import { IPropsAutoInput } from "./AutoInputComponent";

const addEvent = (
  element: HTMLInputElement,
  event: IEvent,
  interval: number
) => {
  let inDebounce_: any = 0;

  element.addEventListener("keydown", (e: KeyboardEvent) => {
    if (inDebounce_) {
      clearTimeout(inDebounce_);
    }
    //Set Timer
    inDebounce_ = setTimeout(() => {
      //If time is enough
      event.setInput(element.value);
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
  const { placeholder, interval } = props;
  const { input } = state;

  const element = <HTMLInputElement>targetElement.cloneNode(true);
  element.placeholder = placeholder;

  if (input) {
    element.value = input;
  }

  addEvent(element, event, interval);
  return element;
}
