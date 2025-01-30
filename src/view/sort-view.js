import { SortType, SortDisabled } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


function createSortItem(type) {
  return (
    `
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input 
          id="sort-${type}" 
          class="trip-sort__input  visually-hidden" 
          type="radio" 
          name="trip-sort"
          value="sort-${type}" 
          ${type === SortType.DAY ? 'checked' : ''}
          ${SortDisabled[type]}
        >
        <label class="trip-sort__btn" for="sort-${type}" data-sort-type=${type}>${type}</label>
      </div>
    `
  );
}


function createSortTemplate() {
  return (
    `
    <form class="trip-events__trip-sort  trip-sort" action="" method="get">
      ${Object.values(SortType).map((type) => createSortItem(type)).join('')}
    </form >
    `
  );
}


export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.className !== 'trip-sort__btn') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
