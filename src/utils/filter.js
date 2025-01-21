import { FilterType } from '../const.js';
import { humanizeEventDate } from './point.js';

const today = humanizeEventDate(new Date());

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => humanizeEventDate(point.dateFrom) > today),
  [FilterType.PRESENT]: (points) => points.filter((point) => humanizeEventDate(point.dateFrom) === today),
  [FilterType.PAST]: (points) => points.filter((point) => humanizeEventDate(point.dateFrom) < today),
};

export { filter };
