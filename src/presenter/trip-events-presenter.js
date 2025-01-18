import { render } from '../framework/render.js';
import PointsView from '../view/points-view.js';
import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';


export default class TripEventsPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #point = null;

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
    this.#point = this.#points[0];
    render(new SortView(), this.#pointsContainer);
    render(this.#pointsComponent, this.#pointsContainer);
    render(new PointEditView({
      point: this.#point,
      types: this.#offersModel.getTypes(),
      destination: this.#destinationsModel.getDestinationById(this.#point.destination),
      offers: this.#offersModel.getOffersByType(this.#point.type),
      checkedList: this.#offersModel.getOffersSelected(this.#point),
    }), this.#pointsComponent.element);

    for (let i = 0; i < this.#points.length; i++) {
      const destination = this.#destinationsModel.getDestinationById(this.#points[i].destination);
      const offers = this.#offersModel.getOffersSelected(this.#points[i]);

      render(new PointView({
        point: this.#points[i],
        destination: destination,
        offers: offers,
      }), this.#pointsComponent.element);
    }
  }
}
