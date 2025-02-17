import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatString, getMaxDate, getMinDate, humanizeEventDate } from '../utils/point.js';
import { FormatDate } from '../const.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/themes/material_blue.css';

function createDestinationTemplate(destination) {
  const { description, pictures } = destination;

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${pictures.length
      ? `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${pictures.map((picture) => `<img 
              class="event__photo" 
              src="${picture.src}" 
              alt="${picture.description}"
            >`).join('')}
          </div>
        </div>`
      : ''}
    </section>`
  );
}

function createOffersTemplate(offers, offersChecked) {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer) => `
          <div class="event__offer-selector">
            <input 
              class="event__offer-checkbox  visually-hidden" 
              id="${offer.id}" 
              type="checkbox" 
              name="event-offer-luggage"
              ${offersChecked.find((offerChecked) => offerChecked.id === offer.id) ? 'checked' : ''}
            >
            <label class="event__offer-label" for="${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `).join('')}
      </div>
    </section>`
  );
}

function createPointGroupTimeTemplate(dateFrom, dateTo, id) {
  const dateFromSlashed = humanizeEventDate(dateFrom, FormatDate.DATE_SLASHED);
  const dateFromShedule = humanizeEventDate(dateFrom, FormatDate.DATE_SCHEDULE);
  const dateToSlashed = humanizeEventDate(dateTo, FormatDate.DATE_SLASHED);
  const dateToShedule = humanizeEventDate(dateTo, FormatDate.DATE_SCHEDULE);

  return (
    `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input 
        class="event__input  event__input--time" 
        id="event-start-time-${id}" 
        type="text" 
        name="event-start-time" 
        value="${dateFromSlashed} ${dateFromShedule}"
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input 
        class="event__input  event__input--time" 
        id="event-end-time-${id}" 
        type="text" 
        name="event-end-time" 
        value="${dateToSlashed} ${dateToShedule}"
      >
    </div>
    `
  );
}

function createPointTypeTemplate(currentType, types) {
  return types.map((type) => `
    <div class="event__type-item">
      <input 
        id="event-type-${type}" 
        class="event__type-input event__type-label--${type} visually-hidden" 
        type="radio" 
        name="event-type" 
        value="${type}"
        ${currentType === type ? 'checked' : ''}
      />
      <label 
        class="event__type-label event__type-label--${type}" 
        for="event-type-${type}"
        >${formatString(type)}</label>
    </div
  >`).join('');
}

function createPointEditTemplate(point, destination, types, availableOffers, selectedOffers, sourcedDestinations) {
  const { id, type, basePrice, dateFrom, dateTo } = point;

  const typeTemplate = createPointTypeTemplate(point.type, types);
  const datalistOptions = sourcedDestinations.map((item) => `<option value="${item.name}"></option>`).join('');
  const timeTemplate = createPointGroupTimeTemplate(dateFrom, dateTo, id);
  const offersTemplate = availableOffers.length
    ? createOffersTemplate(availableOffers, selectedOffers)
    : '';
  const destinationTemplate = destination?.description || destination?.pictures?.length
    ? createDestinationTemplate(destination)
    : '';

  return (
    `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typeTemplate}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label 
              class="event__label  event__type-output" 
              for="event-destination-${id}"
            >
              ${type}
            </label>
            <input 
              class="event__input  event__input--destination" 
              id="event-destination-${id}"
              type="text" 
              name="event-destination" 
              value="${destination?.name || ''}"
              list="destination-list"
            >
            <datalist id="destination-list">
              ${datalistOptions}
            </datalist>
          </div>       
                    
          ${timeTemplate}

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input 
              class="event__input event__input--price" 
              id="event-price-${id}" 
              type="number" 
              name="event-price" 
              value="${basePrice}"
            >
          </div>
          
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersTemplate}
          
          ${destinationTemplate}
        </section>
      </form>
    </li>
    `
  );
}


export default class PointEditView extends AbstractStatefulView {
  #point = null;
  #destination = null;
  #availableOffers = null;
  #sourcedDestinations = null;
  #sourcedOffers = null;
  #selectedOffers = null;
  #types = null;
  #handleHideClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({
    point,
    destination,
    availableOffers,
    sourcedDestinations,
    sourcedOffers,
    selectedOffers,
    types,
    onHideClick,
    onFormSubmit,
    onDeleteClick,
  }
  ) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#availableOffers = availableOffers;
    this.#sourcedDestinations = sourcedDestinations;
    this.#sourcedOffers = sourcedOffers;
    this.#selectedOffers = selectedOffers;
    this.#types = types;
    this.#handleHideClick = onHideClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._setState(PointEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(
      this._state,
      this.#destination,
      this.#types,
      this.#availableOffers,
      this.#selectedOffers,
      this.#sourcedDestinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(PointEditView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formHideHandler);
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((offerButton) => offerButton
        .addEventListener('click', this.#offerCheckboxHandler));
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#inputDestinationChangeHandler);
    this.#setDatepicker();
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #formHideHandler = (evt) => {
    evt.preventDefault();
    this.#handleHideClick();
  };

  #inputDestinationChangeHandler = (evt) => {
    const inputDestinationValue = evt.target.value;
    const newDestination = this.#sourcedDestinations.find((destination) => destination.name === inputDestinationValue);

    if (newDestination) {
      this.#destination = newDestination;
      this.updateElement({ destination: newDestination.id });

    } else {
      this.#destination = null;
      this.updateElement({ destination: '' });
    }
  };

  #dateFromInputHandler = ([selectedDate]) => {
    this.updateElement({
      dateFrom: selectedDate,
    });
  };

  #dateToInputHandler = ([selectedDate]) => {
    this.updateElement({
      dateTo: selectedDate,
    });
  };

  #pointTypeChangeHandler = (evt) => {
    this.#availableOffers = this.#sourcedOffers.find((item) => item.type === evt.target.value).offers;

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #offerCheckboxHandler = (evt) => {
    const selectedOffer = evt.target.id;
    const selectedOffers = this._state.offers;

    if (evt.target.checked) {
      selectedOffers.push(selectedOffer);
    } else {
      selectedOffers.pop(selectedOffer);
    }

    this._setState({
      offers: selectedOffers,
    });
  };

  #setDatepicker() {
    const datePickerConfig = {
      enableTime: true,
      'time_24hr': true,
      locale: { firstDayOfWeek: 1 },
      dateFormat: FormatDate.DATE_PICKER_FORMAT,
    };

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        ...datePickerConfig,
        maxDate: getMaxDate(this._state.dateTo),
        onChange: this.#dateFromInputHandler,
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        ...datePickerConfig,
        minDate: getMinDate(this._state.dateFrom),
        onChange: this.#dateToInputHandler,
      }
    );
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }
}
