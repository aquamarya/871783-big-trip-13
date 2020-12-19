import MenuView from "./view/menu";
import FiltersView from "./view/filters";
// import NewEventView from "./view/new-event";
import {EVENT_AMOUNT} from "./consts";
import {render, RenderPosition} from "./utils/render";
import {createEvents} from "./mock/event";
import EventsPresenter from "./presenter/events";

const events = createEvents(EVENT_AMOUNT);

const tripControls = document.querySelector(`.trip-controls`);
const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

const eventsPresenter = new EventsPresenter(tripEvents);

render(tripControls, new MenuView(), RenderPosition.AFTERBEGIN);
render(tripControls, new FiltersView(), RenderPosition.BEFOREEND);

eventsPresenter.init(events);

// render(eventsList, new NewEventView(events[0]), RenderPosition.AFTERBEGIN);

export {events};
