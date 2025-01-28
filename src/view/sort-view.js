import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


function createSortItem(type) {
  const checked = type === SortType.DAY ? 'checked' : '';

  return (
    `
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input 
          id="sort-${type}" 
          class="trip-sort__input  visually-hidden" 
          type="radio" 
          name="trip-sort"
          value="sort-${type}" 
          ${checked}
        >
        <label class="trip-sort__btn" for="sort-${type}">${type}</label>
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
  get template() {
    return createSortTemplate();
  }
}
