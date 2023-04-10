import { createElement } from '@utils/render.js';

const createFilmList = (data) => {
  const noData = '<h2 class="films-list__title">There are no movies in our database</h2>';
  const lists = `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container js-film-list-main"></div>
  </section>
  <section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container js-film-list-rated">
    </div>
  </section>
  <section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container js-film-list-commented">
    </div>
  </section>`;

  return `<section class="films">${data ? lists : noData}</section >`;
};

export default class FilmListView {
  #data = null;

  #element = null;

  constructor(data) {
    this.#data = data;
  }

  getTemplate() {
    return createFilmList(this.#data);
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
