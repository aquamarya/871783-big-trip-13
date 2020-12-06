import {nanoid} from "nanoid";
import dayjs from "dayjs";
import {getRandomInteger, getRandomArrayElement} from "../utils/common";
import {eventTypes, eventPlaces, PhotosAmount, DescriptionsAmount, eventPlaceDescriptions, EventPrice, OffersAmount, eventOffers} from "../consts";

const getRandomCityDescriptions = () => {
  let description = ``;
  for (let i = 0; i < getRandomInteger(DescriptionsAmount.MIN, DescriptionsAmount.MAX); i++) {
    description += eventPlaceDescriptions[i];
  }
  return description.trim();
};

const getPlacePhotos = () => {
  return new Array(getRandomInteger(PhotosAmount.MIN, PhotosAmount.MAX))
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

const getRandomOffers = () => {
  const randomOffers = [];
  for (let i = 0; i < getRandomInteger(OffersAmount.MIN, OffersAmount.MAX); i++) {
    randomOffers.push(eventOffers[getRandomInteger(0, eventOffers.length - 1)]);
  }
  return randomOffers;
};

const generateTripEvent = () => {
  const id = nanoid();
  const eventType = getRandomArrayElement(eventTypes);
  const city = getRandomArrayElement(eventPlaces);
  const cityDescription = getRandomCityDescriptions();
  const placePhotos = getPlacePhotos();
  const {startEventTime, endEventTime} = getDateTime();
  const price = getRandomInteger(EventPrice.MIN, EventPrice.MAX);
  const isFavorite = Boolean(getRandomInteger(0, 1));
  return {
    id,
    type: eventType,
    city,
    cityDescription,
    placePhotos,
    startEventTime,
    endEventTime,
    price,
    offers: getRandomOffers(),
    isFavorite,
  };
};

const createEvents = (amount) => {
  return new Array(amount)
    .fill(``)
    .map(generateTripEvent)
    .sort((a, b) => a.startEventTime - b.startEventTime);
};

export {createEvents};
