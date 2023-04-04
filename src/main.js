import createUserProfile from '@view/profile.js';
import createFilters from '@view/filters.js';
import createFilmList from '@view/film-list.js';
import createMoreButton from '@view/more-button.js';
import createFilmCard from '@view/film-card.js';
import createFilmCounter from '@view/film-counter.js';
import createMainNavigation from '@view/navigation.js';
// import createFilmDetails from '@view/film-details.js';

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const films = (count) => new Array(count).fill('1');

const render = (container, content, place, arr) => {
  if (arr === undefined) {
    return container.insertAdjacentHTML(place, content);
  }

  return arr.forEach((el) => container.insertAdjacentHTML(place, content) && el);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('footer');
const footerStatisticsElement = footerElement.querySelector('.footer__statistics');

render(headerElement, createUserProfile(), 'beforeend');
render(mainElement, createMainNavigation(), 'beforeend');
render(mainElement, createFilters(), 'beforeend');
render(mainElement, createFilmList(), 'beforeend');
render(footerStatisticsElement, createFilmCounter(), 'beforeend');
// render(footerElement, createFilmDetails(), `afterend`);

const filmMainElement = mainElement.querySelector('.js-film-list-main');
const filmRatedElement = mainElement.querySelector('.js-film-list-rated');
const filmCommentedElement = mainElement.querySelector('.js-film-list-commented');

render(filmMainElement, createFilmCard(), 'beforeend', films(FILMS_COUNT));

render(filmMainElement, createMoreButton(), 'afterend');

render(filmRatedElement, createFilmCard(), 'beforeend', films(EXTRA_FILMS_COUNT));
render(filmCommentedElement, createFilmCard(), 'beforeend', films(EXTRA_FILMS_COUNT));
