/* @date 2021-03-09
 * @author ryumhan
 */

export default class Component {
    targetElement: HTMLElement;
    state: any;
    props: any;

    constructor(targetElement: HTMLElement, props: any) {
        this.props = props;

        this.targetElement = targetElement;

        this.Setup();
        this.Render();
    }

    Setup() { }

    UITemplate() { return ''; }

    SetEvent() { }

    SetState(newState: any) {
        this.state = { ...this.state, ...newState };
        this.Render();
    }

    Render() {
        this.targetElement.innerHTML = this.UITemplate();
        this.SetEvent();
    }
}