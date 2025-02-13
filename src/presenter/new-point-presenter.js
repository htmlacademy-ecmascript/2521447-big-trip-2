import { render, RenderPosition } from '../framework/render.js';
import NewPointView from '../view/new-point-view.js';


export default class NewPointPresenter {
  #newPointComponent = null;
  #newPointContainer = null;

  constructor({ newPointContainer }) {
    this.#newPointContainer = newPointContainer;
  }

  init() {
    this.#newPointComponent = new NewPointView();
    render(this.#newPointComponent, this.#newPointContainer, RenderPosition.AFTERBEGIN);
  }
}
