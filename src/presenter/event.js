import TripEventItemView from "../view/trip-event-item";
import EditEventView from "../view/edit-event";
import {render, RenderPosition, replace, remove} from "../utils/render";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Event {
  constructor(eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventItemComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventItemComponent = this._eventItemComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventItemComponent = new TripEventItemView(event);
    this._eventEditComponent = new EditEventView(event);

    this._eventItemComponent.setRollupBtnClickHandler(this._rollupBtnClickHandler);
    this._eventItemComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setFormCloseHandler(this._formCloseHandler);
    this._eventEditComponent.setFormSubmitHandler(this._formSubmitHandler);

    if ([prevEventEditComponent, prevEventItemComponent].includes(null)) {
      render(this._eventListContainer, this._eventItemComponent, RenderPosition.BEFOREEND);
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventItemComponent, prevEventItemComponent);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventItemComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventItemComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventItemComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventItemComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _rollupBtnClickHandler() {
    this._replaceCardToForm();
  }

  _formCloseHandler() {
    this._replaceFormToCard();
  }

  _formSubmitHandler(event) {
    this._changeData(event);
    this._replaceFormToCard();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }
}
