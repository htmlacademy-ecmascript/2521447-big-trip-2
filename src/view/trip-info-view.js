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

function infoMainTemplate(title) {
  return (
    `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
    </div>
    `
  );
}

function tripInfoTemplate(totalCost, title) {
  return (
    `
    <section class="trip-main__trip-info  trip-info">
      ${infoMainTemplate(title)}

      ${infoCostTemplate(totalCost)}
    </section>;
    `
  );
}

export default class TripInfo extends AbstractView {
  #totalCost = null;
  #infoTitle = null;

  constructor({ totalCost, infoTitle }) {
    super();
    this.#totalCost = totalCost;
    this.#infoTitle = infoTitle;
  }

  get template() {
    return tripInfoTemplate(this.#totalCost, this.#infoTitle);
  }
}
