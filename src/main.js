import {createTripInfoTemplate} from "./view/trip-info";
import {createTripCostTemplate} from "./view/trip-cost";
import {createMenuTemplate} from "./view/menu";
import {createFiltersTemplate} from "./view/filters";
import {createSortingTemplate} from "./view/sorting";
import {createTripEventListTemplate} from "./view/trip-event-list";
import {createTripEventItemTemplate} from "./view/trip-event-item";
import {createEditEventTemplate} from "./view/edit-event";
import {EVENT_AMOUNT} from "./consts";
import {render} from "./utils";
import {generateTripEvent} from "./mock/event";

export const events = new Array(EVENT_AMOUNT).fill().map(generateTripEvent);
// console.log(events);
events.slice().sort((a, b) => a.startEventTime - b.startEventTime);
const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createTripInfoTemplate(events), `afterbegin`);

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, createTripCostTemplate(), `beforeend`);

const tripControls = document.querySelector(`.trip-controls`);
render(tripControls, createMenuTemplate(), `beforeend`);
render(tripControls, createFiltersTemplate(), `beforeend`);

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);
render(tripEvents, createSortingTemplate(), `beforeend`);
render(tripEvents, createTripEventListTemplate(), `beforeend`);

const eventsList = document.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_AMOUNT; i++) {
  render(eventsList, createTripEventItemTemplate(events[i]), `beforeend`);
}

render(eventsList, createEditEventTemplate(events[0]), `afterbegin`);
