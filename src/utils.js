const getRandomElementFromArray = (elements) => elements[Math.floor(Math.random() * elements.length)];
const getRandomNumberFromMinToMax = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));


export {
  getRandomElementFromArray,
  getRandomNumberFromMinToMax,
  getRandomDate,
};
