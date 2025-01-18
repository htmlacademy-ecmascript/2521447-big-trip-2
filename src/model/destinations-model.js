import { destinationsMock } from '../mock/destinations-mock.js';


export default class DestinationsModel {
  #destinations = destinationsMock;

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
