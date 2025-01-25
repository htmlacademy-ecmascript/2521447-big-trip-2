import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import PointsView from '../view/points-view.js';


export default class TripEventsPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #pointsComponent = new PointsView();

  #points = [];

  constructor({ pointsContainer, pointsModel, destinationsModel, offersModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderSort();
    this.#renderPoints();
  }

  #renderSort() {
    render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#pointsContainer);
  }

  #renderPoints() {
    render(this.#pointsComponent, this.#pointsContainer);

    if (this.#points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    for (let i = 0; i < this.#points.length; i++) {
      const point = this.#points[i];
      const destination = this.#destinationsModel.getDestinationById(point.destination);
      const offers = this.#offersModel.getOffersSelected(point);
      const types = this.#offersModel.getTypes();
      const checkedList = this.#offersModel.getOffersSelected(point);

      this.#renderPoint(point, destination, offers, types, checkedList);
    }
  }

  #renderPoint(point, destination, offers, types, checkedList) {
    const pointPresenter = new PointPresenter({ pointsComponent: this.#pointsComponent.element });

    pointPresenter.init(point, destination, offers, types, checkedList);
  }
}
