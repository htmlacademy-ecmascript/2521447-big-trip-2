import { getRandomPoint } from '../mock/points-mock.js';


const POINT_COUNT = 10;
let points = [];

while (points.length < POINT_COUNT) {
  points.push(getRandomPoint());
  points = points.filter((point, i, items) => items.indexOf(point) === i);
}


export default class PointsModel {
  #points = points;

  get points() {
    return this.#points;
  }
}
