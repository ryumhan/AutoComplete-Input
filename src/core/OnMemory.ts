/* @date 2021-03-09
 * @author ryumhan
 */

export interface autoDataSet {
    text: string,
    id: number
}

interface cacheData {
    [input: string]: Array<autoDataSet>
}

export class OnMemory {
    private cache_: cacheData;
    private maxMemory_: number;

    constructor() {
        this.cache_ = {};
        this.maxMemory_ = 0;
    }

    /**
     * Get memory from cache as matched with input name.
     * @param input data to find
     * @returns data set
     */
    GetMemory(input: string): Array<autoDataSet> {
        return this.cache_[input] ? this.cache_[input] : [];
    }

    /**
     * if current element count is over 1000, then overwrite the memory.
     * if the requested data is empty array, then will not save in cache 
     * for possibility of not empty datain the future
     * @param input input string to Update
     * @param data data to update
     */
    Update(input: string, data: Array<autoDataSet>) {
        //already exist or empty array will not saved
        if (this.OnMemory(input) || data.length == 0) {
            return;
        }

        if (this.maxMemory_ < 1000) {
            this.cache_[input] = data
            this.maxMemory_++;
            return;
        }

        this.OverWriteMemory(input, data);
    }

    /**
     * First Input will be First replaced from New input if size is over 1000
     * @param input new input
     * @param data new data
     */
    OverWriteMemory(input: string, data: Array<autoDataSet>) {
        const target = Object.keys(this.cache_)[0];
        delete this.cache_[target];
        //Udpate
        this.cache_[input] = data
    }

    /**
     * Whether exist or not in cache
     * @param input data to search
     * @returns true or false
     */
    OnMemory(input: string): boolean {
        return this.cache_[input] != undefined
    }
}
