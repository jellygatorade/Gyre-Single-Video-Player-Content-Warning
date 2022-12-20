import { interactionEvents } from "./interaction-events.js";
import { callFetchCreateUI } from "./fetch.js";

window.onload = function () {
  interactionEvents.init();
  callFetchCreateUI();
};
