import { remove, render, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/trip-info-view.js';

export default class InfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;

  #total = null;

  constructor({ tripInfoContainer }) {
    this.#tripInfoContainer = tripInfoContainer;
  }

  init({ pointsModel, offersModel }) {

    this.#tripInfoComponent = new TripInfo({
      totalCost: this.#getTotalCost(pointsModel, offersModel),
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
}
