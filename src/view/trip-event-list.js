import AbstractView from "./absract";

export default class TripEventList extends AbstractView {
  getTemplate() {
    return `
    <ul class="trip-events__list"></ul>
  `;
  }
}
