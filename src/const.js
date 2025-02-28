const MAX_POINTS_FOR_TRIP_INFO = 3;
const ERROR_MESSAGE = 'Failed to load latest route information';

const DateFormat = {
  TIME: 'HH:mm',
  MONTH: 'MMM D',
  DATE: 'DD/MM/YY HH:mm',
  DATEPICKR: 'd/m/y H:i',
  TRIP_INFO: 'DD MMM',
};


const MillisecondsInValue = {
  HOUR: 3600000,
  DAY: 86400000,
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


const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};


const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};


export {
  MAX_POINTS_FOR_TRIP_INFO,
  ERROR_MESSAGE,
  DateFormat,
  MillisecondsInValue,
  FilterType,
  SortType,
  SortDisabled,
  UserAction,
  UpdateType,
  NoPointsTextType,
  TimeLimit
};
