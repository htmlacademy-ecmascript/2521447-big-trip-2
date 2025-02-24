import { UpdateType, UserAction } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { isEsc } from '../utils/common.js';
import NewPointView from '../view/new-point-view.js';


export default class NewPointPresenter {
  #newPointContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #types = null;
  #sourcedOffers = null;
  #sourcedDestinations = null;

  #newPointComponent = null;

  constructor({ newPointContainer, onDataChange, onDestroy }) {
    this.#newPointContainer = newPointContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({ types, sourcedOffers, sourcedDestinations }) {
    this.#types = types;
    this.#sourcedOffers = sourcedOffers;
    this.#sourcedDestinations = sourcedDestinations;

    if (this.#newPointComponent !== null) {
      return;
    }

    this.#newPointComponent = new NewPointView({
      types: this.#types,
      sourcedOffers: this.#sourcedOffers,
      sourcedDestinations: this.#sourcedDestinations,
      onFormSubmit: this.#handleFormSubmit,
      onCancelFormButtonClick: this.#handleCancelFormButton,
    });

    render(this.#newPointComponent, this.#newPointContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newPointComponent);
    this.#newPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#newPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#newPointComponent.shake(resetFormState);
  }

  #handleCancelFormButton = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #escKeyDownHandler = (evt) => {
    if (isEsc(evt.keyCode)) {
      this.destroy();
    }
  };
}
