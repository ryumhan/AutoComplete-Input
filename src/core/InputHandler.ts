/* @date 2021-03-11
 * @author ryumhan
 */

import { OnMemory, autoDataSet } from "./OnMemory.js";

export class InputHandler {
    private memory_: OnMemory = new OnMemory;
    private url_: string = "https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=";
    private currentInput_: string = "";
    private inDebounce_: number = 0;

    private Fetch(callback: Function) {
        const target = this.url_ + this.currentInput_;
        console.debug("GetMethod url - ", target);

        fetch(target).then((response) => {
            response.json().then((data) => {
                this.SetOnMemory(this.currentInput_, data);
                console.log("Get data about ", this.currentInput_, data);
                //callback
                callback();
            });
        }).catch((error) => console.log("GetMethod error:", error));;
    }
    /**
     * Using fetch function, Get Method at url would be worked, 
     * if same request exist on memory, doesn't request.
     * @param input input string value from input box.
     */
    GetMethod(input: string, callback: Function) {
        this.currentInput_ = input;
        if (this.memory_.OnMemory(input)) {
            return;
        }

        this.Fetch(callback);
    }

    /**
     * In default, Intervally debounce call the function.
     * @param callback function to call back when time is enough, no indebounce
     * @param interval interval time to call
     * @param always whether not calling intervally or not.
     * @returns 
     */
    Debounce = (callback: Function, interval: number, always = false) => {
        if (this.inDebounce_) {
            return;
        }

        this.inDebounce_ = 0;
        clearTimeout(this.inDebounce_);
        //Set Timer
        this.inDebounce_ = setTimeout(() => {
            //If time is enough
            this.inDebounce_ = 0;
            if (!always) {
                callback();
            }
        }, interval);

        let enable = always && !this.inDebounce_;
        if (enable) {
            callback();
            this.inDebounce_ = 0;
        }
    };

    SetOnMemory(input: string, data: Array<autoDataSet>) {
        this.memory_.Update(input, data);
    }

    GetOnMemory(): Array<autoDataSet> {
        return this.memory_.GetMemory(this.currentInput_)
    }
}