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
    private cache_: cacheData
    constructor() {
        this.cache_ = {};
    }

    GetMemory(input: string): Array<autoDataSet> {
        return this.cache_[input] ? this.cache_[input] : [];
    }

    Update(input: string, data: Array<autoDataSet>) {
        if (this.OnMemory(input) || data.length == 0) {
            return;
        }

        this.cache_[input] = data;
    }

    OnMemory(input: string): boolean {
        return this.cache_[input] != undefined
    }
}
