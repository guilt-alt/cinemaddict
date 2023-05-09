import Observer from '@utils/observer.js';

export default class Films extends Observer {
  #films = [];

  get films() {
    return this.#films;
  }

  set films(films) {
    this.#films = films.slice();
  }

  updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this.notify(updateType, update);
  }
}
