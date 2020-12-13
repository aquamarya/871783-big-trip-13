import TripInfoView from "../view/trip-info";
import TripCostView from "../view/trip-cost";
import SortingView from "../view/sorting";
import TripEventListView from "../view/trip-event-list";
import EventPresenter from "./event";
import NoEventView from "../view/no-event";
import {render, RenderPosition} from "../utils/render";
import {updateItem, timeSortEvents, priceSortEvents} from "../utils/common";
import {SortType} from "../consts";

export default class Events {
  constructor(eventsContainer) {
    this._eventsContainer = eventsContainer;
    this._eventPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._eventListComponent = new TripEventListView();
    this._sortingComponent = new SortingView();
    this._noEventComponent = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._soursedEvents = events.slice();

    if (events.length) {
      this._renderInfo(events);
      this._renderCost(events);
      this._renderSort();
      this._renderEventList();
      // events.forEach((event) => {
      //   this._renderEventItem(event);
      // });
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

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._events.sort(priceSortEvents);
        break;
      case SortType.TIME:
        this._events.sort(timeSortEvents);
        break;
      default:
        this._events = this._soursedEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();
    // this._renderEventList();
    this._events.forEach((event) => {
      this._renderEventItem(event);
    });
  }

  _renderSort() {
    render(this._eventsContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
