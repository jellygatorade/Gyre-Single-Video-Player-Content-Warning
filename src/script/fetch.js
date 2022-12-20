import { applyContent } from "./apply-content-ui.js";

function callFetchCreateUI() {
  fetch("./common/content.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);

      // Populate innerHTML for all content + all languages
      applyContent(data);
    });
}

export { callFetchCreateUI };
