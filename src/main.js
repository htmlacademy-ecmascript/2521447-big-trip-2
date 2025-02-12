import { render } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';


const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const sitePageMainElement = document.querySelector('.page-main');
const siteBodyContainerElement = sitePageMainElement.querySelector('.page-body__container');


const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripContainer: siteBodyContainerElement,
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteFiltersElement,
  filterModel: filterModel,
  pointsModel: pointsModel,
});


render(new NewPointButtonView(), siteTripMainElement);


filterPresenter.init();
tripPresenter.init();
