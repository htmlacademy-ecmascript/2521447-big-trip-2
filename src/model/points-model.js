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
}
