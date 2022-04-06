/* @date 2021-03-09
 * @author ryumhan
 */
import { render } from "../controller/controller";

interface IPropsAutoInput {
  placeholder: string; // placeholder msg of input element
  uri: string;
  interval: number; //interval for debounce requesting
}

let template: HTMLTemplateElement;

function createAutoComplete(): HTMLElement {
  if (!template) {
    template = <HTMLTemplateElement>(
      document.getElementById("auto-complete-input")
    );
  }

  return <HTMLElement>template.content.firstElementChild?.cloneNode(true);
}

export default (targetElement: HTMLElement, props: IPropsAutoInput) => {
  const { placeholder, uri, interval } = props;
  const element = targetElement.cloneNode(true);
  element.appendChild(
    render(createAutoComplete(), {
      list: ["first", "second"],
      input: "test",
    })
  );

  return element;
};
