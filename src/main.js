import TripInfoView from "./view/trip-info";
import TripCostView from "./view/trip-cost";
import MenuView from "./view/menu";
import FiltersView from "./view/filters";
import SortingView from "./view/sorting";
import TripEventListView from "./view/trip-event-list";
import TripEventItemView from "./view/trip-event-item";
import EditEventView from "./view/edit-event";
// import NewEventView from "./view/new-event";
import NoEventView from "./view/no-event";
import {EVENT_AMOUNT} from "./consts";
import {render, RenderPosition, replace} from "./utils/render";
import {createEvents} from "./mock/event";

const events = createEvents(EVENT_AMOUNT);
const tripInfoElement = new TripInfoView(events);
const tripMain = document.querySelector(`.trip-main`);
render(tripMain, tripInfoElement, RenderPosition.AFTERBEGIN);

render(tripInfoElement, new TripCostView(), RenderPosition.BEFOREEND);

const tripControls = document.querySelector(`.trip-controls`);
render(tripControls, new MenuView(), RenderPosition.AFTERBEGIN);
render(tripControls, new FiltersView(), RenderPosition.BEFOREEND);

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);
render(tripEvents, new SortingView(), RenderPosition.BEFOREEND);
render(tripEvents, new TripEventListView(), RenderPosition.BEFOREEND);

const eventsList = document.querySelector(`.trip-events__list`);

const renderEvent = (eventList, event) => {
  const eventItemComponent = new TripEventItemView(event);
  const eventEditComponent = new EditEventView(event);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceCardToForm = () => {
    replace(eventEditComponent, eventItemComponent);
  };

  const replaceFormToCard = () => {
    replace(eventItemComponent, eventEditComponent);
  };

  eventItemComponent.setRollupBtnClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormCloseHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventsList, eventItemComponent, RenderPosition.AFTERBEGIN);
};

const eventListComponent = new TripEventListView();
events.forEach((event) => {
  renderEvent(eventListComponent, event);
});

// render(eventsList, new NewEventView(events[0]), RenderPosition.AFTERBEGIN);

if (events.length === 0) {
  render(tripEvents, new NoEventView(), RenderPosition.BEFOREEND);
}

export {events};
