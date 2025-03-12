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

function infoMainTemplate(title, date) {
  return (
    `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${date}</p>
    </div>
    `
  );
}

function tripInfoTemplate(totalCost, title, date) {
  return (
    `
    <section class="trip-main__trip-info  trip-info">
      ${infoMainTemplate(title, date)}

      ${infoCostTemplate(totalCost)}
    </section>;
    `
  );
}

export default class TripInfoView extends AbstractView {
  #totalCost = null;
  #infoTitle = null;
  #infoDate = null;

  constructor({ totalCost, infoTitle, infoDate }) {
    super();
    this.#totalCost = totalCost;
    this.#infoTitle = infoTitle;
    this.#infoDate = infoDate;
  }

  get template() {
    return tripInfoTemplate(this.#totalCost, this.#infoTitle, this.#infoDate);
  }
}
