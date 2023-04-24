import NavigationView from '@view/navigation.js';
import SortView from '@view/sort.js';

import FilmListView from '@view/film-list.js';
import FilmListEmptyVeiw from '@view/film-list-empty.js';
import MoreButtonView from '@view/more-button.js';

import FilmPresenter from '@presenter/film.js';

import { updateItem } from '@utils/utils.js';
import getCountByFilmsState from '@utils/filters.js';
import { FILMS_COUNT_PER_STEP, EXTRA_FILMS_COUNT, SortType } from '@utils/const.js';
import { render, RenderPosition, remove } from '@utils/render.js';

import { sortByDate, sortByRating, sortByComments } from '@utils/sort.js';

export default class Main {
  #currentSortType = SortType.DEFAULT;

  #sortView = new SortView();

  #filmListView = new FilmListView();

  #filmListEmptyView = new FilmListEmptyVeiw();

  #moreButtonView = new MoreButtonView();

  #films = [];

  #sourcedFilms = [];

  #mode = null;

  #filmPresenter = new Map();

  #renderFilmsCount = FILMS_COUNT_PER_STEP;

  #mainElement = document.querySelector('main');

  #filmMainElement = this.#filmListView.getElement().querySelector('.js-film-list-main');

  #filmRatedElement = this.#filmListView.getElement().querySelector('.js-film-list-rated');

  #filmCommentedElement = this.#filmListView.getElement().querySelector('.js-film-list-commented');

  constructor(data) {
    this.#films = data.slice();
    this.#sourcedFilms = data.slice();
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#renderNavigation();

    if (!this.#films) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderList();
    this.#renderFilms();
    this.#renderExtraFilms();
    this.#renderMoreButton();
  }

  #renderNavigation() {
    const countByFilmsState = getCountByFilmsState(this.#films);

    render(this.#mainElement, new NavigationView(countByFilmsState), RenderPosition.BEFOREEND);
  }

  #renderSort() {
    render(this.#mainElement, this.#sortView, RenderPosition.BEFOREEND);
    this.#sortView.changeSortHandler = this.#handleSortChange;
  }

  #sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortByRating);
        break;
      default:
        this.#films = this.#sourcedFilms;
        break;
    }

    this.#currentSortType = sortType;
  }

  #renderList() {
    render(this.#mainElement, this.#filmListView, RenderPosition.BEFOREEND);
  }

  #renderListEmpty() {
    render(this.#mainElement, this.#filmListEmptyView, RenderPosition.BEFOREEND);
  }

  #renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(container, film);

    if (this.#filmPresenter.has(film.id)) {
      this.#filmPresenter.get(film.id).push(filmPresenter);
      return;
    }
    this.#filmPresenter.set(film.id, [filmPresenter]);
  }

  #renderFilms(from = 0, to = Math.min(this.#films.length, FILMS_COUNT_PER_STEP)) {
    this.#films.slice(from, to)
      .forEach((film) => this.#renderFilm(this.#filmMainElement, film));
  }

  #renderExtraFilms(from = 0, to = Math.min(this.#films.length, EXTRA_FILMS_COUNT)) {
    const mostRated = this.#films.slice().sort(sortByRating);
    const mostCommented = this.#films.slice().sort(sortByComments);

    mostRated.slice(from, to)
      .forEach((film) => this.#renderFilm(this.#filmRatedElement, film));
    mostCommented.slice(from, to)
      .forEach((film) => this.#renderFilm(this.#filmCommentedElement, film));
  }

  #destroyFilms() {
    this.#filmPresenter.forEach((value) => value.forEach((film) => film.destroy()));
    this.#filmPresenter.clear();
    this.#renderFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this.#moreButtonView);
  }

  #renderMoreButton() {
    const filmList = this.#filmListView.getElement().querySelector('.films-list');

    render(filmList, this.#moreButtonView, RenderPosition.BEFOREEND);
    this.#moreButtonView.setClickHandler(this.#handleMoreButtonClick);
  }

  #handleMoreButtonClick = () => {
    this.#renderFilms(this.#renderFilmsCount, this.#renderFilmsCount + FILMS_COUNT_PER_STEP);

    this.#renderFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderFilmsCount >= this.#films.length) {
      remove(this.#moreButtonView);
    }
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#destroyFilms();
    this.#renderFilms();
    this.#renderExtraFilms();
    this.#renderMoreButton();
  };

  #handleModeChange = (mode = this.#mode) => {
    this.#mode = mode;
    return this.#mode;
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).forEach((film) => film.update(updatedFilm));
  };
}
