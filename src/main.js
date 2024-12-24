import FilterView from './view/filter-view.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './render.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import PointsModel from './model/points-model.js';


const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');


const pointsModel = new PointsModel();
const pointListPresenter = new PointListPresenter({
  pointListContainer: siteTripEventsElement,
  pointsModel,
});


render(new FilterView(), siteFiltersElement);
render(new NewPointButtonView(), siteTripMainElement);


pointListPresenter.init();
