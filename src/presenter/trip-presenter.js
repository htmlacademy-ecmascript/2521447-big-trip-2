import { remove, render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import TripView from '../view/trip-view.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortDateFromDown, sortDurationTimeDown, sortPriceDown } from '../utils/point.js';
import PointsView from '../view/points-view.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';


export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #sortComponent = null;
  #noPointComponent = null;
  #tripComponent = new TripView();
  #pointsComponent = new PointsView();
  #newPointPresenter = null;

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({ tripContainer, pointsModel, destinationsModel, offersModel, filterModel, onNewPointDestroy }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      newPointContainer: this.#pointsComponent.element,
      types: this.#offersModel.types,
      sourcedOffers: this.#offersModel.offers,
      sourcedDestinations: this.#destinationsModel.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortDurationTimeDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortPriceDown);
    }

    return filteredPoints.sort(sortDateFromDown);
  }

  init() {
    this.#renderTrip();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
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
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({ filterType: this.#filterType });
    render(this.#noPointComponent, this.#tripContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointsComponent.element,
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

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #clearTrip({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTrip() {
    render(this.#tripComponent, this.#tripContainer);

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#pointsComponent, this.#tripComponent.element);

    this.#renderPoints();
  }
}
