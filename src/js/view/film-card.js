import Abstract from '@view/abstract.js';

const createFilmCard = ({
  filmDetails, userDetails, id, comments,
}) => {
  const {
    poster, title, rating, year, duration, genres, description,
  } = filmDetails;

  const { isWatchlist, isWatched, isFavorite } = userDetails;

  const descriptionShort = description.length > 140 ? `${description.slice(0, 139)}...` : description;

  return `<article class="film-card" data-id="${id}">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="/cinemaddict/assets/images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionShort}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item ${isWatchlist ? 'film-card__controls-item--active' : ''} button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item ${isWatched ? 'film-card__controls-item--active' : ''} button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item ${isFavorite ? 'film-card__controls-item--active' : ''} button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCardView extends Abstract {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  getTemplate() {
    return createFilmCard(this.#data);
  }

  set clickWatchlistHandler(callback) {
    this.callback.watchlist = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#clickWatchlistHandler);
  }

  set clickWatchedHandler(callback) {
    this.callback.watched = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#clickWatchedHandler);
  }

  set clickFavoriteHandler(callback) {
    this.callback.favorite = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#clickFavoriteHandler);
  }

  set openDetailsHandler(callback) {
    this.callback.details = callback;
    this.getElement().addEventListener('click', this.#openDetailsHandler);
  }

  #clickWatchlistHandler = (evt) => {
    evt.preventDefault();
    this.callback.watchlist(evt);
  };

  #clickWatchedHandler = (evt) => {
    evt.preventDefault();
    this.callback.watched(evt);
  };

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.callback.favorite(evt);
  };

  #openDetailsHandler = (evt) => {
    if (evt.target.matches('.film-card__title, .film-card__poster, .film-card__comments')) {
      evt.preventDefault();
      this.callback.details();
    }
  };
}
