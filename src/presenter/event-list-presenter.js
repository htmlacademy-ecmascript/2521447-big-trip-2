import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';
import { render } from '../render.js';


export default class EventListPresenter {
  EventListComponent = new EventListView();

  constructor(EventListContainer) {
    this.EventListContainer = EventListContainer;
  }

  init() {
    render(new SortView(), this.EventListContainer);
    render(this.EventListComponent, this.EventListContainer);
    render(new EventEditView(), this.EventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.EventListComponent.getElement());
    }
  }
}
