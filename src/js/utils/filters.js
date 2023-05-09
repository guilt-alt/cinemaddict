import { FilterType } from '@utils/const.js';

export default {
  [FilterType.ALL]: (films) => films
    .filter((film) => film),
  [FilterType.WATCHLIST]: (films) => films
    .filter(({ userDetails: { isWatchlist } }) => isWatchlist),
  [FilterType.WATCHED]: (films) => films
    .filter(({ userDetails: { isWatched } }) => isWatched),
  [FilterType.FAVORITES]: (films) => films
    .filter(({ userDetails: { isFavorite } }) => isFavorite),
};
