import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import PointsView from '../view/points-view.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import dayjs from 'dayjs';


export default class TripEventsPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #pointsComponent = new PointsView();

  #points = [];

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor({ pointsContainer, pointsModel, destinationsModel, offersModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];

    this.#renderSort();
    this.#renderPoints();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);

    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      destination: this.#destinationsModel.getDestinationById(updatedPoint.destination),
      offers: this.#offersModel.getOffersSelected(updatedPoint),
      types: this.#offersModel.getTypes(),
      checkedList: this.#offersModel.getOffersSelected(updatedPoint),
    });
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));
        break;
      case SortType.EVENT:
        this.#points.sort();
        break;
      case SortType.TIME:
        this.#points.sort();
        break;
      case SortType.PRICE:
        this.#points.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case SortType.OFFERS:
        this.#points.sort();
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, destination, offers, types, checkedList) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointsComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init({ point, destination, offers, types, checkedList });

    this.#pointPresenters.set(point.id, pointPresenter);

  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
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
