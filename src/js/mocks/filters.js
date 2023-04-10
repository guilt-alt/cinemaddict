const filmsToFilterMap = {
  watchlist: (films) => films.filter(({ userDetails: { isWatchlist } }) => isWatchlist).length,
  history: (films) => films.filter(({ userDetails: { isWatched } }) => isWatched).length,
  favorites: (films) => films.filter(({ userDetails: { isFavorite } }) => isFavorite).length,
};

const getCountByFilmsState = (films) => Object.entries(filmsToFilterMap)
  .map(([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }));

export default getCountByFilmsState;
