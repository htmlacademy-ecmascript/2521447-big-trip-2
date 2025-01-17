import FilterView from './view/filter-view.js';
import NewPointButtonView from './view/new-point-button-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import PointsModel from './model/points-model.js';
import { render } from './render.js';


const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');


const pointsModel = new PointsModel();


const tripEventsPresenter = new TripEventsPresenter({
  pointListContainer: siteTripEventsElement,
  pointsModel,
});


render(new FilterView(), siteFiltersElement);
render(new NewPointButtonView(), siteTripMainElement);


tripEventsPresenter.init();
