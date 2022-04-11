/* @date 2021-03-10
 * @author ryumhan
 */

import { IState } from "../controller/model";
import { IEvent } from "../controller/model";
import { IPropsAutoInput } from "./AutoInputComponent";
import { getItem } from "./Item";

const setItemList = (targetElement: HTMLElement, state: IState) => {
  const { list, input } = state;
  list.forEach((name: string) => {
    targetElement.appendChild(getItem(name, input));
  });
};

const addEvent = (element: HTMLElement, event: IEvent) => {
  element.addEventListener("mousedown", (e: Event) => {
    const target = <HTMLElement>e.target;
    if (target.matches("div.item")) {
      event.setInput(<string>target.dataset.value);
    }
  });
};

/**
 * ItemList UI Component
 * @param targetElement data-component : itemlist
 * @param state state from controller
 */
export function ItemList(
  targetElement: HTMLElement,
  state: IState,
  props: IPropsAutoInput,
  event: IEvent
) {
  console.log("ItemList Functional Component is called");

  const element = <HTMLElement>targetElement.cloneNode(true);
  setItemList(element, state);
  addEvent(element, event);

  return element;
}
