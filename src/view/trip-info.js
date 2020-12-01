// import dayjs from "dayjs";
import {createElement} from "../utils";
import dayjs from "dayjs";

const createTripInfoTemplate = (events) => {
  const {startEventTime, endEventTime} = events;

  const getRouteInfo = () => {
    const routeInfo = [];
    for (const eventItem of events) {
      routeInfo.push(eventItem.city);
    }
    return routeInfo.reverse();
  };

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRouteInfo().join(` &mdash; `)}</h1>
        <p class="trip-info__dates">${dayjs(startEventTime).format(`YYYY/MM/DD HH:mm`)}&nbsp;&mdash;&nbsp;${dayjs(endEventTime).format(`YYYY/MM/DD HH:mm`)}</p>
      </div>
    </section>
  `;
};

export default class TripInfo {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
