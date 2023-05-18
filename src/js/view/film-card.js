import Abstract from '@view/abstract.js';
import { debounce } from '@utils/common.js';
import { getReleaseYear, getDuration, getShortDescription } from '@utils/stats.js';

const createFilmCard = ({ filmDetails, userDetails, comments }) => {
  const {
    poster, title, rating,
    release, duration, genre, description,
  } = filmDetails;
  const { isWatchlist, isWatched, isFavorite } = userDetails;

  const releaseYear = getReleaseYear(release);
  const humanizedDuration = getDuration(duration);
  const shortDescription = getShortDescription(description);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${humanizedDuration}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="/cinemaddict/assets/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item ${isWatchlist ? 'film-card__controls-item--active' : ''} button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item ${isWatched ? 'film-card__controls-item--active' : ''} button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item ${isFavorite ? 'film-card__controls-item--active' : ''} button film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
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
    const debouncedHandle = debounce(this.#clickWatchlistHandler);

    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', debouncedHandle);
  }

  set clickWatchedHandler(callback) {
    this.callback.watched = callback;
    const debouncedHandle = debounce(this.#clickWatchedHandler);

    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', debouncedHandle);
  }

  set clickFavoriteHandler(callback) {
    this.callback.favorite = callback;
    const debouncedHandle = debounce(this.#clickFavoriteHandler);

    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', debouncedHandle);
  }

  set openDetailsHandler(callback) {
    this.callback.details = callback;
    this.getElement().addEventListener('click', this.#openDetailsHandler);
  }

  #clickWatchlistHandler = () => {
    this.callback.watchlist();
  };

  #clickWatchedHandler = () => {
    this.callback.watched();
  };

  #clickFavoriteHandler = () => {
    this.callback.favorite();
  };

  #openDetailsHandler = (evt) => {
    if (!evt.target.matches('.film-card__title, .film-card__poster, .film-card__comments')) {
      return;
    }

    evt.preventDefault();
    this.callback.details();
  };
}
