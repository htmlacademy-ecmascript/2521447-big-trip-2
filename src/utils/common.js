const getRandomElementFromArray = (elements) => elements[Math.floor(Math.random() * elements.length)];


function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}


export {
  getRandomElementFromArray,
  updateItem,
};
