/* @date 2021-03-09
 * @author ryumhan
 */

require("../simple.css");

import AutoInputComponent from "./components/AutoInputComponent";
import modelFactory, { IState } from "./controller/model";

import { Input } from "./components/Input";
import { ItemList } from "./components/ItemList";
import { SearchBtn } from "./components/SearchBtn";

import { add } from "./controller/registry";
import applyDiff from "./controller/applyDiff";

add("itemlist", ItemList);
add("input", Input);
add("button", SearchBtn);

const model = modelFactory();
const { addChangeListener, events } = model;

const render = (state: IState) => {
  /**
   * requestAnimationFrame doesn't district main thread
   */
  requestAnimationFrame(() => {
    /**
     * Main section For App running.
     * App only have AutoInputComponent Element.
     */
    const app = document.querySelector("#app");
    if (app instanceof HTMLElement) {
      console.debug("requestAnimationFrame!!");

      const newApp = AutoInputComponent(
        app,
        state,
        {
          placeholder: "Title, Director, Actors",
          uri: "https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=",
          interval: 300,
        },
        events
      );
      //TODO applydiff
      applyDiff(document.body, app, newApp);
    }
  });
};

addChangeListener(render);
