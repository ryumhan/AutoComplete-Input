/* @date 2021-03-11
 * @author ryumhan
 */

export interface autoDataSet {
    text: string,
    id: number
}

export class InputHandler {
    private inDebounce_: number = 0;

    Fetch(): Array<autoDataSet> {
        return [{ "text": "가타카", "id": 1 }, { "text": "강철비", "id": 2 }, { "text": "강철비2", "id": 3 }, { "text": "기생충", "id": 4 }]
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
}