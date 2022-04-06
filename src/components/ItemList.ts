/* @date 2021-03-10
 * @author ryumhan
 */

import { IState } from "../controller/controller";
import { getItem } from "./Item";

const setItemList = (targetElement: HTMLElement, state: IState) => {
  const { list, input } = state;
  list.forEach((name: string) => {
    targetElement.appendChild(getItem(name, input));
  });
};

/**
 * ItemList UI Component
 * @param targetElement data-component : itemlist
 * @param state state from controller
 */
export function ItemList(targetElement: HTMLElement, state: IState) {
  console.log("ItemList Functional Component is called");

  const element = <HTMLElement>targetElement.cloneNode(true);
  setItemList(element, state);

  return element;
}
