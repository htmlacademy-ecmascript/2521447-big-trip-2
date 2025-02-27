const MAX_POINTS_FOR_TRIP_INFO = 3;
const ERROR_MESSAGE = 'Failed to load latest route information';

const FormatDate = {
  DATE_TIME: 'DD-MM-YYYY',
  DATE_POINT: 'MMM D',
  DATE_SCHEDULE: 'HH:mm',
  DATE_SLASHED: 'DD/MM/YY',
  DATE_PICKER_FORMAT: 'd/m/y H:i',
  DATE_TRIP_INFO: 'DD MMM',
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
  FormatDate,
  MillisecondsInValue,
  FilterType,
  SortType,
  SortDisabled,
  UserAction,
  UpdateType,
  NoPointsTextType,
  TimeLimit
};
