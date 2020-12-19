import AbstractView from "./abstract";
import dayjs from "dayjs";

export default class TripInfo extends AbstractView {
  constructor(events, startEventTime, endEventTime) {
    super();
    this._events = events;
    this._startEventTime = startEventTime;
    this._endEventTime = endEventTime;
  }

  getTemplate() {
    return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${this.getRouteInfo().join(` &mdash; `)}</h1>
        <p class="trip-info__dates">${dayjs(this._startEventTime).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${dayjs(this._endEventTime).format(`DD`)}</p>
      </div>
    </section>
  `;
  }

  getRouteInfo() {
    const routeInfo = [];
    for (const eventItem of this._events) {
      routeInfo.push(eventItem.city);
    }
    return routeInfo.reverse();
  }
}
