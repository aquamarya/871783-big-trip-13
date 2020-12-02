import TripInfoView from "./view/trip-info";
import TripCostView from "./view/trip-cost";
import MenuView from "./view/menu";
import FiltersView from "./view/filters";
import SortingView from "./view/sorting";
import TripEventListView from "./view/trip-event-list";
import TripEventItemView from "./view/trip-event-item";
import EditEventView from "./view/edit-event";
import NewEventView from "./view/new-event";
import {EVENT_AMOUNT} from "./consts";
import {render, RenderPosition} from "./utils";
import {createEvents} from "./mock/event";

const events = createEvents(EVENT_AMOUNT);
const tripInfoElement = new TripInfoView(events).getElement();
const tripMain = document.querySelector(`.trip-main`);
render(tripMain, tripInfoElement, RenderPosition.AFTERBEGIN);

// const tripInfo = document.querySelector(`.trip-info`);
render(tripInfoElement, new TripCostView().getElement(), RenderPosition.BEFOREEND);

const tripControls = document.querySelector(`.trip-controls`);
render(tripControls, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(tripControls, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);
render(tripEvents, new SortingView().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new TripEventListView().getElement(), RenderPosition.BEFOREEND);

const eventsList = document.querySelector(`.trip-events__list`);

const renderEvent = (eventList, event) => {
  const eventItemComponent = new TripEventItemView(event);
  const eventEditComponent = new EditEventView(event);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();

      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceCardToForm = () => {
    eventsList.replaceChild(eventEditComponent.getElement(), eventItemComponent.getElement());
  };

  const replaceFormToCard = () => {
    eventsList.replaceChild(eventItemComponent.getElement(), eventEditComponent.getElement());
  };

  eventItemComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, replaceFormToCard);

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(eventsList, eventItemComponent.getElement(), RenderPosition.AFTERBEGIN);
};

const eventItemListComponent = new TripEventListView();
events.forEach((event) => {
  renderEvent(eventItemListComponent.getElement(), event);
});

// render(eventsList, new EditEventView(events[0]).getElement(), RenderPosition.AFTERBEGIN);
render(eventsList, new NewEventView(events[0]).getElement(), RenderPosition.AFTERBEGIN);

export {events};
