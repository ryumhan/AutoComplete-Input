/* @date 2021-03-15
 * @author ryumhan
 */

import { expect } from "chai"
import { OnMemory } from "../../src/core/OnMemory"

describe('OnMemory', () => {
    it('Before and afeter Update Test, Only after Update OnMemory return true', () => {
        let memory = new OnMemory();
        // empty
        expect(memory.OnMemory("first")).to.equal(false);
        // after add
        memory.Update("first", [{ text: "first", id: 1 }, { text: "first", id: 2 }]);
        // exist
        expect(memory.OnMemory("first")).to.equal(true);
    })


    it('Before and afeter Update Test, Only after Update, GetMemory Test', () => {
        let memory = new OnMemory();
        // empty
        expect(memory.GetMemory("first").length).to.equal(0);
        // after add
        memory.Update("first", [{ text: "first", id: 1 }, { text: "first", id: 2 }]);
        // exist
        expect(memory.GetMemory("first")[0].text).to.equal("first");
    })

    it('Same input but different data Update Test, Only the first Memory would be returned', () => {
        let memory = new OnMemory();
        // after add
        memory.Update("first", [{ text: "first", id: 1 }, { text: "first", id: 2 }]);
        memory.Update("first", [{ text: "second", id: 1 }, { text: "second", id: 2 }]);
        // The First input exist
        expect(memory.GetMemory("first")[0].text).to.equal("first");
    })

    it('If call OverwriteMemory, Only The first Memory would be overwritten, except other', () => {
        let memory = new OnMemory();
        // after add
        memory.Update("first", [{ text: "first", id: 1 }, { text: "first", id: 2 }]);
        memory.Update("second", [{ text: "second", id: 1 }, { text: "second", id: 2 }]);
        memory.Update("third", [{ text: "third", id: 1 }, { text: "third", id: 2 }]);

        memory.OverWriteMemory("first", [{ text: "overwritten", id: 1 }, { text: "overwritten", id: 2 }]);

        // The First input is changed
        expect(memory.GetMemory("first")[0].text).to.equal("overwritten");
        // Otherwise, the rest element is keep in memory
        expect(memory.GetMemory("second")[0].text).to.equal("second");
        expect(memory.GetMemory("third")[0].text).to.equal("third");
    })

    it('OverMemory Test, if over 1000 size, The next Dataset would be overwritten', () => {
        let memory = new OnMemory();
        // add 1000 data
        for (let i = 0; i < 1000; i++) {
            const name: string = i.toString();
            memory.Update(name, [{ text: name, id: 1 }, { text: name, id: 2 }]);
        }
        // verify what is the first and last data, first : 0 , last : 9999
        expect(memory.GetMemory("0")[0].text).to.equal("0");
        expect(memory.GetMemory("999")[0].text).to.equal("999");

        memory.Update("1000", [{ text: "1000", id: 1 }, { text: "1000", id: 2 }]);

        // Last one still exist,
        expect(memory.GetMemory("999")[0].text).to.equal("999");
        // First element is not exist because of overwriting.
        expect(memory.GetMemory("0").length).to.equal(0);
        // Overwritten 1000 input is exist
        expect(memory.GetMemory("1000")[0].text).to.equal("1000");
    })
})