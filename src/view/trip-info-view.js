import AbstractView from '../framework/view/abstract-view.js';

function infoCostTemplate(totalCost) {
  return (
    `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>
    `
  );
}

function infoMainTemplate() {
  return (
    `
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
    </div>
    `
  );
}

function tripInfoTemplate(totalCost) {
  return (
    `
    <section class="trip-main__trip-info  trip-info">
      ${infoMainTemplate()}

      ${infoCostTemplate(totalCost)}
    </section>;
    `
  );
}

export default class TripInfo extends AbstractView {
  #totalCost = null;

  constructor({ totalCost }) {
    super();
    this.#totalCost = totalCost;
  }

  get template() {
    return tripInfoTemplate(this.#totalCost);
  }
}
