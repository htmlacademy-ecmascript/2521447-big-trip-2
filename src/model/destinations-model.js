export default class DestinationsModel {
  #destinationsApiService = null;
  #destinations = [];

  constructor({ destinationsApiService }) {
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
