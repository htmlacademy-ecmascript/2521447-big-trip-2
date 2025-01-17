import FilterView from './view/filter-view.js';
import NewPointButtonView from './view/new-point-button-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import PointsModel from './model/points-model.js';
import { getRandomPoint } from './mock/points.js';
import { destinations } from './mock/destinations.js';
import { offers } from './mock/offers.js';
import { POINT_COUNT } from './const.js';
import { render } from './render.js';


const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');


const pointsModel = new PointsModel({
  points: Array.from({ length: POINT_COUNT }, getRandomPoint),
  destinations: destinations,
  offers: offers
});


const tripEventsPresenter = new TripEventsPresenter({
  pointListContainer: siteTripEventsElement,
  pointsModel,
});


render(new FilterView(), siteFiltersElement);
render(new NewPointButtonView(), siteTripMainElement);


tripEventsPresenter.init();
