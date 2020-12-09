import dayjs from "dayjs";
import {eventTypes, eventOffers, eventPlaces} from "../consts";
import AbstractView from "./absract";

export default class EditEvent extends AbstractView {
  constructor({type, city, cityDescription, startEventTime, endEventTime, price, event}) {
    super();
    this._event = event;
    this._type = type;
    this._city = city;
    this._description = cityDescription;
    this._startEventTime = startEventTime;
    this._endEventTime = endEventTime;
    this._price = price;
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate(id) {
    return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${this.createEventTypeList(eventTypes)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${this._type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${this._city}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${this.getDestinationsOptionTemplate()}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dayjs(this._startEventTime).format(`YYYY/MM/DD HH:mm`)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dayjs(this._endEventTime).format(`YYYY/MM/DD HH:mm`)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${this._price}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
                ${this.getOfferTemplate()}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${this._description}</p>
          </section>
        </section>
      </form>
    </li>
  `;
  }

  createEventTypeList() {
    return eventTypes.map((type, id) => {
      return (`
      <div class="event__type-item">
        <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
      </div>`
      );
    }).join(``);
  }

  getDestinationsOptionTemplate(options) {
    if (options === null) {
      return ``;
    }
    return eventPlaces.map((option) => {
      return `<option value="${option}"></option>`;
    });
  }

  getOfferTemplate() {
    return eventOffers.map((offer, id) => {
      return (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${id}" type="checkbox" name="event-offer-comfort" checked>
          <label class="event__offer-label" for="event-offer-comfort-${id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );
    }).join(``);
  }

  _formCloseHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormCloseHandler(callback) {
    this._callback.formClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formCloseHandler);
  }


  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._event);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

}
