/* @date 2021-03-09
 * @author ryumhan
 */

require("../simple.css");

import AutoInputComponent from "./components/AutoInputComponent";

/**
 * Main section For App running.
 * App only have AutoInputComponent Element.
 */
const app = document.querySelector("#app");

function render() {
  /**
   * requestAnimationFrame doesn't district main thread
   */ requestAnimationFrame(() => {
    if (app instanceof HTMLElement) {
      console.debug("requestAnimationFrame!!");

      app.replaceWith(
        AutoInputComponent(app, {
          placeholder: "Title, Director, Actors",
          uri: "https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=",
          interval: 300,
        })
      );
    }
  });
}

render();
