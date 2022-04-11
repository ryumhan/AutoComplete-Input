import { IEvent, IState } from "./model";

import { Input } from "../components/Input";
import { ItemList } from "../components/ItemList";
import { SearchBtn } from "../components/SearchBtn";
import { IPropsAutoInput } from "../components/AutoInputComponent";

type Component = (
  target: HTMLElement,
  state: IState,
  props: IPropsAutoInput,
  event: IEvent
) => HTMLElement;

interface IRegistry {
  [key: string]: Component;
}

const registry: IRegistry = {};

const add = (name: string, component: Component) => {
  console.log("registry add", name);
  registry[name] = renderWrapper(component);
};

add("itemlist", ItemList);
add("input", Input);
add("button", SearchBtn);

/**
 * Using registry data-component and each functional element calling
 * replace the all the selected component which has valid data-component.
 * @condition before render calling, add function should be first called for success render
 * @param component component implemented as UI functioinal element.
 * @returns HTMLElement
 */
function renderWrapper(component: Component) {
  return (
    targetElemnt: HTMLElement,
    state: IState,
    props: IPropsAutoInput,
    event: IEvent
  ) => {
    const element = <HTMLElement>component(targetElemnt, state, props, event);

    const childComponents =
      element.querySelectorAll<HTMLElement>("[data-component]");
    Array.from(childComponents).forEach((target: HTMLElement) => {
      const name = <string>target.dataset.component;

      const child = registry[name];
      if (!child) {
        console.error("renderWrapper not exist child", name);
        return;
      }

      //call the componential function and replace with it
      target.replaceWith(child(target, state, props, event));
    });

    return element;
  };
}

export function renderAutoComplete(
  target: HTMLElement,
  state: IState,
  props: IPropsAutoInput,
  events: IEvent
) {
  const cloneComponent = (target: HTMLElement) => {
    console.log("render", target.className);
    return <HTMLElement>target.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(target, state, props, events);
}
