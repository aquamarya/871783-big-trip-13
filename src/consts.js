export {EVENT_AMOUNT, eventTypes, eventPlaces, photosAmount, descriptionsAmount, eventPlaceDescriptions, EventPrice, OffersAmount, eventOffers, FilterTypes, SortTypes};

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
// const durationOfStay = {
//   MIN: 5 * 60 * 1000, // 5 minutes
//   MAX: 23 * 60 * 60 * 1000, // 23 hours
//   FULL_DAY: 24 * 60 * 60 * 1000 // 24 hours
// };
const EventPrice = {
  MIN: 10,
  MAX: 1000
};
const OffersAmount = {
  MIN: 1,
  MAX: 5
};
let eventOffers = [
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

const FilterTypes = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`,
};

const SortTypes = {
  SORT_DAY: `sort-day`,
  SORT_EVENT: `sort-event`,
  SORT_TIME: `sort-time`,
  SORT_PRICE: `sort-price`,
  SORT_OFFER: `sort-offer`,
};
