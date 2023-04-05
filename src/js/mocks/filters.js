const filmsToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isInWatchlist).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length,
};

const getCountByFilmsState = (films) => Object.entries(filmsToFilterMap)
  .map(([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }));

export default getCountByFilmsState;
