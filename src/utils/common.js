const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

const timeSortEvents = (eventA, eventB) => {
  return (eventB.endEventTime - eventB.startEventTime) - (eventB.endEventTime - eventA.startEventTime);
};

const priceSortEvents = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export {getRandomInteger, getRandomArrayElement, updateItem, timeSortEvents, priceSortEvents};
