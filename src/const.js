const FormatDate = {
  DATE_TIME: 'DD-MM-YYYY',
  DATE_POINT: 'MMM D',
  DATE_SCHEDULE: 'HH:mm',
  DATE_SLASHED: 'DD/MM/YY',
  DATE_PICKER_FORMAT: 'd/m/y H:i',
};


const MillisecondsInValue = {
  MILLISECONDS_IN_HOUR: 1000 * 60 * 60,
  MILLISECONDS_IN_DAY: 1000 * 60 * 60 * 24,
};


const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};


const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};


const SortDisabled = {
  [SortType.DAY]: '',
  [SortType.EVENT]: 'disabled',
  [SortType.TIME]: '',
  [SortType.PRICE]: '',
  [SortType.OFFERS]: 'disabled',
};


export { FormatDate, MillisecondsInValue, FilterType, SortType, SortDisabled };
