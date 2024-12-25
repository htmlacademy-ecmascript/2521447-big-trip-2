export default class PointsModel {
  constructor({ points, destinations, offers }) {
    this.points = points;
    this.destinations = destinations;
    this.offers = offers;
  }

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
