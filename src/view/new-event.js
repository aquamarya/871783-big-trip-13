import dayjs from "dayjs";
import {eventTypes, eventOffers, eventPlaces} from "../consts";
import flatpickr from "flatpickr";
import SmartView from "./smart";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

export default class NewEvent extends SmartView {
  constructor(event) {
    super();
    this._data = NewEvent.parseEventToData(event);

    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  getPhotoTemplate(photos) {
    return photos.map((photo) => {
      return (
        `<img class="event__photo" src="${photo}" alt="Event photo">`
      );
    }).join(``);
  }

  getEventTypeItem() {
    return eventTypes.map((type) => {
      return (`
      <div class="event__type-item">
        <input id="event-type-${type}-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${this._id}">${type.toLowerCase()}</label>
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
    if (!eventOffers.length) {
      return ``;
    }

    return eventOffers.map((offer) => {
      const checked = offer.isChecked ? `checked` : ``;
      return (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${offer.title.toLowerCase()}-${this._id}" type="checkbox" name="event-offer-${offer.title.toLowerCase()}-${this._id}" ${checked}>
          <label class="event__offer-label" for="${offer.title.toLowerCase()}-${this._id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );
    }).join(``);
  }

  getTemplate() {
    return `
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${this.getEventTypeItem(eventTypes)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${this._id}">
            ${this._type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${this._id}" type="text" name="event-destination" value="Geneva" list="destination-list-${this._id}">
          <datalist id="destination-list-${this._id}">
            ${this.getDestinationsOptionTemplate()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${this._id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${this._id}" type="text" name="event-start-time" value="${dayjs(this._startEventTime).format(`DD/MM/YY HH:mm`)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${this._id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${this._id}" type="text" name="event-end-time" value="${dayjs(this._endEventTime).format(`DD/MM/YY HH:mm`)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${this._id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${this._id}" type="text" name="event-price" value="${this._price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
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

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${this.getPhotoTemplate()}
            </div>
          </div>
        </section>
      </section>
    </form>
  `;
  }

  _formCloseHandler(evt) {
    evt.preventDefault();
    this._callback.formClose();
  }

  setFormCloseHandler(callback) {
    this._callback.formClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formCloseHandler);
  }


  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(NewEvent.parseDataToEvent(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  reset(event) {
    this.updateData(NewEvent.parseEventToData(event));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
  }

  _setInnerHandlers() {
    this.getElement()
    .querySelector(`.event__type-group`)
    .addEventListener(`click`, this._eventTypeToggleHandler);
    this.getElement()
    .querySelector(`.event__input--destination`)
    .addEventListener(`change`, this._destinationChangeHandler);
    this.getElement()
    .querySelector(`.event__input--price`)
    .addEventListener(`change`, this._priceChangeHandler);

    if (this._data.isOffers) {
      this.getElement()
    .querySelector(`.event__available-offers`)
    .addEventListener(`click`, this._offerChangeHandler);
    }
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });

  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      city: evt.target.value
    });
  }

  _offerChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      offers: this._data.offers
    }, true);
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    if (this._data.startEventTime) {
      this._datepicker = flatpickr(
          this.getElement().querySelector(`input[name='event-start-time']`),
          {
            dateFormat: `d/m/y H:i`,
            defaultDate: this._data.startEventTime,
            onChange: this._startTimeChangeHandler
          }
      );
    }

    if (this._data.endEventTime) {
      this._datepicker = flatpickr(
          this.getElement().querySelector(`input[name='event-end-time']`),
          {
            dateFormat: `d/m/y H:i`,
            defaultDate: this._data.endEventTime,
            onChange: this._endTimeChangeHandler
          }
      );
    }
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          isOffers: event.offers !== null
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign(
        {},
        data
    );
    delete data.isOffers;

    return data;
  }
}
