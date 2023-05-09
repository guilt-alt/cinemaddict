import Observer from '@utils/observer.js';

export default class Films extends Observer {
  #comments = [];

  get comments() {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = comments;
  }
}
