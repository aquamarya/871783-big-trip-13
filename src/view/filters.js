import {FilterTypes} from "../consts";
import AbstractView from "./absract";

export default class Filters extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return `
    <form class="trip-filters" action="#" method="get">
        ${this.getFilters(this._filters)}
        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
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
