/* @date 2021-03-14
 * @author ryumhan
 */

import { expect } from "chai"
import { InputHandler } from "../../src/core/InputHandler"

describe('InputHandler', () => {
    it('After calling SetOnMemory about dataset user input, handler does not call the Fetch but callback function is called when handler get the data', () => {
        let handler = new InputHandler();
        handler.SetOnMemory("first", [{ text: "first", id: 1 }, { text: "first", id: 2 }]);
        // after add
        handler.GetMethod("first", () => {
            //can get data using GetOnMemory about dataset already on memory.
            expect(handler.GetOnMemory()[0].text).to.equal("first");
        })
    });

    it('Debouncing Test, Using Continuous function call similarly with sucessive input event, Only Last Calling is valid in Test Debounce', () => {
        let cnt = 0;
        let done = false;
        let handler = new InputHandler();
        // condition : Call the debounce function 100 times
        // because debounce interval is set to 1 sec, only last calling should be worked
        for (let i = 0; i < 100; i++) {
            handler.Debounce(() => {
                //Define the callback function count number in interval.
                cnt += 3;
                done = true;
                console.log("Debounced current count is 3", cnt, "Not ", 100 * cnt);
            }, 800);
        }

        // after enough time, if done is true, check the value.
        setTimeout(() => {
            if (done) {
                expect(cnt).not.equal(300);
                expect(cnt).to.equal(3);
            }
        }, 850)
    });
})