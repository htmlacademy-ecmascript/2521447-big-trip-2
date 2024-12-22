import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';
import { render } from '../render.js';


export default class EventListPresenter {
  EventListComponent = new EventListView();

  constructor({ eventListContainer, eventsModel }) {
    this.eventListContainer = eventListContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.eventList = [...this.eventsModel.getEvents()];

    render(new SortView(), this.eventListContainer);
    render(this.EventListComponent, this.eventListContainer);
    render(new EventEditView(), this.EventListComponent.getElement());

    for (let i = 0; i < this.eventList.length; i++) {
      render(new EventView({ event: this.eventList[i] }), this.EventListComponent.getElement());
    }
  }
}
