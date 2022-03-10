/* @date 2021-03-09
 * @author ryumhan
 */

interface cacheData {
    category: string
    data: string
}

export class OnMemory {
    private cache_: Array<cacheData>
    constructor() {
        this.cache_ = [];
    }

    Dispatch() { }
    Update() { }
}
