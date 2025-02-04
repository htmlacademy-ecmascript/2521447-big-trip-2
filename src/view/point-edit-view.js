import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatString, humanizeEventDate } from '../utils/point.js';
import { FormatDate } from '../const.js';


function createOfferItemTemplate(offer, offersChecked) {
  const { id, title, price } = offer;

  return (
    `
    <div class="event__offer-selector">
      <input 
        class="event__offer-checkbox  visually-hidden" 
        id="${id}" 
        type="checkbox" 
        name="event-offer-luggage"
        ${offersChecked.find((item) => item.id === id) ? 'checked' : ''}
      >
      <label class="event__offer-label" for="${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
    `
  );
}


function createPictureTemplate(picture) {
  return (
    `
    <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `
  );
}

function createPictureContainer(pictures) {
  return (
    `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map((picture) => createPictureTemplate(picture)).join('')}
      </div>
    </div>
    `
  );
}

function createSectionDestinationTemplate(destination) {
  const { description, pictures } = destination;

  return (
    `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${pictures.length ? createPictureContainer(pictures) : ''}
    </section>
    `
  );
}


function createSectionOffersTemplate(offers, offersChecked) {
  return (
    `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer) => createOfferItemTemplate(offer, offersChecked)).join('')}
      </div>
    </section>
  `
  );
}


function createTypeItemTemplate(type, typeItem) {
  const checked = type === typeItem ? 'checked' : '';
  return (
    `
    <div class="event__type-item">
      <input 
        id="event-type-${typeItem}" 
        class="event__type-input  visually-hidden" 
        type="radio" 
        name="event-type" 
        value="${typeItem}"
        ${checked}
      >
      <label 
        class="event__type-label  
        event__type-label--${typeItem}" 
        for="event-type-${typeItem}"
        data-type="${typeItem}">
          ${formatString(typeItem)}
      </label>
    </div>
    `
  );
}


function createPointTypeTemplate(point, types) {
  const { type } = point;

  return (
    `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${types.map((typeItem) => createTypeItemTemplate(type, typeItem)).join('')}
        </fieldset>
      </div>
    </div>
    `
  );
}


function createPointGroupTimeTemplate(dateFrom, dateTo) {
  const dateFromSlashed = humanizeEventDate(dateFrom, FormatDate.DATE_SLASHED);
  const dateFromShedule = humanizeEventDate(dateFrom, FormatDate.DATE_SCHEDULE);
  const dateToSlashed = humanizeEventDate(dateTo, FormatDate.DATE_SLASHED);
  const dateToShedule = humanizeEventDate(dateTo, FormatDate.DATE_SCHEDULE);

  return (
    `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time">From</label>
      <input 
        class="event__input  event__input--time" 
        id="event-start-time" 
        type="text" 
        name="event-start-time" 
        value="${dateFromSlashed} ${dateFromShedule}"
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time">To</label>
      <input 
        class="event__input  event__input--time" 
        id="event-end-time" 
        type="text" 
        name="event-end-time" 
        value="${dateToSlashed} ${dateToShedule}"
      >
    </div>
    `
  );
}


function createPointGroupDestinationTemplate(type, destination, sourcedDestinations) {
  return (
    `
    <div class="event__field-group  event__field-group--destination">
      <label 
        class="event__label  event__type-output" 
        for="event-destination"
      >
        ${type}
      </label>
      <input 
        class="event__input  event__input--destination" 
        id="event-destination" 
        type="text" 
        name="event-destination" 
        value="${destination.name || ''}"
        list="destination-list"
      >
      <datalist id="destination-list">
      ${sourcedDestinations.map((item) => `<option value="${item.name}"></option>`).join('')}
      </datalist>
      </div>
      `
  );
}


function createPointGroupPriceTemplate(price) {
  return (
    `
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input 
        class="event__input event__input--price" 
        id="event-price" 
        type="text" 
        name="event-price" 
        value="${price}"
      >
    </div>
    `
  );
}


function createPointEditTemplate(point, destination, types, availableOffers, selectedOffers, sourcedDestinations) {

  const { type, basePrice, dateFrom, dateTo } = point;

  return (
    `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createPointTypeTemplate(point, types)}
          
          ${createPointGroupDestinationTemplate(type, destination, sourcedDestinations)}

          ${createPointGroupTimeTemplate(dateFrom, dateTo)}

          ${createPointGroupPriceTemplate(basePrice)}

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${availableOffers.length ? createSectionOffersTemplate(availableOffers, selectedOffers) : ''}
          
          ${destination?.description || destination?.pictures.length ? createSectionDestinationTemplate(destination) : ''}
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
  #handleEditClick = null;
  #handleFormSubmit = null;

  constructor({ point, destination, availableOffers, sourcedDestinations, sourcedOffers, selectedOffers, types, onEditClick, onFormSubmit }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#availableOffers = availableOffers;
    this.#sourcedDestinations = sourcedDestinations;
    this.#sourcedOffers = sourcedOffers;
    this.#selectedOffers = selectedOffers;
    this.#types = types;
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;

    this._setState(PointEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#destination, this.#types, this.#availableOffers, this.#selectedOffers, this.#sourcedDestinations);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
    this.element.querySelectorAll('.event__type-label')
      .forEach((pointTypeButton) => pointTypeButton
        .addEventListener('click', this.#pointTypeChangeHandler));
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((offerButton) => offerButton
        .addEventListener('click', this.#offerCheckboxHandler));
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#inputDestinationChangeHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #inputDestinationChangeHandler = (evt) => {
    const inputDestinationValue = evt.target.value;
    const newDestination = this.#sourcedDestinations.find((destination) => destination.name === inputDestinationValue);

    if (newDestination) {
      this.#destination = newDestination;
    } else {
      this.#destination = {
        id: null,
        name: '',
        description: '',
        pictures: [],
      };
    }

    this.updateElement({ destination: this.#destination });
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();

    const type = evt.target.dataset.type;
    this.#availableOffers = this.#sourcedOffers.find((offer) => offer.type === type).offers;

    this.updateElement({
      type,
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

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }
}
