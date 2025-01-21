const FormatDate = {
  DATE_TIME: 'YYYY-MM-DD',
  DATE_POINT: 'MMM D',
  DATE_SCHEDULE: 'HH:mm',
  DATE_SLASHED: 'YY/MM/DD'
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


export { FormatDate, MillisecondsInValue, FilterType };
