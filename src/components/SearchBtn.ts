/* @date 2021-03-14
 * @author ryumhan
 */

import { IState } from "../controller/controller";

const getBtn = (state: IState) => {
  return `<button class = "searchBtn">search</button>`;
};

export function SearchBtn(targetElement: HTMLElement, state: IState) {
  console.log("SearchBtn Functional Component is called");

  const element = <HTMLElement>targetElement.cloneNode(true);
  element.replaceWith(getBtn(state));

  return element;
}
