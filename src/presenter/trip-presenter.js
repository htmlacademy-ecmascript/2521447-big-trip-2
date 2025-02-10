import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import TripView from '../view/trip-view.js';
import { SortType, UpdateType, UserAction } from '../const.js';
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

    this.#pointsModel.addObserver(this.#handleModelEvent);
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

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }

    this.#pointPresenters.get(update.id).init({
      point: update,
      destination: this.#destinationsModel.getDestinationById(update.destination),
      selectedOffers: this.#offersModel.getOffersSelected(update),
      availableOffers: this.#offersModel.getOffersByType(update.type),
    });
  };

  #handleModelEvent = (updatedType, data) => {
    switch (updatedType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init({
          point: data,
          destination: this.#destinationsModel.getDestinationById(data.destination),
          selectedOffers: this.#offersModel.getOffersSelected(data),
          availableOffers: this.#offersModel.getOffersByType(data.type),
        });
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        break;
    }
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
      onDataChange: this.#handleViewAction,
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
