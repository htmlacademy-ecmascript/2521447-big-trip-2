import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { BLANK_POINT, DateFormat } from '../const.js';
import { getMaxDate, getMinDate, humanizeDate } from '../utils/point.js';
import { getCapitalizeValue } from '../utils/common.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

function createOffersTemplate(availableOffers, selectedOffers, isDisabled) {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${availableOffers.map((availableOffer) => `
          <div class="event__offer-selector">
            <input 
              class="event__offer-checkbox  visually-hidden" 
              id="${availableOffer.id}" 
              type="checkbox" 
              name="event-offer-luggage"
              ${selectedOffers.find((selectedOffer) => selectedOffer === availableOffer.id) ? 'checked' : ''}
              ${isDisabled ? 'disabled' : ''}
            >
            <label class="event__offer-label" for="${availableOffer.id}">
              <span class="event__offer-title">${availableOffer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${availableOffer.price}</span>
            </label>
          </div>
        `).join('')}
      </div>
    </section>`
  );
}

function createPointTypeTemplate(point, isDisabled) {
  const { type: currentType, types } = point;

  return types.map((type) => `
    <div class="event__type-item">
      <input
        id="event-type-${type}"
        class="event__type-input event__type-label--${type} visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${currentType === type ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="event__type-label event__type-label--${type}"
        for="event-type-${type}"
        >${getCapitalizeValue(type)}</label>
    </div
  >`).join('');
}

function createDestinationTemplate(destination) {
  const { description, pictures } = destination;
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${pictures?.length
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

function createTimeTemplate(point, isDisabled) {
  const { id, dateFrom, dateTo } = point;

  return (
    `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input 
        class="event__input  event__input--time" 
        id="event-start-time-${id}"
        type="text" 
        name="event-start-time" 
        value="${humanizeDate(dateFrom, DateFormat.DATE)}"
        ${isDisabled ? 'disabled' : ''}
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input 
        class="event__input  event__input--time" 
        id="event-end-time-${id}" 
        type="text" 
        name="event-end-time" 
        value="${humanizeDate(dateTo, DateFormat.DATE)}"
        ${isDisabled ? 'disabled' : ''}
      >
    </div>
    `
  );
}

function createNewPointTemplate(point) {
  const {
    destination,
    basePrice,
    availableOffers,
    offers,
    sourcedDestinations,
    isSaving,
    isDisabled,
  } = point;

  const typeTemplate = createPointTypeTemplate(point, isDisabled);
  const createTime = createTimeTemplate(point, isDisabled);
  const offersTemplate = availableOffers.length
    ? createOffersTemplate(availableOffers, offers, isDisabled)
    : '';
  const datalistOptions = sourcedDestinations.map((item) => `<option value="${item.name}"></option>`).join('');
  const destinationTemplate = destination?.description || destination?.pictures?.length
    ? createDestinationTemplate(destination)
    : '';

  return (
    `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
            </label>
            <input 
              class="event__type-toggle  visually-hidden" 
              id="event-type-toggle" 
              type="checkbox"
              ${isDisabled ? 'disabled' : ''}
            >
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typeTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination">
              ${point.type}
            </label>
            <input 
              class="event__input  event__input--destination" 
              id="event-destination" 
              type="text" 
              name="event-destination" 
              value="${destination?.name || ''}" 
              list="destination-list"
              ${isDisabled ? 'disabled' : ''}
            >
            <datalist id="destination-list">
              ${datalistOptions}
            </datalist>
          </div>

          ${createTime}

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input 
              class="event__input  event__input--price" 
              id="event-price" 
              type="number" 
              name="event-price" 
              value="${basePrice}"
              min="1"
              autofocus
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <button 
            class="event__save-btn  btn  btn--blue" 
            type="submit"
            ${isDisabled ? 'disabled' : ''}
          >${isSaving ? 'Saving...' : 'Save'}</button>
          <button 
            class="event__reset-btn" 
            type="reset"
          >Cancel</button>
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

export default class NewPointView extends AbstractStatefulView {
  #point = BLANK_POINT;

  #handleFormSubmit = null;
  #handleCloseFormButton = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ types, sourcedOffers, sourcedDestinations, onFormSubmit, onCancelFormButtonClick }) {
    super();
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseFormButton = onCancelFormButtonClick;

    this._setState(NewPointView.parsePointToState(this.#point, types, sourcedOffers, sourcedDestinations));
    this._restoreHandlers();

  }

  get template() {
    return createNewPointTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#pointPriceChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((offerButton) => offerButton
        .addEventListener('click', this.#offerCheckboxHandler));
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#inputDestinationChangeHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#cancelButtonClickHandler);
    this.#setDatepickers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(NewPointView.parseStateToPoint(this._state));
  };

  #cancelButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseFormButton();
  };

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

  #pointTypeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      availableOffers: this._state.sourcedOffers.find((item) => item.type === evt.target.value).offers,
      offers: [],
    });
  };

  #pointPriceChangeHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value
    });
  };

  #offerCheckboxHandler = (evt) => {
    const selectedOffer = evt.target.id;
    let selectedOffers = this._state.offers;

    if (evt.target.checked) {
      selectedOffers.push(selectedOffer);
    } else {
      selectedOffers = selectedOffers.filter((offer) => offer !== selectedOffer);
    }

    this._setState({
      offers: selectedOffers,
    });
  };

  #inputDestinationChangeHandler = (evt) => {
    const inputDestinationValue = evt.target.value;

    this.updateElement({
      destination: this._state.sourcedDestinations.find((destination) => destination.name === inputDestinationValue),
    });
  };

  #dateFromInputHandler = ([selectedDate]) => {
    this._setState({
      dateFrom: selectedDate,
    });
  };

  #dateToInputHandler = ([selectedDate]) => {
    this._setState({
      dateTo: selectedDate,
    });
  };

  #setDatepickers() {
    const datePickerConfig = {
      enableTime: true,
      'time_24hr': true,
      locale: { firstDayOfWeek: 1 },
      dateFormat: DateFormat.DATEPICKR,
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

  static parsePointToState(point, types, sourcedOffers, sourcedDestinations) {
    return {
      ...point,
      types,
      sourcedOffers,
      availableOffers: sourcedOffers.find((item) => item.type === point.type).offers,
      sourcedDestinations,
      isDisabled: false,
      isSaving: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state, destination: state.destination?.id || '' };

    delete point.types;
    delete point.sourcedOffers;
    delete point.availableOffers;
    delete point.sourcedDestinations;
    delete point.isDisabled;
    delete point.isSaving;

    return point;
  }
}
