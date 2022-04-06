export function Input(targetElement: HTMLElement, placeholder: string) {
  console.log("Input Functional Component is called");

  const element = <HTMLElement>targetElement.cloneNode(true);
  element.setAttribute("placeholder", placeholder);

  return element;
}
