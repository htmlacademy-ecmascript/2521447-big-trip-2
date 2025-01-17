import { POINT_COUNT } from '../const.js';
import { getRandomPoint } from '../mock/points.js';


export default class PointsModel {
  points = Array.from({ length: POINT_COUNT }, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
