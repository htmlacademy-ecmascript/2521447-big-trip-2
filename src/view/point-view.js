import { createElement } from '../render.js';
import { humanizeEventDate, getDurationTime } from '../utils.js';
import { FormatDate } from '../const.js';


function createSelectedPointTemplate(selectedOffer) {
  const { title, price } = selectedOffer;
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
    `
  );
}


function createPointTemplate(point, destination, offers) {
  const { type, basePrice, isFavorite, dateFrom, dateTo } = point;
  const { name } = destination;

  const datetime = humanizeEventDate(dateFrom, FormatDate.DATE_TIME);
  const pointDate = humanizeEventDate(dateFrom, FormatDate.DATE_POINT);
  const pointStart = humanizeEventDate(dateFrom, FormatDate.DATE_SCHEDULE);
  const pointEnd = humanizeEventDate(dateTo, FormatDate.DATE_SCHEDULE);

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${datetime}">${pointDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${datetime}T${pointStart}">${pointStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${datetime}T${pointEnd}">${pointEnd}</time>
          </p>
          <p class="event__duration">${getDurationTime(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((selectedOffer) => createSelectedPointTemplate(selectedOffer)).join('')}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
    `
  );
}


export default class PointView {
  constructor({ point, destination, offers }) {
    this.point = point;
    this.destination = destination;
    this.offers = offers;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.destination, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
