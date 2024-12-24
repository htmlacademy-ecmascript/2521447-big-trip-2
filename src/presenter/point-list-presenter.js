import PointListView from '../view/point-list-view.js';
import SortView from '../view/sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';


export default class PointListPresenter {
  pointListComponent = new PointListView();

  constructor({ pointListContainer, pointsModel }) {
    this.pointListContainer = pointListContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.pointList = [...this.pointsModel.getPoints()];

    render(new SortView(), this.pointListContainer);
    render(this.pointListComponent, this.pointListContainer);
    render(new PointEditView(), this.pointListComponent.getElement());

    for (let i = 0; i < this.pointList.length; i++) {
      render(new PointView({ point: this.pointList[i] }), this.pointListComponent.getElement());
    }
  }
}
