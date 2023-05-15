import SortView from '@view/sort.js';

import FilmListView from '@view/film-list.js';
import FilmListRatedView from '@view/film-list-rated.js';
import FilmListCommentedView from '@view/film-list-commented.js';
import FilmListEmptyVeiw from '@view/film-list-empty.js';
import MoreButtonView from '@view/more-button.js';

import FilmPresenter from '@presenter/film.js';

import filter from '@utils/filters.js';
import {
  FILMS_COUNT_PER_STEP, EXTRA_FILMS_COUNT,
  SortType, FilterType, UpdateType, UserAction,
} from '@utils/const.js';
import { render, RenderPosition, remove } from '@utils/render.js';

import { sortByDate, sortByRating, sortByComments } from '@utils/sort.js';

export default class Board {
  #filmListView = new FilmListView();

  #filmListRatedView = new FilmListRatedView();

  #filmListCommentedView = new FilmListCommentedView();

  #filmListEmptyView = new FilmListEmptyVeiw();

  #moreButtonView = new MoreButtonView();

  #sortView = null;

  #mainElement = null;

  #mode = null;

  #filmsModel = null;

  #filtersModel = null;

  #filmPresenter = new Map();

  #filmPresenterRated = new Map();

  #filmPresenterCommented = new Map();

  #currentSortType = SortType.DEFAULT;

  #renderFilmsCount = FILMS_COUNT_PER_STEP;

  constructor(mainElement, filtersModel, filmsModel) {
    this.#mainElement = mainElement;
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
    const films = this.#getFilms();
    const filmsCount = films.length;

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
    const filmsCount = this.#getFilms().length;

    this.#filmPresenter.forEach((film) => film.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortView);
    remove(this.#filmListEmptyView);
    remove(this.#moreButtonView);

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

  #updatePatch(data) {
    this.#filmPresenter.get(data.id)?.update(data);
    this.#filmPresenterRated.get(data.id)?.update(data);
    this.#filmPresenterCommented.get(data.id)?.update(data);
  }

  #updateMinor(data) {
    if (this.#filtersModel.filter === FilterType.ALL) {
      this.#handleModelEvent(UpdateType.PATCH, data);
      return;
    }

    this.#clearBoard({ resetFilmsExtra: true });
    this.#renderBoard();
  }

  #updateMajor() {
    this.#clearBoard({ resetRenderFilmsCount: true, resetSortType: true, resetFilmsExtra: true });
    this.#renderBoard();
  }

  #renderMoreButton() {
    const filmList = document.querySelector('.films-list');

    render(filmList, this.#moreButtonView, RenderPosition.BEFOREEND);
    this.#moreButtonView.setClickHandler(this.#handleMoreButtonClick);
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
      case UserAction.ADD_COMMENT:
        this.#filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmsModel.deleteComment(updateType, update);
        break;
      default:
        throw new Error('User action undefined');
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#updatePatch(data);
        break;
      case UpdateType.MINOR:
        this.#updateMinor(data);
        break;
      case UpdateType.MAJOR:
        this.#updateMajor();
        break;
      default:
        throw new Error('Model event undefined');
    }
  };

  #handleModeChange = (mode = this.#mode) => {
    this.#mode = mode;
    return this.#mode;
  };
}
