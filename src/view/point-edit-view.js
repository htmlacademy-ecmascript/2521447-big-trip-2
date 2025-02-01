import AbstractView from '../framework/view/abstract-view.js';
import { formatString, humanizeEventDate } from '../utils/point.js';
import { FormatDate } from '../const.js';


function createPointSelectorTemplate(point, offersChecked) {
  const { id, title, price } = point;

  return (
    `
    <div class="event__offer-selector">
      <input 
        class="event__offer-checkbox  visually-hidden" 
        id="event-offer-luggage-${id}" 
        type="checkbox" 
        name="event-offer-luggage"
        ${offersChecked.find((item) => item.id === id) ? 'checked' : ''}
      >
      <label class="event__offer-label" for="event-offer-luggage-${id}">
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

function createPointSectionDestinationTemplate(destination) {
  const { description, pictures } = destination;

  const isEmptyDestination = description || pictures.length ?
    '<h3 class="event__section-title  event__section-title--destination">Destination</h3>' :
    '';

  return (
    `
    <section class="event__section  event__section--destination">
      ${isEmptyDestination}
      <p class="event__destination-description">${description}</p>
      ${pictures.length ? createPictureContainer(pictures) : ''}
    </section>
    `
  );
}


function createPointSectionOffersTemplate(offers, offersChecked) {


  return (
    `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((item) => createPointSelectorTemplate(item, offersChecked)).join('')}
    </section>
  `
  );
}


function createPointTypeItemTemplate(type) {
  return (`
      <div class="event__type-item">
        <input 
          id="event-type-${type}-1" 
          class="event__type-input  visually-hidden" 
          type="radio" 
          name="event-type" 
          value="${type}"
        >
        <label 
          class="event__type-label  
          event__type-label--${type}" 
          for="event-type-${type}-1">${formatString(type)}
        </label>
      </div>
    `);
}


function createGroupTime(point) {
  const { dateFrom, dateTo } = point;

  const dateFromSlashed = humanizeEventDate(dateFrom, FormatDate.DATE_SLASHED);
  const dateFromShedule = humanizeEventDate(dateFrom, FormatDate.DATE_SCHEDULE);
  const dateToSlashed = humanizeEventDate(dateTo, FormatDate.DATE_SLASHED);
  const dateToShedule = humanizeEventDate(dateTo, FormatDate.DATE_SCHEDULE);

  return (
    `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input 
        class="event__input  event__input--time" 
        id="event-start-time-1" 
        type="text" 
        name="event-start-time" 
        value="${dateFromSlashed} ${dateFromShedule}"
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input 
        class="event__input  event__input--time" 
        id="event-end-time-1" 
        type="text" 
        name="event-end-time" 
        value="${dateToSlashed} ${dateToShedule}"
      >
    </div>
    `
  );
}


function createPointEditTemplate(point, types, destination, offers, offersChecked) {


  const { id, type, basePrice } = point;
  const { name } = destination;

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
                ${types.map((item) => createPointTypeItemTemplate(item, offersChecked)).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          ${createGroupTime(point)}

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input 
              class="event__input  
              event__input--price" 
              id="event-price-1" 
              type="text" 
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
        
          ${offers.length ? createPointSectionOffersTemplate(offers, offersChecked) : ''}
          
          ${createPointSectionDestinationTemplate(destination)}
        </section>
      </form>
    </li>
    `
  );
}


export default class PointEditView extends AbstractView {
  #point = null;
  #types = null;
  #destination = null;
  #offers = null;
  #offersChecked = null;
  #handleFormSubmit = null;

  constructor({ point, types, destination, offers, offersChecked, onFormSubmit }) {
    super();
    this.#point = point;
    this.#types = types;
    this.#destination = destination;
    this.#offers = offers;
    this.#offersChecked = offersChecked;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#types, this.#destination, this.#offers, this.#offersChecked);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };
}
