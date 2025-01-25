import { render, replace } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';


export default class PointPresenter {
  #pointsComponent = null;
  #pointComponent = null;
  #pointEditView = null;

  constructor({ pointsComponent }) {
    this.#pointsComponent = pointsComponent;
  }

  init(point, destination, offers, types, checkedList) {
    this.#pointComponent = new PointView({
      point,
      destination,
      offers,
      onEditClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#pointEditView = new PointEditView({
      point,
      types,
      destination,
      offers,
      checkedList,
      onFormSubmit: () => {
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    render(this.#pointComponent, this.#pointsComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditView, this.#pointComponent);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditView);
  }
}
