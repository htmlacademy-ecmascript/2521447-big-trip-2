import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import TripView from '../view/trip-view.js';
import { SortType } from '../const.js';
import { sortDateFromDown, sortDurationTimeDown, sortPriceDown } from '../utils/point.js';


export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #tripComponent = new TripView();

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ tripContainer, pointsModel, destinationsModel, offersModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortDurationTimeDown);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPriceDown);
    }

    return [...this.#pointsModel.points].sort(sortDateFromDown);
  }

  init() {
    this.#renderSort();
    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      destination: this.#destinationsModel.getDestinationById(updatedPoint.destination),
      selectedOffers: this.#offersModel.getOffersSelected(updatedPoint),
      availableOffers: this.#offersModel.getOffersByType(updatedPoint.type),
    });
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#tripComponent.element,
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

  #renderNoPoints() {
    render(this.#noPointComponent, this.#tripContainer);
  }

  #renderTrip() {
    render(this.#tripComponent, this.#tripContainer);
    this.#renderPoints();
  }

  #renderPoints() {
    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.points.forEach((point) => this.#renderPoint(point));
  }
}
