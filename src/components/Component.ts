/* @date 2021-03-09
 * @author ryumhan
 */

export default class Component {
    targetElement: HTMLElement;
    state: any;
    props: any;

    /**
     * constructor
     * @param targetElement Parent Element to have this element
     * @param props properties of this element
     */
    constructor(targetElement: HTMLElement, props: any) {
        this.props = props;

        this.targetElement = targetElement;
        //Setup Called first
        this.Setup();
        //And Render would be called
        this.Render();
        //And UITemplate called in Render
        //And after SetState called in Render
    }

    Setup() { }

    UITemplate() { return ''; }

    SetEvent() { }

    /**
     * Set and update the all state into Element, and render again,
     * if component who implemented this function in their member function, then it can be changed.
     * @param newState 
     */
    SetState(newState: any) {
        this.state = { ...this.state, ...newState };
        this.Render();
    }

    /**
     * Append and set the UI element tag, and Set Event.
     */
    Render() {
        this.targetElement.innerHTML = this.UITemplate();
        this.SetEvent();
    }
}