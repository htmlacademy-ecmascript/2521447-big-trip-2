import { UpdateType, UserAction } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
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
      onCancelFormButtonClick: this.destroy,
    });

    render(this.#newPointComponent, this.#newPointContainer, RenderPosition.AFTERBEGIN);
  }

  destroy = () => {
    if (this.#newPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newPointComponent);
    this.#newPointComponent = null;

  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );

    this.destroy();
  };
}
