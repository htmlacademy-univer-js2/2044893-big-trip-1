import AbstractView from '../view/site-abstract-class-view.js';
import { SortType } from '../utils/utils.js'
const createTripsSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
              <div class="trip-sort__item  trip-sort__item--day">
                <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${SortType.SORT_DAY}">
                <label class="trip-sort__btn" for="sort-day">Day</label>
              </div>
              <div class="trip-sort__item  trip-sort__item--event">
                <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
                <label class="trip-sort__btn" for="sort-event">Event</label>
              </div>
              <div class="trip-sort__item  trip-sort__item--time">
                <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time"  data-sort-type="${SortType.SORT_TIME}">
                <label class="trip-sort__btn" for="sort-time">Time</label>
              </div>
              <div class="trip-sort__item  trip-sort__item--price">
                <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SortType.SORT_PRICE}">
                <label class="trip-sort__btn" for="sort-price">Price</label>
              </div>
              <div class="trip-sort__item  trip-sort__item--offer">
                <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
                <label class="trip-sort__btn" for="sort-offer">Offers</label>
              </div>
            </form>`
);
export default class TripSortTemplate extends AbstractView {
  get template() {
    return createTripsSortTemplate();
  }

  SortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('change', this.#sortTypeChange);
  }

  #sortTypeChange = (evt) => {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}