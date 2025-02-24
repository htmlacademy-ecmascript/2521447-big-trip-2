import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { MillisecondsInValue } from '../const.js';


const humanizeEventDate = (date, dateFormat = 'DD-MM-YYYY') => date ? dayjs(date).format(dateFormat) : '';
const formatString = (string) => string.at(0).toUpperCase() + string.slice(1);
const sortDateFromDown = (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
const sortPriceDown = (a, b) => b.basePrice - a.basePrice;
const sortDurationTimeDown = (a, b) => dayjs(b.dateTo).diff(b.dateFrom) - dayjs(a.dateTo).diff(a.dateFrom);
const getMaxDate = (a) => dayjs(a) - MillisecondsInValue.MILLISECONDS_IN_HOUR;
const getMinDate = (a) => dayjs(a) + MillisecondsInValue.MILLISECONDS_IN_HOUR;
const getDateToForBlankPoint = (a) => {
  const date = dayjs(a) + MillisecondsInValue.MILLISECONDS_IN_HOUR;
  return new Date(date);
};

dayjs.extend(duration);


const getDurationTime = (start, end) => {
  const durationTime = dayjs(end).diff(start);

  switch (true) {
    case durationTime < MillisecondsInValue.MILLISECONDS_IN_HOUR:
      return dayjs.duration(durationTime).format('mm[M]');

    case durationTime < MillisecondsInValue.MILLISECONDS_IN_DAY:
      return dayjs.duration(durationTime).format('HH[H] mm[M]');

    default:
      return Math.floor(dayjs.duration(durationTime).asDays()) < 10 ?
        `0${Math.floor(dayjs.duration(durationTime).asDays())}D 
      ${dayjs.duration(durationTime).format('HH[H] mm[M]')}` :
        `${Math.floor(dayjs.duration(durationTime).asDays())}D 
      ${dayjs.duration(durationTime).format('HH[H] mm[M]')}`;
  }
};


export {
  humanizeEventDate,
  formatString,
  sortDateFromDown,
  sortPriceDown,
  sortDurationTimeDown,
  getDurationTime,
  getMaxDate,
  getMinDate,
  getDateToForBlankPoint,
};
