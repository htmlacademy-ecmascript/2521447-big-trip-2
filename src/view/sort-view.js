import { SortType, SortDisabled } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortItem(currentSortType, type) {
  return (
    `
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input 
          id="sort-${type}" 
          class="trip-sort__input  visually-hidden" 
          type="radio" 
          data-sort-type=${type}
          name="trip-sort"
          value="sort-${type}" 
          ${type === currentSortType ? 'checked' : ''}
          ${SortDisabled[type]}
        >
        <label class="trip-sort__btn" for="sort-${type}">
          ${type}
        </label>
      </div>
    `
  );
}

function createSortTemplate(currentSortType) {
  return (
    `
    <form class="trip-events__trip-sort  trip-sort" action="" method="get">
      ${Object.values(SortType).map((type) => createSortItem(currentSortType, type)).join('')}
    </form >
    `
  );
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
