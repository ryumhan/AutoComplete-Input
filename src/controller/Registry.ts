import { IState } from "./controller";

type Component = (target: HTMLElement, state: any) => HTMLElement;

interface IRegistry {
  [key: string]: Component;
}

export const registry: IRegistry = {};

export const add = (name: string, component: Component) => {
  console.log("registry add", name);
  registry[name] = renderWrapper(component);
};

/**
 * Using registry data-component and each functional element calling
 * replace the all the selected component which has valid data-component.
 * @condition before render calling, add function should be first called for success render
 * @param component component implemented as UI functioinal element.
 * @returns HTMLElement
 */
export const renderWrapper = (component: Component) => {
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
