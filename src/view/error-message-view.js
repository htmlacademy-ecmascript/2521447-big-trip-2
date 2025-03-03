import AbstractView from '../framework/view/abstract-view.js';

function createErrorTemplate(errorMessage) {
  return (`<p class="trip-events__msg">${errorMessage}</p>`);
}


export default class ErrorMessageView extends AbstractView {
  #errorMessage = null;

  constructor({ errorMessage }) {
    super();
    this.#errorMessage = errorMessage;
  }

  get template() {
    return createErrorTemplate(this.#errorMessage);
  }
}
