import FilmCardView from '@view/film-card.js';
import FilmDetailsView from '@view/film-details.js';

import { UserAction, UpdateType, Mode } from '@utils/const.js';
import {
  render, RenderPosition, replace, remove,
} from '@utils/render.js';

export default class Film {
  #film = null;

  #mode = Mode.CLOSE;

  #filmComponent = null;

  #filmDetails = null;

  #changeData = null;

  #changeMode = null;

  constructor(changeData, changeMode) {
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(container, film) {
    this.#film = film;

    this.#filmComponent = new FilmCardView(film);
    render(container, this.#filmComponent, RenderPosition.BEFOREEND);

    this.#setFilmHandlers();
  }

  update(film) {
    this.#film = film;

    this.#updateFilm(film);
    this.#updateFilmDetails(film);
  }

  #updateFilm(film) {
    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView(film);
    this.#setFilmHandlers();

    replace(this.#filmComponent, prevFilmComponent);
    remove(prevFilmComponent);
  }

  #renderFilmDetails() {
    this.#filmDetails = new FilmDetailsView(this.#film);
    render(document.body, this.#filmDetails, RenderPosition.BEFOREEND);
    this.#setFilmDetailsHandlers();
  }

  #removeFilmDetails() {
    this.#filmDetails.removeDocumentHandler();
    remove(this.#filmDetails);
    this.#filmDetails = null;
  }

  #updateFilmDetails(film) {
    const prevFilmDetails = this.#filmDetails;

    if (prevFilmDetails) {
      this.#mode = Mode.OPEN;

      this.#filmDetails = new FilmDetailsView(film);
      this.#setFilmDetailsHandlers();

      prevFilmDetails.removeDocumentHandler();
      replace(this.#filmDetails, prevFilmDetails);
      remove(prevFilmDetails);
    }
  }

  #setFilmHandlers() {
    this.#filmComponent.clickWatchlistHandler = this.#handleWatchlistClick;
    this.#filmComponent.clickWatchedHandler = this.#handleWatchedClick;
    this.#filmComponent.clickFavoriteHandler = this.#handleFavotiteClick;
    this.#filmComponent.openDetailsHandler = this.#handleDetailsOpen;
  }

  #setFilmDetailsHandlers() {
    this.#filmDetails.clickWatchlistHandler = this.#handleWatchlistClick;
    this.#filmDetails.clickWatchedHandler = this.#handleWatchedClick;
    this.#filmDetails.clickFavoriteHandler = this.#handleFavotiteClick;
    this.#filmDetails.closeDetailsHandler = this.#handleDetailsClose;
  }

  #handleWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          isWatchlist: !this.#film.userDetails.isWatchlist,
        },
      },
    );
  };

  #handleWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          isWatched: !this.#film.userDetails.isWatched,
        },
      },
    );
  };

  #handleFavotiteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          isFavorite: !this.#film.userDetails.isFavorite,
        },
      },
    );
  };

  #handleDetailsOpen = () => {
    if (this.#changeMode() === Mode.OPEN) {
      return;
    }

    this.#mode = Mode.OPEN;
    this.#renderFilmDetails();
    this.#changeMode(this.#mode);

    document.body.classList.add('hide-overflow');
  };

  #handleDetailsClose = () => {
    this.#mode = Mode.CLOSE;
    this.#removeFilmDetails();
    this.#changeMode(this.#mode);

    document.body.classList.remove('hide-overflow');
  };

  destroy() {
    remove(this.#filmComponent);
  }
}
