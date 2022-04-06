import { Input } from "../components/Input";
import { ItemList } from "../components/ItemList";
import { SearchBtn } from "../components/SearchBtn";

import { add, renderWrapper } from "./Registry";

export interface IState {
  [k: string]: any;
}

add("itemlist", ItemList);
add("input", Input);
add("button", SearchBtn);

export function render(target: HTMLElement, state: IState) {
  const cloneComponent = (target: HTMLElement) => {
    console.log("render", target.className);
    return <HTMLElement>target.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(target, state);
}
