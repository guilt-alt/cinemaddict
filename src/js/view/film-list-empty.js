import Abstract from '@view/abstract.js';

const createFilmListEmpty = () => `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
</section>`;

export default class FilmListEmpty extends Abstract {
  #createFilmListEmpty = createFilmListEmpty();

  getTemplate() {
    return this.#createFilmListEmpty;
  }
}
