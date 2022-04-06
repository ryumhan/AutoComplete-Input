/* @date 2021-03-12
 * @author ryumhan
 */

export const getItem = (name: string, input: string) => {
  return getNormalItem(name);
};

const getNormalItem = (name: string) => {
  return `<div>${name}
              <input type = "hidden" value = \'${name}\'/>
          </div>`;
};

const getItemWithStrong = (name: string, input: string, subs: string) => {
  return `<div name = ${name}>
            <strong style = "color : blue">${input}</strong>${subs}
            <input type = "hidden" value = \'${input + subs}\'/>
          </div>`;
};
