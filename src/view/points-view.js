import AbstractView from '../framework/view/abstract-view.js';

function createPointsTemplate() {
  return ('<ul class="trip-events__list"></ul>');
}

export default class PointsView extends AbstractView {
  get template() {
    return createPointsTemplate();
  }
}
