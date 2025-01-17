import { getRandomPoint } from '../mock/points.js';
import { destinations } from '../mock/destinations.js';
import { offers } from '../mock/offers.js';
import { POINT_COUNT } from '../const.js';


export default class PointsModel {
  points = Array.from({ length: POINT_COUNT }, getRandomPoint);
  destinations = destinations;
  offers = offers;


  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getTypes() {
    return this.getOffers().map((item) => item.type);
  }

  getOffersByType(type) {
    return this.offers.find((item) => item.type === type).offers;
  }

  getDestinationById(id) {
    const destinations = this.getDestinations();
    return destinations.find((destination) => destination.id === id);
  }

  getOffersSelected(point) {
    const { type, offers } = point;
    const offersByType = this.getOffersByType(type);

    return offersByType.filter((item) => offers.find((id) => id === item.id));
  }
}
