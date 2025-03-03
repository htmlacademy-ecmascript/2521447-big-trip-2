const isEsc = (key) => key === 27;

const getCapitalizeValue = (value) => value.at(0).toUpperCase() + value.slice(1);

export {
  isEsc,
  getCapitalizeValue,
};
