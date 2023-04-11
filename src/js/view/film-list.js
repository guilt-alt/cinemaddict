import Abstract from '@view/abstract.js';

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

export default class FilmListView extends Abstract {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  getTemplate() {
    return createFilmList(this.#data);
  }

  setClickHandler(callback) {
    if (this.#data) {
      this._callback.click = callback;
      this.getElement().addEventListener('click', this.#clickHandler);
    }
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  }
}
