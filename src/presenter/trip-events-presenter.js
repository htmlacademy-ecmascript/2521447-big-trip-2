import { render, replace } from '../framework/render.js';
import PointsView from '../view/points-view.js';
import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';


export default class TripEventsPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointsComponent = new PointsView();

  #points = [];

  constructor({ pointsContainer, pointsModel, destinationsModel, offersModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#renderPoints();

    this.#points = [...this.#pointsModel.points];

    for (let i = 0; i < this.#points.length; i++) {
      const point = this.#points[i];
      const destination = this.#destinationsModel.getDestinationById(point.destination);
      const offers = this.#offersModel.getOffersSelected(point);

      this.#renderPoint(point, destination, offers);
    }
  }

  #renderPoint(point, destination, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destination,
      offers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditView = new PointEditView({
      point,
      types: this.#offersModel.getTypes(),
      destination,
      offers,
      checkedList: this.#offersModel.getOffersSelected(point),
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditView, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditView);
    }

    render(pointComponent, this.#pointsComponent.element);
  }

  #renderPoints() {
    render(new SortView(), this.#pointsContainer);
    render(this.#pointsComponent, this.#pointsContainer);
  }
}
