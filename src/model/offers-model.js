export default class OffersModel {
  #offersApiService = null;
  #offers = [];

  constructor({ offersApiService }) {
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  get types() {
    return this.offers.map((item) => item.type);
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch (err) {
      this.#offers = [];
    }
  }

  getOffersByType(type) {
    return this.#offers.find((item) => item.type === type).offers;
  }

  getOffersSelected(point) {
    const { type, offers } = point;
    const offersByType = this.getOffersByType(type);

    return offersByType.filter((item) => offers.includes(item.id));
  }
}
