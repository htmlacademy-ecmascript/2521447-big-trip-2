import { render } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './api-service/points-api-service.js';
import { AUTHORIZATION, BASE_URL } from './api.js';
import DestinationsApiService from './api-service/destinations-api-service.js';
import OffersApiService from './api-service/offers-api-service.js';


const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const sitePageMainElement = document.querySelector('.page-main');
const siteBodyContainerElement = sitePageMainElement.querySelector('.page-body__container');


const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(BASE_URL, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(BASE_URL, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(BASE_URL, AUTHORIZATION)
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripContainer: siteBodyContainerElement,
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  filterModel: filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteFiltersElement,
  filterModel: filterModel,
  pointsModel: pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
tripPresenter.init();

destinationsModel.init();
offersModel.init()
  .then(() => pointsModel.init())
  .then(() => render(newPointButtonComponent, siteTripMainElement));
