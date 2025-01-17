import { destinations } from '../mock/destinations.js';


export default class DestinationsModel {
  destinations = destinations;

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.getDestinations().find((destination) => destination.id === id);
  }
}
