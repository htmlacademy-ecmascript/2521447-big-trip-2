import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { MillisecondsInValue } from '../const.js';


const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';
const sortDateAscending = (firstDate, secondDate) => dayjs(firstDate.dateFrom).diff(dayjs(secondDate.dateFrom));
const sortPriceDescending = (firstPrice, secondPrice) => secondPrice.basePrice - firstPrice.basePrice;

const sortDurationTimeDescending = (firstTime, secondTime) => {
  const getDuration = (time) => dayjs(time.dateTo).diff(time.dateFrom);
  return getDuration(secondTime) - getDuration(firstTime);
};

const getMaxDate = (date) => dayjs(date) - MillisecondsInValue.HOUR;
const getMinDate = (date) => dayjs(date) + MillisecondsInValue.HOUR;

dayjs.extend(duration);


const getFormattedDurationTime = (firstTime, secondTime) => {
  const durationTime = dayjs(secondTime).diff(firstTime);
  const durationProperty = dayjs.duration(durationTime);

  if (durationTime < MillisecondsInValue.HOUR) {
    return durationProperty.format('mm[M]');
  }

  if (durationTime < MillisecondsInValue.DAY) {
    return durationProperty.format('HH[H] mm[M]');
  }

  const days = Math.floor(durationProperty.asDays());
  const formattedDays = days < 10 ? `0${days}D` : `${days}D`;

  return `${formattedDays} ${durationProperty.format('HH[H] mm[M]')}`;
};


export {
  humanizeDate,
  sortDateAscending,
  sortPriceDescending,
  sortDurationTimeDescending,
  getFormattedDurationTime,
  getMaxDate,
  getMinDate,
};
