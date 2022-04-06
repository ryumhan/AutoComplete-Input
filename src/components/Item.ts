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

  const child = <HTMLInputElement>(
    item.getElementsByTagName("input")[0].cloneNode(true)
  );
  child.value = name;

  item.append(name, child);
  return item;
};

const getNormalItem = (name: string) => {
  return `<div>${name}
              <input type = "hidden" value = \'${name}\'/>
          </div>`;
};

const getItemWithStrong = (name: string, input: string, subs: string) => {
  return `<div name = ${name}>
            <strong style = "color : blue">${input}</strong>${subs}
            <input type = "hidden" value = \'${input + subs}\'/>
          </div>`;
};
