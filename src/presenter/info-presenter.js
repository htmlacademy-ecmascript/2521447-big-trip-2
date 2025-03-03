import { DateFormat, MAX_POINTS_FOR_TRIP_INFO } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { humanizeDate, sortDateAscending } from '../utils/point.js';
import TripInfo from '../view/trip-info-view.js';

export default class InfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;

  #total = null;

  constructor({ tripInfoContainer }) {
    this.#tripInfoContainer = tripInfoContainer;
  }

  init({ pointsModel, offersModel, destinationsModel }) {

    this.#tripInfoComponent = new TripInfo({
      totalCost: this.#getTotalCost(pointsModel, offersModel),
      infoTitle: this.#getInfoTitle(pointsModel, destinationsModel),
      infoDate: this.#getInfoDate(pointsModel),
    });

    this.renderTripInfo();
  }

  renderTripInfo() {
    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  removeTripInfo() {
    remove(this.#tripInfoComponent);
  }

  #getTotalCost(pointsModel, offersModel) {
    const totalPointsCost = pointsModel.points.reduce((prev, i) => prev + i.basePrice, 0);

    let totalOffersCost = 0;
    pointsModel.points.map((point) => {
      const selectedOffers = offersModel.getOffersSelected(point);

      selectedOffers.map((offer) => (totalOffersCost += offer.price));
    });

    return totalPointsCost + totalOffersCost;
  }

  #getInfoTitle(pointsModel, destinationsModel) {
    let points = [...pointsModel.points].sort(sortDateAscending);
    let separator = ' &mdash; ';

    if (points.length > MAX_POINTS_FOR_TRIP_INFO) {
      points = [points[0], points.pop()];
      separator = ' &mdash; ... &mdash; ';
    }

    return points.map((point) => destinationsModel.getDestinationById(point.destination)?.name).join(separator);
  }

  #getInfoDate(pointsModel) {
    const points = [...pointsModel.points].sort(sortDateAscending);

    if (points.length === 0) {
      return '';
    }

    const firstPoint = points[0];
    const lastPoint = points.pop();

    const tripStart = humanizeDate(firstPoint.dateFrom, DateFormat.TRIP_INFO);
    const tripEnd = humanizeDate(lastPoint.dateTo, DateFormat.TRIP_INFO);

    if (tripStart === tripEnd) {
      return tripStart;
    }

    return `${tripStart} — ${tripEnd}`;
  }
}
