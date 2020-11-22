export {getRandomInteger, getRandomElementFromArr, render};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// const getRandomNumber = (min, max) => {
//   return Math.floor(Math.random() * (max - min)) + min;
// };

const getRandomElementFromArr = (array) => {
  const randomIndex = () => getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
