import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import PointsView from '../view/points-view.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortDateFromDown, sortDurationTimeDown, sortPriceDown } from '../utils/point.js';


export default class TripEventsPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #pointsComponent = new PointsView();

  #points = [];
  #sourcedPoints = [];

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ pointsContainer, pointsModel, destinationsModel, offersModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points].sort(sortDateFromDown);
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
      selectedOffers: this.#offersModel.getOffersSelected(updatedPoint),
      availableOffers: this.#offersModel.getOffersByType(updatedPoint.type),
    });
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortDateFromDown);
        break;
      case SortType.TIME:
        this.#points.sort(sortDurationTimeDown);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPriceDown);
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

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointsComponent.element,
      sourcedOffers: this.#offersModel.offers,
      sourcedDestinations: this.#destinationsModel.destinations,
      types: this.#offersModel.types,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init({
      point: point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      selectedOffers: this.#offersModel.getOffersSelected(point),
      availableOffers: this.#offersModel.getOffersByType(point.type),
    });

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

    this.#points.map((point) => this.#renderPoint(point));
  }
}
