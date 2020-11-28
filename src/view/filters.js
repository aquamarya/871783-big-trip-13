import {FilterTypes} from "../consts";

const createFiltersTemplate = () => {
  const getFilters = () => {
    return Object.values(FilterTypes).map((filter) => {
      const filterToLow = filter.toLowerCase();
      return (
        `<div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterToLow}">
          <label class="trip-filters__filter-label" for="filter-${filterToLow}">${filter}</label>
        </div>`
      );
    }).join(``);
  };

  return `
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
        ${getFilters()}
        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export {createFiltersTemplate};
