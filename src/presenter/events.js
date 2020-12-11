import TripInfoView from "../view/trip-info";
import TripCostView from "../view/trip-cost";
import SortingView from "../view/sorting";
import TripEventListView from "../view/trip-event-list";
import EventPresenter from "./event";
import NoEventView from "../view/no-event";
import {render, RenderPosition} from "../utils/render";
import {updateItem} from "../utils/common";

export default class Events {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;
    this._eventPresenter = {};

    this._eventListComponent = new TripEventListView();
    this._sortingComponent = new SortingView();
    this._noEventComponent = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();

    if (events.length) {
      this._renderInfo(events);
      this._renderCost(events);
      this._renderSorting();
      this._renderEventList();
      events.forEach((event) => {
        this._renderEventItem(event);
      });
    } else {
      this._renderNoEvent();
    }
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _renderInfo(events) {
    this._tripInfoComponent = new TripInfoView(events);
    const tripMain = document.querySelector(`.trip-main`);
    render(tripMain, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCost() {
    this._costComponent = new TripCostView();
    render(this._tripInfoComponent, this._costComponent, RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    render(this._eventsContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoEvent() {
    render(this._eventsContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderEventItem(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEventList() {
    render(this._eventsContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  }

  _clearEventList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }
}
