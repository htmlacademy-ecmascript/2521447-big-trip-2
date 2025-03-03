export default class DestinationsModel {
  #destinationsApiService = null;
  #destinations = [];

  isError = false;

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
      this.isError = true;
    }
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
