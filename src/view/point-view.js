import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate, getDurationTime } from '../utils/point.js';
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


function createPointTemplate(point, destination, selectedOffers) {
  const { type, basePrice, isFavorite, dateFrom, dateTo } = point;

  const datetimeFrom = humanizeEventDate(dateFrom, FormatDate.DATE_TIME);
  const datetimeTo = humanizeEventDate(dateTo, FormatDate.DATE_TIME);
  const pointDate = humanizeEventDate(dateFrom, FormatDate.DATE_POINT);
  const pointStart = humanizeEventDate(dateFrom, FormatDate.DATE_SCHEDULE);
  const pointEnd = humanizeEventDate(dateTo, FormatDate.DATE_SCHEDULE);

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${datetimeFrom}">${pointDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination?.name || ''}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${datetimeFrom}T${pointStart}">${pointStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${datetimeTo}T${pointEnd}">${pointEnd}</time>
          </p>
          <p class="event__duration">${getDurationTime(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${selectedOffers.map((selectedOffer) => createSelectedPointTemplate(selectedOffer)).join('')}
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

export default class PointView extends AbstractView {
  #point = null;
  #destination = null;
  #availableOffers = null;
  #selectedOffers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, destination, availableOffers, selectedOffers, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#availableOffers = availableOffers;
    this.#selectedOffers = selectedOffers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destination, this.#selectedOffers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
