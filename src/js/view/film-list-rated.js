import Abstract from '@view/abstract.js';

const createFilmListRated = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container js-film-list-rated"></div>
  </section>`
);

export default class FilmListRatedView extends Abstract {
  #createFilmListRated = createFilmListRated();

  getTemplate() {
    return this.#createFilmListRated;
  }
}
