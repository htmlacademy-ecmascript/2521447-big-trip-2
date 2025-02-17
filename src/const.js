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


const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};


const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future points now',
  [FilterType.PRESENT]: 'There are no present points now',
  [FilterType.PAST]: 'There are no past points now',
};


export {
  FormatDate,
  MillisecondsInValue,
  FilterType,
  SortType,
  SortDisabled,
  UserAction,
  UpdateType,
  NoPointsTextType,
};
