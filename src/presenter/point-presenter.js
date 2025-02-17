import { UpdateType, UserAction } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import { isEsc } from '../utils/common.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export default class PointPresenter {
  #pointsContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #sourcedOffers = [];
  #sourcedDestinations = [];
  #types = [];
  #selectedOffers = [];

  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #destination = null;
  #availableOffers = null;

  #mode = Mode.DEFAULT;

  constructor({ pointsContainer, sourcedOffers, sourcedDestinations, types, onDataChange, onModeChange }) {
    this.#pointsContainer = pointsContainer;
    this.#sourcedOffers = sourcedOffers;
    this.#sourcedDestinations = sourcedDestinations;
    this.#types = types;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init({ point, destination, selectedOffers, availableOffers }) {
    this.#point = point;
    this.#destination = destination;
    this.#selectedOffers = selectedOffers;
    this.#availableOffers = availableOffers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destination: this.#destination,
      availableOffers: this.#availableOffers,
      selectedOffers: this.#selectedOffers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      destination: this.#destination,
      availableOffers: this.#availableOffers,
      sourcedDestinations: this.#sourcedDestinations,
      sourcedOffers: this.#sourcedOffers,
      selectedOffers: this.#selectedOffers,
      types: this.#types,
      onHideClick: this.#handleHideClick,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (isEsc(evt.keyCode)) {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleHideClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      { ...this.#point, isFavorite: !this.#point.isFavorite },
    );
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
