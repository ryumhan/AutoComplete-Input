/* @date 2021-03-09
 * @author ryumhan
 */

import { IEvent, IState } from "../controller/model";
import { renderAutoComplete } from "../controller/registry";

export interface IPropsAutoInput {
  placeholder: string; // placeholder msg of input element
  uri: string;
  interval: number; //interval for debounce requesting
}

let template: HTMLTemplateElement;

function getTemplate(): HTMLElement {
  if (!template) {
    template = <HTMLTemplateElement>(
      document.getElementById("auto-complete-input")
    );
  }

  return <HTMLElement>template.content.firstElementChild?.cloneNode(true);
}

export default (
  targetElement: HTMLElement,
  state: IState,
  props: IPropsAutoInput,
  events: IEvent
) => {
  const element = <HTMLElement>targetElement.cloneNode(true);
  element.append(renderAutoComplete(getTemplate(), state, props, events));

  return element;
};
