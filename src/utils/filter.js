import dayjs from 'dayjs';
import { FilterType } from '../const.js';

const todayInMilliseconds = dayjs().valueOf();
const getDateFromInMilliseconds = (point) => dayjs(point.dateFrom).valueOf();
const getDateToInMilliseconds = (point) => dayjs(point.dateTo).valueOf();

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => getDateFromInMilliseconds(point) > todayInMilliseconds),
  [FilterType.PRESENT]: (points) => points
    .filter(
      (point) => getDateFromInMilliseconds(point) <= todayInMilliseconds && getDateToInMilliseconds(point) >= todayInMilliseconds),
  [FilterType.PAST]: (points) => points.filter((point) => getDateToInMilliseconds(point) < todayInMilliseconds),
};

export { filter };
