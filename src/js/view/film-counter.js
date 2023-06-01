import Abstract from '@view/abstract.js';

const createFilmCounter = (count) => `<p>${count} movies inside</p>`;

export default class FilmCounter extends Abstract {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  getTemplate() {
    return createFilmCounter(this.#data);
  }
}
