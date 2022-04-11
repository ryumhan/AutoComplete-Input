/* @date 2021-03-12
 * @author ryumhan
 */

let template: HTMLTemplateElement;

const getTemplate = (type: string): HTMLElement => {
  if (!template) {
    template = <HTMLTemplateElement>document.getElementById(type);
  }

  return <HTMLElement>template.content.firstElementChild?.cloneNode(true);
};

export const getItem = (name: string, input: string) => {
  const item = getTemplate("normal-item");
  item.append(name);

  const child = <HTMLInputElement>item.querySelector("input");
  child.value = name;
  //event delegation
  item.dataset.value = name;
  return item;
};
