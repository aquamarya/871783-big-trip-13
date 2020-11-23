export {EVENT_AMOUNT, eventTypes, eventPlaces, photosAmount, descriptionsAmount, eventPlaceDescriptions, EventPrice, OffersAmount, eventOffers};

const EVENT_AMOUNT = 20;
const eventTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const eventPlaces = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `London`,
  `Berlin`,
  `Copenhagen`,
  `Tokyo`,
  `New York`,
  `Milan`
];
const descriptionsAmount = {
  MIN: 1,
  MAX: 5
};
const eventPlaceDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const photosAmount = {
  MIN: 1,
  MAX: 3
};
const EventPrice = {
  MIN: 100,
  MAX: 1000
};
const OffersAmount = {
  MIN: 1,
  MAX: 5
};
const eventOffers = [
  {
    title: `Add luggage`,
    price: 50,
    isChecked: false
  },
  {
    title: `Switch to comfort class`,
    price: 80,
    isChecked: false
  },
  {
    title: `Add meal`,
    price: 15,
    isChecked: false
  },
  {
    title: `Choose seats`,
    price: 5,
    isChecked: false
  },
  {
    title: `Travel by train`,
    price: 40,
    isChecked: false
  },
];
