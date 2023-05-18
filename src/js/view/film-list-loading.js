import Abstract from '@view/abstract.js';

const createFilmListLoading = () => (
  `<section class="films-list">
    <h2 class="films-list__title">Loading...</h2>
  </section>`
);

export default class FilmListLoading extends Abstract {
  #createFilmListLoading = createFilmListLoading();

  getTemplate() {
    return this.#createFilmListLoading;
  }
}
