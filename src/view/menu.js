import {createElement} from "../utils";
import {Tabs} from "../consts";

export default class Menu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${Tabs.TABLE}</a>
      <a class="trip-tabs__btn" href="#">${Tabs.STATS}</a>
    </nav>
  `;
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
