export const FILMS_COUNT = 22;
export const EXTRA_FILMS_COUNT = 2;
export const FILMS_COUNT_PER_STEP = 5;

export const EMOTIONS = ['angry', 'puke', 'sleeping', 'smile'];

export const Mode = {
  OPEN: 'open',
  CLOSE: 'close',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
  FAVORITES: 'favorites',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const UserAction = {
  UPDATE_FILM: 'update_film',
  ADD_COMMENT: 'add_comment',
  DELETE_COMMENT: 'delete_comment',
};

export const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};
