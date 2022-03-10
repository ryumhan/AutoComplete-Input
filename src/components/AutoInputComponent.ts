/* @date 2021-03-09
* @author ryumhan
*/
import Component from "./Component.js";
import ItemList from "../components/ItemList.js";

interface IPropsAutoInput {
  placeholder: string
  namespace: string
  listId: string
}

customElements.define("auto-item-list", ItemList);

export default class AutoInputComponent extends Component {
  constructor(targetElement: HTMLElement, props: IPropsAutoInput) {
    super(targetElement, props);
  }

  Setup() {
    this.state = {};
  }

  UIElements() {
    const { itemList } = this.state;
    const placeholder: string = this.props.placeholder;
    const namespace = this.props.placeholder;
    const listId = this.props.placeholder;

    return `
        <input placeholder=${placeholder} list="autolist" namespace = ${namespace} style ="">
          <auto-item-list/>
        </input> `
  }

  SetEvent() {
  }
}