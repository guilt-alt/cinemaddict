import { createElement } from '@utils/render.js';

const createFilmList = () => `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container js-film-list-main">
    </div>
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
  </section>
</section>`;

export default class FilmListView {
  #element = null;

  constructor() {
    this.createFilmList = createFilmList();
  }

  getTemplate() {
    return this.createFilmList;
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
