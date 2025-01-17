import { offersList } from '../mock/offers.js';


export default class OffersModel {
  offers = offersList;

  getOffers() {
    return this.offers;
  }

  getTypes() {
    return this.getOffers().map((item) => item.type);
  }

  getOffersByType(type) {
    return this.offers.find((item) => item.type === type).offers;
  }

  getOffersSelected(point) {
    const { type, offers } = point;
    const offersByType = this.getOffersByType(type);

    return offersByType.filter((item) => offers.includes(item.id));
  }
}
