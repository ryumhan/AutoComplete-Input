/* @date 2021-03-11
 * @author ryumhan
 */

import { OnMemory, autoDataSet } from "./OnMemory.js";

export class InputHandler {
    private url_: string = "https://ㅇ.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=";
    private currentInput_: string = "";
    private inDebounce_: any = 0;
    private memory_: OnMemory = new OnMemory;

    /**
     * Try to get the data list using API url
     * @param callback when fetch success, callback function would be called.
     */
    private Fetch(callback: Function) {
        const target = this.url_ + this.currentInput_;
        console.debug("GetMethod url - ", target);

        fetch(target).then((response) => {
            if (response.status == 200 || response.status == 201) {
                response.json().then((data) => {
                    this.SetOnMemory(this.currentInput_, data);
                    console.debug("Get data about ", this.currentInput_, data);
                    //callback
                    callback();
                });
            } else {
                alert("Fetch Error " + response.status)
            }
        }).catch((error: TypeError) => {
            alert("Url " + target + " is invalid " + error.message)
            throw (error.message);
        });
    }

    /**
     * Using fetch function, Get Method at url would be worked, 
     * if same request exist on memory, doesn't request.
     * @param input input string value from input box.
     */
    GetMethod(input: string, callback: Function) {
        this.currentInput_ = input;
        if (this.memory_.OnMemory(input)) {
            return callback();
        }
        //if not exist
        this.Fetch(callback);
    }

    /**
     * In default, Intervally debounce call the function.
     * @param callback function to call back when time is enough, no indebounce
     * @param interval interval time to call
     */
    Debounce = (callback: Function, interval: number) => {
        if (this.inDebounce_) {
            clearTimeout(this.inDebounce_);
        }
        //Set Timer
        this.inDebounce_ = setTimeout(() => {
            //If time is enough
            callback();
        }, interval);
    };

    /**
     * save the memory to user after
     * if any input already exist in memory, or data set has no data, then it will not be set
     * @param input input string value matching with data set
     * @param data data set to save in memory
     */
    SetOnMemory(input: string, data: Array<autoDataSet>) {
        this.memory_.Update(input, data);
    }

    /**
     * Get data set from memory which has input key.
     * @returns data set requested
     */
    GetOnMemory(): Array<autoDataSet> {
        return this.memory_.GetMemory(this.currentInput_)
    }

    /**
     * Retrun the current input string value
     */
    Input() {
        return this.currentInput_;
    }
}