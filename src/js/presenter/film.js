import FilmCardView from '@view/film-card.js';
import DetailsView from '@view/film-details.js';

import {
  UserAction, UpdateType, Mode, FilmState,
} from '@utils/const.js';
import {
  render, RenderPosition, replace, remove,
} from '@utils/render.js';

export default class Film {
  #film = null;

  #comments = [];

  #container = null;

  #filmComponent = null;

  #detailsComponent = null;

  #changeData = null;

  #changeMode = null;

  #mode = Mode.CLOSE;

  #scroll = 0;

  constructor(changeData, changeMode) {
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(container, film) {
    this.#film = film;
    this.#container = container;

    this.#renderFilm();
  }

  update(data) {
    this.#film = data.film;
    this.#comments = data.comments ?? this.#comments;

    this.#updateFilm();
    this.#updateDetails();
  }

  setViewState(state, id) {
    const resetState = () => {
      this.#detailsComponent.updateData({
        isSaving: false,
        isDeleting: false,
      }, false, true);
    };

    switch (state) {
      case FilmState.SAVING:
        this.#detailsComponent.updateData(
          { isSaving: true },
          false,
          true,
        );
        break;
      case FilmState.DELETING:
        this.#detailsComponent.updateData(
          { isDeleting: id },
          false,
          true,
        );
        break;
      case FilmState.ABORTING:
        this.#filmComponent?.shake();
        this.#detailsComponent?.shake(resetState);
        break;
      default:
        throw new Error('State is undefined');
    }
  }

  #renderFilm() {
    this.#filmComponent = new FilmCardView(this.#film);
    this.#setFilmHandlers();

    render(this.#container, this.#filmComponent, RenderPosition.BEFOREEND);
  }

  #renderDetails() {
    this.#detailsComponent = new DetailsView(this.#film, this.#comments);
    this.#setDetailsHandlers();

    render(document.body, this.#detailsComponent, RenderPosition.BEFOREEND);
  }

  #updateFilm() {
    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView(this.#film);
    this.#setFilmHandlers();

    replace(this.#filmComponent, prevFilmComponent);
    remove(prevFilmComponent);
  }

  #updateDetails() {
    if (!this.#detailsComponent) {
      return;
    }

    const prevDetailsComponent = this.#detailsComponent;
    prevDetailsComponent.removeDocumentHandlers();

    this.#detailsComponent = new DetailsView(this.#film, this.#comments);
    this.#setDetailsHandlers();

    replace(this.#detailsComponent, prevDetailsComponent);
    this.#detailsComponent.setScrollPosition(this.#scroll);
    remove(prevDetailsComponent);
  }

  #removeDetailsComponent() {
    this.#detailsComponent.removeDocumentHandlers();
    remove(this.#detailsComponent);
    this.#detailsComponent = null;
  }

  #setFilmHandlers() {
    this.#filmComponent.clickWatchlistHandler = this.#handleWatchlistClick;
    this.#filmComponent.clickWatchedHandler = this.#handleWatchedClick;
    this.#filmComponent.clickFavoriteHandler = this.#handleFavotiteClick;
    this.#filmComponent.openDetailsHandler = this.#handleDetailsOpen;
  }

  #setDetailsHandlers() {
    this.#detailsComponent.scrollPositionHandler = this.#handlePositionScroll;
    this.#detailsComponent.clickWatchlistHandler = this.#handleWatchlistClick;
    this.#detailsComponent.clickWatchedHandler = this.#handleWatchedClick;
    this.#detailsComponent.clickFavoriteHandler = this.#handleFavotiteClick;
    this.#detailsComponent.closeDetailsHandler = this.#handleDetailsClose;
    this.#detailsComponent.addCommentHandler = this.#handleCommentAdd;
    this.#detailsComponent.deleteCommentHandler = this.#handleCommentDelete;
  }

  #handlePositionScroll = (scroll) => {
    this.#scroll = scroll;
  };

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

  #handleCommentAdd = (comment) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      comment,
    );
  };

  #handleCommentDelete = (data) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {
        film: {
          ...this.#film,
          comments: this.#film.comments.filter((id) => id !== data.delete),
        },
        comments: data.comments,
        delete: data.delete,
      },
    );
  };

  #handleDetailsOpen = () => {
    if (this.#changeMode() === Mode.OPEN) {
      return;
    }

    this.#mode = Mode.OPEN;
    this.#renderDetails();
    this.#changeData(
      UserAction.OPEN_POPUP,
      UpdateType.PATCH,
      {
        ...this.#film,
      },
    );

    document.body.classList.add('hide-overflow');
  };

  #handleDetailsClose = () => {
    this.#scroll = 0;
    this.#mode = Mode.CLOSE;
    this.#changeMode(this.#mode);
    this.#removeDetailsComponent();

    document.body.classList.remove('hide-overflow');
  };

  destroy() {
    remove(this.#filmComponent);
  }
}
