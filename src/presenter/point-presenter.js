import { render, replace, remove } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';


export default class PointPresenter {
  #pointsContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleDataChange = null;

  #point = null;
  #destination = null;

  constructor({ pointsContainer, onDataChange }) {
    this.#pointsContainer = pointsContainer;
    this.#handleDataChange = onDataChange;
  }

  init({ point, destination, offers, types, checkedList }) {
    this.#point = point;
    this.#destination = destination;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destination: this.#destination,
      offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: point,
      types: types,
      destination: destination,
      offers: offers,
      checkedList: checkedList,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if (this.#pointsContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };
}
