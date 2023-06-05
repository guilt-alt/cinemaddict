import dayjs from 'dayjs';

export const SHOW_TIME = 5000;
export const SHAKE_TIMEOUT = 600;

export const BAR_HEIGHT = 50;
export const DEBOUNCE_TIMEOUT = 500;

export const EXTRA_FILMS_COUNT = 2;
export const FILMS_COUNT_PER_STEP = 5;

export const AUTHORIZATION = 'Basic VkeZ31OVLyQdG9Bk';
export const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

export const STORE_PREFIX = 'cinemaddict-localstorage';
export const STORE_VER = 'v1';
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export const EMOTIONS = ['angry', 'puke', 'sleeping', 'smile'];

export const Mode = {
  OPEN: 'open',
  CLOSE: 'close',
};

export const FilmState = {
  SAVING: 'saving',
  DELETING: 'deleting',
  ABORTING: 'aborting',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
  FAVORITES: 'favorites',
};

export const SortType = {
  DATE: 'date',
  RATING: 'rating',
  DEFAULT: 'default',
};

export const UserAction = {
  OPEN_POPUP: 'open_popup',
  UPDATE_FILM: 'update_film',
  ADD_COMMENT: 'add_comment',
  DELETE_COMMENT: 'delete_comment',
};

export const UpdateType = {
  INIT: 'init',
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  REJECT: 'reject',
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
  FAN: 'Fan',
  NOVICE: 'Novice',
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
