import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mock/points-mock.js';


const POINT_COUNT = 10;
let points = [];

while (points.length < POINT_COUNT) {
  points.push(getRandomPoint());
  points = points.filter((point, i, items) => items.indexOf(point) === i);
}


export default class PointsModel extends Observable {
  #points = points;

  get points() {
    return this.#points;
  }

  updateTask(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addTask(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deleteTask(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
