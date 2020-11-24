import {nanoid} from "nanoid";
import dayjs from "dayjs";
import {getRandomInteger, getRandomElementFromArr} from "../utils";
import {eventTypes, eventPlaces, photosAmount, descriptionsAmount, eventPlaceDescriptions, EventPrice, OffersAmount, eventOffers} from "../consts";

export const generateTripEvent = () => {
  const id = nanoid();
  // const type = getRandomInteger(0, eventTypes.length - 1);
  // const city = getRandomInteger(0, eventPlaces.length - 1);
  // const type = getRandomElementFromArr(eventTypes);
  // const city = getRandomElementFromArr(eventPlaces);
  const cityDescription = getRandomCityDescriptions();
  const placePhotos = getPlacePhotos();
  // const dateTime = getDateTime();
  const {startEventTime, endEventTime} = getDateTime();
  const price = getRandomInteger(EventPrice.MIN, EventPrice.MAX);
  // const hasOffer = getRandomInteger(OffersAmount.MIN, OffersAmount.MAX);
  // let offers = getRandomOffers();
  const isFavorite = Boolean(getRandomInteger());
  return {
    id,
    type: getRandomElementFromArr(eventTypes),
    city: getRandomElementFromArr(eventPlaces),
    cityDescription,
    placePhotos,
    startEventTime,
    endEventTime,
    price,
    offers: getRandomInteger(OffersAmount.MIN, OffersAmount.MAX) ? getRandomOffers(eventOffers) : null,
    // offers: getRandomOffers(),
    // offers,
    isFavorite,
  };
};

const getRandomCityDescriptions = () => {
  let description = ``;
  for (let i = 0; i < getRandomInteger(descriptionsAmount.MIN, descriptionsAmount.MAX); i++) {
    description += eventPlaceDescriptions[i];
  }
  return description.trim();
};

const getPlacePhotos = () => {
  const cityPhotosLinks = [];
  for (let i = 0; i < getRandomInteger(photosAmount.MIN, photosAmount.MAX); i++) {
    cityPhotosLinks.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return cityPhotosLinks;
};

const getDateTime = () => {
  const dateTimeFormat = `2019-12-25T16:00`;
  const maxDaysGap = 7;
  const startEventTime = dayjs(dateTimeFormat).add(getRandomInteger(-maxDaysGap, maxDaysGap), `day`).toDate();
  const endEventTime = dayjs(startEventTime).add(getRandomInteger(1, maxDaysGap), `day`).toDate();
  return {startEventTime, endEventTime};
};

export const getDuration = () => {

};

// const generateDate = () => {
//   return (
//     Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomInteger(0, 60) * 60 * 1000
//   );
// };

const getRandomOffers = (offers) => {
  const randomOffers = [];
  for (let i = 0; i < getRandomInteger(OffersAmount.MIN, OffersAmount.MAX); i++) {
    const offer = getRandomElementFromArr(offers);
    if (randomOffers.indexOf(offer) === -1) {
      randomOffers.push(offer);
    }
  }
  return randomOffers;
};

// const getRandomOffers = (offers) => {
//   getRandomElementFromArr(offers, OffersAmount.MIN, OffersAmount.MAX).map((offer) => {
//     offer.checked = Boolean(getRandomInteger(0, 1));
//
//     return offer;
//   });
// };
