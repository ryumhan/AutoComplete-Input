/* @date 2021-03-09
 * @author ryumhan
 */

require("../simple.css");

import AutoInputComponent from "./components/AutoInputComponent";

/**
 * Main section For App running.
 * App only have AutoInputComponent Element.
 */
const autoInputElement = document.querySelector(".auto-input-group");

function render() {
  /**
   * requestAnimationFrame doesn't district main thread
   */ requestAnimationFrame(() => {
    if (autoInputElement instanceof HTMLElement) {
      console.debug("requestAnimationFrame!!");

      AutoInputComponent(autoInputElement, {
        placeholder: "Title, Director, Actors",
        uri: "https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=",
        interval: 300,
      });
    }
  });
}

render();
