import AbstractView from "./abstract";
import {Tabs} from "../consts";

export default class Menu extends AbstractView {
  getTemplate() {
    return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${Tabs.TABLE}</a>
      <a class="trip-tabs__btn" href="#">${Tabs.STATS}</a>
    </nav>
  `;
  }
}
