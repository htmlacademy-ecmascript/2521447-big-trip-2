import PointListView from '../view/point-list-view.js';
import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';


export default class TripEventsPresenter {
  pointListComponent = new PointListView();

  constructor({ pointListContainer, pointsModel, destinationsModel, offersModel }) {
    this.pointListContainer = pointListContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.pointList = [...this.pointsModel.getPoints()];
    this.point = this.pointList[0];

    render(new SortView(), this.pointListContainer);
    render(this.pointListComponent, this.pointListContainer);
    render(new PointEditView({
      point: this.point,
      types: this.offersModel.getTypes(),
      destination: this.destinationsModel.getDestinationById(this.point.destination),
      offers: this.offersModel.getOffersByType(this.point.type),
      checkedList: this.offersModel.getOffersSelected(this.point),
    }), this.pointListComponent.getElement());

    for (let i = 0; i < this.pointList.length; i++) {
      const destination = this.destinationsModel.getDestinationById(this.pointList[i].destination);
      const offers = this.offersModel.getOffersSelected(this.pointList[i]);

      render(new PointView({
        point: this.pointList[i],
        destination: destination,
        offers: offers,
      }), this.pointListComponent.getElement());
    }
  }
}
