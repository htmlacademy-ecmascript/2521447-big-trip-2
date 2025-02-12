import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future points now',
  [FilterType.PRESENT]: 'There are no present points now',
  [FilterType.PAST]: 'There are no past points now',
};

function createNoPointTemplate(filterType) {
  const noPointTextValue = NoPointsTextType[filterType];

  return (`<p class="trip-events__msg">${noPointTextValue}</p>`);
}


export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
