import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { MillisecondsInValue } from './const.js';


const getRandomElementFromArray = (elements) => elements[Math.floor(Math.random() * elements.length)];
const getRandomNumberFromMinToMax = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
const humanizeEventDate = (date, formatDate) => date ? dayjs(date).format(formatDate) : '';
const formatString = (string) => string.at(0).toUpperCase() + string.slice(1);


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
  getRandomElementFromArray,
  getRandomNumberFromMinToMax,
  getRandomDate,
  humanizeEventDate,
  formatString,
  getDurationTime
};
