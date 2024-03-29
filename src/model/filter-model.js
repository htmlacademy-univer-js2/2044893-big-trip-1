import AbstractObservable from '../utils/utils.js';
import { FilterType } from '../utils/utils.js';

export default class FilterModel extends AbstractObservable {
    #filter = FilterType.EVERYTHING;

    get filter() {
      return this.#filter;
    }

    setFilter = (updateType, filter) => {
      this.#filter = filter;
      this._notify(updateType, filter);
    }
}
