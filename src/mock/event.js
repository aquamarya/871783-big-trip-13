import {nanoid} from "nanoid";
import {getRandomInteger, getRandomElementFromArr} from "../utils";
import {eventType, eventPlace, photosAmount, descriptionsAmount, eventPlaceDescriptions, EventPrice, OffersAmount, eventOffers} from "../consts";

export const generateTripEvent = () => {
  const id = nanoid();
  const type = getRandomInteger(eventType);
  const city = getRandomInteger(eventPlace);
  const cityDescription = getRandomCityDescriptions();
  const placePhotos = getPlacePhotos();
  const dateInterval = getDateInterval();
  const price = getRandomInteger(EventPrice.MIN, EventPrice.MAX);
  const hasOffer = getRandomInteger(OffersAmount.MIN, OffersAmount.MAX);
  const isFavorite = Boolean(getRandomInteger());
  return {
    id,
    type,
    city,
    cityDescription,
    placePhotos,
    dateInterval,
    price,
    offers: hasOffer ? getRandomOffers(eventOffers) : null,
    isFavorite,
  };
};

const getRandomCityDescriptions = () => {
  const description = [];
  for (let i = 0; i < getRandomInteger(descriptionsAmount.MIN, descriptionsAmount.MAX); i++) {
    description.push(getRandomElementFromArr(eventPlaceDescriptions));
  }
  return description.join(` `);
};

const getPlacePhotos = () => {
  const cityPhotosLinks = [];
  for (let i = 0; i < getRandomInteger(photosAmount.MIN, photosAmount.MAX); i++) {
    cityPhotosLinks.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return cityPhotosLinks;
};

const getDateInterval = () => {

};

export const getRandomOffers = (offers) => {
  const randomOffers = [];
  for (let offer of offers) {
    offer = getRandomElementFromArr(offers);
    if (randomOffers.indexOf(offer) === -1) {
      randomOffers.push(offer);
    }
  }
  return randomOffers;
};

export const generateTripEventList = (amount) => {
  return new Array(amount)
    .fill(``)
    .map(generateTripEvent);
};
