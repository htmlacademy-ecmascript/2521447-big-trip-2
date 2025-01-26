import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import PointsView from '../view/points-view.js';
import { updateItem } from '../utils/common.js';


export default class TripEventsPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #pointsComponent = new PointsView();

  #points = [];

  #pointPresenters = new Map();

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


  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);


    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      destination: this.#destinationsModel.getDestinationById(updatedPoint.destination),
      offers: this.#offersModel.getOffersSelected(updatedPoint),
      types: this.#offersModel.getTypes(),
      checkedList: this.#offersModel.getOffersSelected(updatedPoint),
    });
  };

  #renderPoint(point, destination, offers, types, checkedList) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointsComponent.element,
      onDataChange: this.#handlePointChange,
    });

    pointPresenter.init({ point, destination, offers, types, checkedList });

    this.#pointPresenters.set(point.id, pointPresenter);

  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
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
}
