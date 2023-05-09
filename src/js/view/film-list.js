import Abstract from '@view/abstract.js';

const createFilmList = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container js-film-list-main"></div>
    </section>
  </section>`
);

export default class FilmListView extends Abstract {
  #createFilmList = createFilmList();

  getTemplate() {
    return this.#createFilmList;
  }
}
