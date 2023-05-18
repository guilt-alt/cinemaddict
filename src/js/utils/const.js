import dayjs from 'dayjs';

export const BAR_HEIGHT = 50;
export const DEBOUNCE_TIMEOUT = 500;

export const EXTRA_FILMS_COUNT = 2;
export const FILMS_COUNT_PER_STEP = 5;

export const AUTHORIZATION = 'Basic VkeZ31OVLyQdG9Bk';
export const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

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
  INIT: 'init',
};

export const MenuItem = {
  FILMS: 'films',
  STATS: 'stats',
};

export const RankScore = {
  NOVICE: {
    MIN: 1,
    MAX: 10,
  },
  FAN: {
    MIN: 11,
    MAX: 20,
  },
};

export const RankTitle = {
  NONE: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

export const StatsFilterType = {
  ALL: 'all',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const DateType = {
  DAY: 'day',
  WEEK: dayjs().subtract(7, 'day').toDate(),
  MONTH: dayjs().subtract(1, 'month').toDate(),
  YEAR: dayjs().subtract(1, 'year').toDate(),
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const SuccessStatusRange = {
  MIN: 200,
  MAX: 299,
};
