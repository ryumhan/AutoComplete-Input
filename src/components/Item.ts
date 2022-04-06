/* @date 2021-03-12
 * @author ryumhan
 */

let template: HTMLTemplateElement;

function createItem(type: string): HTMLElement {
  if (!template) {
    template = <HTMLTemplateElement>document.getElementById(type);
  }

  return <HTMLElement>template.content.firstElementChild?.cloneNode(true);
}

export const getItem = (name: string, input: string) => {
  const item = createItem("normal-item");
  item.append(name);

  const child = <HTMLInputElement>item.getElementsByTagName("input")[0];
  child.value = name;

  return item;
};
