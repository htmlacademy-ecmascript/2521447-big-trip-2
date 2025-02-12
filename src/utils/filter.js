import dayjs from 'dayjs';
import { FilterType } from '../const.js';

const today = dayjs().valueOf();
const getDateFromInMilliseconds = (point) => dayjs(point.dateFrom).valueOf();
const getDateToInMilliseconds = (point) => dayjs(point.dateTo).valueOf();

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => getDateFromInMilliseconds(point) > today),
  [FilterType.PRESENT]: (points) => points
    .filter(
      (point) => getDateFromInMilliseconds(point) <= today && getDateToInMilliseconds(point) >= today),
  [FilterType.PAST]: (points) => points.filter((point) => getDateToInMilliseconds(point) < today),
};

export { filter };
