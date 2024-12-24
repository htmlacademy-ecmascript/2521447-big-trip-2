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

  getDestinationById(id) {
    const destinations = this.getDestinations();
    return destinations.find((destination) => destination.id === id);
  }

  getOffersSelected(point) {
    const { type, offers: points } = point;
    const pointsByType = this.getOffers().find((el) => el.type === type).offers;

    return pointsByType.filter((item) => points.find((id) => id === item.id));
  }
}
