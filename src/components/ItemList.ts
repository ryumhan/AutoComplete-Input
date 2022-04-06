/* @date 2021-03-10
 * @author ryumhan
 */

import { IState } from "../controller/controller";
import { getItem } from "./Item";

const getItemList = (state: IState) => {
  const { list, input } = state;
  const childs = list
    .map((name: string) => {
      return getItem(name, input);
    })
    .join("");

  return childs;
};

/**
 * ItemList UI Component
 * @param targetElement data-component : itemlist
 * @param state state from controller
 */
export function ItemList(targetElement: HTMLElement, state: IState) {
  console.log("ItemList Functional Component is called");

  const element = <HTMLElement>targetElement.cloneNode(true);
  element.innerHTML = getItemList(state);

  return element;
}
