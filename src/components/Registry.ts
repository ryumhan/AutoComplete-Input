import { Item } from "./Item";
import ItemList from "./ItemList";

type Component = Function;

interface IState {
  [key: string]: any;
}

interface IRegistry {
  [key: string]: Component;
}

const registry: IRegistry = {};

const add = (name: string, component: Component) => {
  registry[name] = renderWrapper(component);
};

/**
 * Using registry data-component and each functional element calling
 * replace the all the selected component which has valid data-component.
 * @param component component implemented as UI functioinal element.
 * @returns HTMLElement
 */
const renderWrapper = (component: Component) => {
  return (targetElemnt: HTMLElement, state: IState) => {
    const element = <HTMLElement>component(targetElemnt, state);

    const childComponents =
      element.querySelectorAll<HTMLElement>("[data-component]");
    Array.from(childComponents).forEach((target: HTMLElement) => {
      const name = <string>target.dataset.component;

      const child = registry[name];
      if (!child) {
        console.error("renderWrapper not exist child", name);
        return;
      }

      target.replaceWith(child(target, state));
    });

    return element;
  };
};
