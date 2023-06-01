import UserRankView from '@view/profile.js';
import SortView from '@view/sort.js';

import FilmListView from '@view/film-list.js';
import FilmListRatedView from '@view/film-list-rated.js';
import FilmListCommentedView from '@view/film-list-commented.js';
import FilmListEmptyVeiw from '@view/film-list-empty.js';
import FilmListLoadingVeiw from '@view/film-list-loading.js';
import MoreButtonView from '@view/more-button.js';

import FilmCounterView from '@view/film-counter.js';

import FilmPresenter from '@presenter/film.js';

import filter from '@utils/filters.js';
import {
  FILMS_COUNT_PER_STEP, EXTRA_FILMS_COUNT,
  SortType, FilterType, UpdateType, UserAction, FilmState, Mode,
} from '@utils/const.js';
import { render, RenderPosition, remove } from '@utils/render.js';
import { sortByDate, sortByRating, sortByComments } from '@utils/sort.js';

export default class Board {
  #filmListView = new FilmListView();

  #filmListRatedView = new FilmListRatedView();

  #filmListCommentedView = new FilmListCommentedView();

  #filmListEmptyView = new FilmListEmptyVeiw();

  #filmListLoadingVeiw = new FilmListLoadingVeiw();

  #moreButtonView = new MoreButtonView();

  #userRankView = null;

  #sortView = null;

  #filmCounterView = null;

  #headerElement = null;

  #mainElement = null;

  #footerElement = null;

  #isLoading = true;

  #mode = Mode.CLOSE;

  #filmsModel = null;

  #filtersModel = null;

  #filmPresenter = new Map();

  #filmPresenterRated = new Map();

  #filmPresenterCommented = new Map();

  #currentSortType = SortType.DEFAULT;

  #renderFilmsCount = FILMS_COUNT_PER_STEP;

  constructor(container, filtersModel, filmsModel) {
    this.#headerElement = container.header;
    this.#mainElement = container.main;
    this.#footerElement = container.footer;

    this.#filmsModel = filmsModel;
    this.#filtersModel = filtersModel;
  }

  init() {
    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);

    this.#renderBoard();
  }

  destroy() {
    this.#clearBoard({ resetRenderFilmsCount: true, resetSortType: true, resetFilmsExtra: true });

    remove(this.#filmListView);

    this.#filmsModel.removeObserver(this.#handleModelEvent);
    this.#filtersModel.removeObserver(this.#handleModelEvent);
  }

  #getFilms() {
    const filterType = this.#filtersModel.filter ?? FilterType.ALL;
    const { films } = this.#filmsModel;
    const filtredFilms = filter[filterType](films);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filtredFilms;
      case SortType.DATE:
        return filtredFilms.sort(sortByDate);
      case SortType.RATING:
        return filtredFilms.sort(sortByRating);
      default:
        throw new Error('Sort type undefined');
    }
  }

  #renderBoard({ renderFilmsExtra = true } = {}) {
    if (this.#isLoading) {
      this.#renderListLoading();
      return;
    }

    const films = this.#getFilms();
    const filmsCount = films.length;
    const filmsOrigin = this.#filmsModel.films;

    this.#renderUserRank(filmsOrigin);
    this.#renderFilmsCounter(filmsOrigin.length);

    if (!filmsCount) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderList();
    this.#renderFilms(films.slice(0, Math.min(filmsCount, this.#renderFilmsCount)));

    if (filmsCount > this.#renderFilmsCount) {
      this.#renderMoreButton();
      this.#renderListExtra();

      if (renderFilmsExtra) {
        this.#renderFilmsExtra(films);
      }
    }
  }

  #clearBoard(
    { resetRenderFilmsCount = false, resetSortType = false, resetFilmsExtra = false } = {},
  ) {
    if (this.#isLoading) {
      return;
    }

    const filmsCount = this.#getFilms().length;

    this.#filmPresenter.forEach((film) => film.destroy());
    this.#filmPresenter.clear();

    if (this.#userRankView) remove(this.#userRankView);
    if (this.#sortView) remove(this.#sortView);
    if (this.#filmListLoadingVeiw) remove(this.#filmListLoadingVeiw);
    if (this.#filmListEmptyView) remove(this.#filmListEmptyView);
    if (this.#moreButtonView) remove(this.#moreButtonView);
    if (this.#filmCounterView) remove(this.#filmCounterView);

    if (resetFilmsExtra) {
      this.#filmPresenterRated.forEach((film) => film.destroy());
      this.#filmPresenterRated.clear();
      this.#filmPresenterCommented.forEach((film) => film.destroy());
      this.#filmPresenterCommented.clear();

      remove(this.#filmListRatedView);
      remove(this.#filmListCommentedView);
    }

    if (resetRenderFilmsCount) {
      this.#renderFilmsCount = FILMS_COUNT_PER_STEP;
    } else {
      this.#renderFilmsCount = Math.min(filmsCount, this.#renderFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderUserRank(films) {
    this.#userRankView = new UserRankView(films);

    render(this.#headerElement, this.#userRankView, RenderPosition.BEFOREEND);
  }

  #renderSort() {
    if (this.#sortView) {
      this.#sortView = null;
    }

    this.#sortView = new SortView(this.#currentSortType);
    this.#sortView.changeSortHandler = this.#handleSortChange;

    render(this.#mainElement, this.#sortView, RenderPosition.BEFOREEND);
  }

  #renderList() {
    render(this.#mainElement, this.#filmListView, RenderPosition.BEFOREEND);
  }

  #renderListExtra() {
    render(this.#filmListView, this.#filmListRatedView, RenderPosition.BEFOREEND);
    render(this.#filmListView, this.#filmListCommentedView, RenderPosition.BEFOREEND);
  }

  #renderListEmpty() {
    render(this.#mainElement, this.#filmListEmptyView, RenderPosition.BEFOREEND);
  }

  #renderListLoading() {
    render(this.#mainElement, this.#filmListLoadingVeiw, RenderPosition.BEFOREEND);
  }

  #renderFilm(container, film, presenter) {
    const filmPresenter = new FilmPresenter(this.#handleViewAction, this.#handleModeChange);
    filmPresenter.init(container, film);

    presenter.set(film.id, filmPresenter);
  }

  #renderFilms(films) {
    const filmMainElement = this.#filmListView.getElement().querySelector('.js-film-list-main');

    films.forEach((film) => this.#renderFilm(filmMainElement, film, this.#filmPresenter));
  }

  #renderFilmsExtra(films) {
    const filmRatedElement = this.#filmListRatedView.getElement().querySelector('.js-film-list-rated');
    const filmCommentedElement = this.#filmListCommentedView.getElement().querySelector('.js-film-list-commented');

    const mostRated = films.slice().sort(sortByRating).slice(0, EXTRA_FILMS_COUNT);
    const mostCommented = films.slice().sort(sortByComments).slice(0, EXTRA_FILMS_COUNT);

    mostRated.forEach(
      (film) => this.#renderFilm(filmRatedElement, film, this.#filmPresenterRated),
    );
    mostCommented.forEach(
      (film) => this.#renderFilm(filmCommentedElement, film, this.#filmPresenterCommented),
    );
  }

  #renderMoreButton() {
    const filmList = document.querySelector('.films-list');

    render(filmList, this.#moreButtonView, RenderPosition.BEFOREEND);
    this.#moreButtonView.setClickHandler(this.#handleMoreButtonClick);
  }

  #renderFilmsCounter(count) {
    this.#filmCounterView = new FilmCounterView(count);

    render(this.#footerElement, this.#filmCounterView, RenderPosition.BEFOREEND);
  }

  #handleMoreButtonClick = () => {
    const filmsCount = this.#getFilms().length;
    const newRenderFilmsCount = Math.min(filmsCount, this.#renderFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this.#getFilms().slice(this.#renderFilmsCount, newRenderFilmsCount);

    this.#renderFilms(films);
    this.#renderFilmsCount = newRenderFilmsCount;

    if (this.#renderFilmsCount >= filmsCount) {
      remove(this.#moreButtonView);
    }
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({ resetRenderFilmsCount: true });
    this.#renderBoard({ renderFilmsExtra: false });
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.OPEN_POPUP:
        this.#mode = Mode.OPEN;
        this.#filmsModel.getComments(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#filmPresenter.get(update.id)
          ?.setViewState(FilmState.SAVING);
        this.#filmPresenterRated.get(update.id)
          ?.setViewState(FilmState.SAVING);
        this.#filmPresenterCommented.get(update.id)
          ?.setViewState(FilmState.SAVING);

        this.#filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmPresenter.get(update.film.id)
          ?.setViewState(FilmState.DELETING, update.delete);
        this.#filmPresenterRated.get(update.film.id)
          ?.setViewState(FilmState.DELETING, update.delete);
        this.#filmPresenterCommented.get(update.film.id)
          ?.setViewState(FilmState.DELETING, update.delete);

        this.#filmsModel.deleteComment(updateType, update);
        break;
      default:
        throw new Error('User action undefined');
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#filmListLoadingVeiw);
        this.#renderBoard();
        break;
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.film.id)?.update(data);
        this.#filmPresenterRated.get(data.film.id)?.update(data);
        this.#filmPresenterCommented.get(data.film.id)?.update(data);
        break;
      case UpdateType.MINOR:
        if (this.#mode === Mode.OPEN) {
          this.#handleModelEvent(UpdateType.PATCH, data);
          return;
        }

        this.#clearBoard({ resetFilmsExtra: true });
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({
          resetSortType: true,
          resetFilmsExtra: true,
          resetRenderFilmsCount: true,
        });
        this.#renderBoard();
        break;
      case UpdateType.REJECT:
        this.#filmPresenter.get(data.id)?.setViewState(FilmState.ABORTING);
        this.#filmPresenterRated.get(data.id)?.setViewState(FilmState.ABORTING);
        this.#filmPresenterCommented.get(data.id)?.setViewState(FilmState.ABORTING);
        break;
      default:
        throw new Error('Model event undefined');
    }
  };

  #handleModeChange = (mode) => {
    this.#mode = mode ?? this.#mode;
    return this.#mode;
  };
}
