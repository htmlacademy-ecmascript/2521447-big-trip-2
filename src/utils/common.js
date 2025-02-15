const getRandomElementFromArray = (elements) => elements[Math.floor(Math.random() * elements.length)];

const isEsc = (key) => key === 27;

export {
  getRandomElementFromArray,
  isEsc,
};
