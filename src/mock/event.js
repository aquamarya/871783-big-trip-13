import {nanoid} from "nanoid";
import dayjs from "dayjs";
import {getRandomInteger, getRandomArrayElement} from "../utils";
import {eventTypes, eventPlaces, photosAmount, descriptionsAmount, eventPlaceDescriptions, EventPrice, OffersAmount, eventOffers} from "../consts";

const generateTripEvent = () => {
  const id = nanoid();
  const type = getRandomArrayElement(eventTypes);
  const city = getRandomArrayElement(eventPlaces);
  const cityDescription = getRandomCityDescriptions();
  const placePhotos = getPlacePhotos();
  const {startEventTime, endEventTime} = getDateTime();
  const price = getRandomInteger(EventPrice.MIN, EventPrice.MAX);
  const offers = getRandomArrayElement(eventOffers, OffersAmount.MIN, OffersAmount.MAX);
  const isFavorite = Boolean(getRandomInteger(0, 1));
  return {
    id,
    type,
    city,
    cityDescription,
    placePhotos,
    startEventTime,
    endEventTime,
    price,
    offers,
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
  return new Array(getRandomInteger(photosAmount.MIN, photosAmount.MAX))
    .fill(``)
    .map(()=>`http://picsum.photos/248/152?r=${Math.random()})`);
};

const getDateTime = () => {
  const dateTimeFormat = `2019-12-25T16:00`;
  const maxDaysGap = 7;
  const startEventTime = dayjs(dateTimeFormat).add(getRandomInteger(-maxDaysGap, maxDaysGap), `day`).toDate();
  const endEventTime = dayjs(startEventTime).add(getRandomInteger(1, maxDaysGap), `day`).toDate();
  return {startEventTime, endEventTime};
};

// const getRandomOffers = (offers) => {
//   const randomOffers = [];
//   for (let i = 0; i < getRandomInteger(OffersAmount.MIN, OffersAmount.MAX); i++) {
//     const offer = getRandomArrayElement(offers);
//     if (randomOffers.indexOf(offer) === -1) {
//       randomOffers.push(offer);
//     }
//   }
//   return randomOffers;
// };

// const getRandomOffers = () => {
//   return getRandomArrayElement(eventOffers, OffersAmount.MIN, OffersAmount.MAX).map((offer) => {
//     offer.checked = Boolean(getRandomInteger(0, 1));
//
//     return offer;
//   });
// };

export {generateTripEvent};
