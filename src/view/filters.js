import {createElement} from "../utils";
import {FilterTypes} from "../consts";

export default class Filters {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `
    <form class="trip-filters" action="#" method="get">
        ${this.getFilters()}
        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
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

  getFilters(isChecked) {
    return Object.values(FilterTypes).map((filter) => {
      return (
        `<div class="trip-filters__filter">
          <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase} ${isChecked ? `checked` : ``}">
          <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase}">${filter}</label>
        </div>`
      );
    }).join(``);
  }
}
