const EVENT_AMOUNT = 11;
const eventTypes = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];
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
const DescriptionsAmount = {
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
const PhotosAmount = {
  MIN: 1,
  MAX: 3
};
const EventPrice = {
  MIN: 10,
  MAX: 1000
};
const OffersAmount = {
  MIN: 1,
  MAX: 5
};
const eventOffers = [
  {
    title: `Add luggage`,
    isChecked: false,
    price: 50
  },
  {
    title: `Switch to comfort class`,
    isChecked: false,
    price: 80
  },
  {
    title: `Add meal`,
    isChecked: false,
    price: 15
  },
  {
    title: `Choose seats`,
    isChecked: false,
    price: 5
  },
  {
    title: `Travel by train`,
    isChecked: false,
    price: 40
  },
];

const Tabs = {
  TABLE: `Table`,
  STATS: `Stats`
};

const FilterTypes = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`,
};

export {
  EVENT_AMOUNT,
  eventTypes,
  eventPlaces,
  PhotosAmount,
  DescriptionsAmount,
  eventPlaceDescriptions,
  EventPrice,
  OffersAmount,
  eventOffers,
  Tabs,
  FilterTypes
};
