/* @date 2021-03-09
 * @author ryumhan
 */

import { render } from "../controller/controller";

interface IPropsAutoInput {
  placeholder: string; // placeholder msg of input element
  uri: string;
  interval: number; //interval for debounce requesting
}

export default (targetElement: HTMLElement, props: IPropsAutoInput) => {
  const { placeholder, uri, interval } = props;

  targetElement.replaceWith(
    render(targetElement, { list: ["first", "second"], input: "test" })
  );
};
