import Observer from '@utils/observer.js';
import { FilterType } from '@utils/const.js';

export default class FilterView extends Observer {
  #activeFilter = FilterType.ALL;

  get filter() {
    return this.#activeFilter;
  }

  setFilter(updateType, filter) {
    this.#activeFilter = filter;
    this.notify(updateType, filter);
  }
}
