import Abstract from '@view/abstract.js';

const createFilmListCommented = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container js-film-list-commented"></div>
  </section>`
);

export default class FilmListCommentedView extends Abstract {
  #createFilmListRated = createFilmListCommented();

  getTemplate() {
    return this.#createFilmListRated;
  }
}
