import { offersMock } from '../mock/offers-mock.js';


export default class OffersModel {
  #offers = offersMock;

  get offers() {
    return this.#offers;
  }

  get types() {
    return this.offers.map((item) => item.type);
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
