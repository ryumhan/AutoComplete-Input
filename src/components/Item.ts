/* @date 2021-03-12
 * @author ryumhan
 */

const getTemplate = (type: string): HTMLElement => {
  const template = <HTMLTemplateElement>document.getElementById(type);
  return <HTMLElement>template.content.firstElementChild?.cloneNode(true);
};

const getStrongItem = (rest: string, input: string) => {
  console.log("getStrongItem", input + rest);
  const item = <HTMLElement>getTemplate("strong-item");

  const strong = <HTMLElement>item.querySelector("strong");
  strong.innerText = input;
  item.dataset.txt = rest;
  //Set rest text
  item.innerHTML = item.innerHTML.trim() + rest;
  //For event delegation
  item.dataset.value = input + rest;
  return item;
};

const getNormalItem = (name: string) => {
  console.log("getNormalItem", name);
  const item = <HTMLElement>getTemplate("normal-item").cloneNode(true);
  item.append(name);

  //For event delegation
  item.dataset.value = name;
  return item;
};

export const getItem = (name: string, input: string) => {
  console.log("Item Component is called");

  if (input && name.includes(input)) {
    const rest = name.split(input)[1];
    return getStrongItem(rest, input);
  }

  return getNormalItem(name);
};
