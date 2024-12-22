import FilterView from './view/filter-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import { render } from './render.js';
import EventListPresenter from './presenter/event-list-presenter.js';
import EventsModel from './model/events-model.js';


const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();

const eventsListPresenter = new EventListPresenter({
  eventListContainer: siteTripEventsElement,
  eventsModel,
});

render(new FilterView(), siteFiltersElement);
render(new NewEventButtonView(), siteTripMainElement);

eventsListPresenter.init();
