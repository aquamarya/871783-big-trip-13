import AbstractView from "./abstract";
import dayjs from "dayjs";

export default class TripEventItem extends AbstractView {
  constructor({type, city, price, offers, startEventTime, endEventTime, isFavorite}) {
    super();
    this._type = type;
    this._city = city;
    this._price = price;
    this._offers = offers;
    this._startEventTime = startEventTime;
    this._endEventTime = endEventTime;
    this._isFavorite = isFavorite;
    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dayjs(this._startEventTime).format(`YYYY-MM-DD`)}">${dayjs(this._startEventTime).format(`MMM-DD`)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._type} ${this._city}</h3>
        ${this.getSchedule()}
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
          ${this.getOfferTemplate()}
        <button class="event__favorite-btn ${this._isFavorite ? `event__favorite-btn--active` : ``}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
  }

  getSchedule() {
    return `
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dayjs(this._startEventTime).format(`YYYY-MM-DDTHH:mm`)}">${dayjs(this._startEventTime).format(`HH:mm`)}</time>
        &mdash;
        <time class="event__end-time" datetime="${dayjs(this._endEventTime).format(`YYYY-MM-DDTHH:mm`)}">${dayjs(this._endEventTime).format(`HH:mm`)}</time>
      </p>
      <p class="event__duration">30M</p>
    </div>
    `;
  }

  getOfferTemplate() {
    return `
    <ul class="event__selected-offers">
    ${this._offers.map((offer) => {
    return `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title ? offer.title : ``}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price ? offer.price : ``}</span>
      </li>
      `;
  }).join(``)}
    </ul>`;
  }

  _rollupBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupBtnClick();
  }

  setRollupBtnClickHandler(callback) {
    this._callback.rollupBtnClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupBtnClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
