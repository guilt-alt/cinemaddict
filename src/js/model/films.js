import Observer from '@utils/observer.js';
import { UpdateType } from '@utils/const.js';

export default class Films extends Observer {
  #api = null;

  #films = [];

  constructor(api) {
    super();
    this.#api = api;

    this.#setFilms();
  }

  get films() {
    return this.#films;
  }

  async #setFilms() {
    try {
      this.#films = await this.#api.getFilms();
      this.#films.slice();
      this.notify(UpdateType.INIT);
    } catch (err) {
      this.#films = [];
      this.notify(UpdateType.INIT);
    }
  }

  async updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    try {
      const film = await this.#api.updateFilm(update);

      this.#films = [
        ...this.#films.slice(0, index),
        film,
        ...this.#films.slice(index + 1),
      ];

      this.notify(updateType, update);
    } catch (err) {
      this.films = this.#films;
    }
  }

  static adaptToClient(film) {
    const adaptedFilm = {
      ...film,
      filmDetails: {
        ...film.film_info,
        rating: film.film_info.total_rating,
        ageRating: film.film_info.age_rating,
        originalTitle: film.film_info.alternative_title,
        release: film.film_info.release.date,
        country: film.film_info.release.release_country,
      },
      userDetails: {
        ...film.user_details,
        isWatchlist: film.user_details.watchlist,
        isWatched: film.user_details.already_watched,
        isFavorite: film.user_details.favorite,
        date: film.user_details.watching_date,
      },
    };

    delete adaptedFilm.film_info;
    delete adaptedFilm.filmDetails.total_rating;
    delete adaptedFilm.filmDetails.age_rating;
    delete adaptedFilm.filmDetails.alternative_title;

    delete adaptedFilm.user_details;
    delete adaptedFilm.userDetails.watchlist;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.favorite;
    delete adaptedFilm.userDetails.watching_date;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = {
      ...film,
      film_info: {
        ...film.filmDetails,
        total_rating: film.filmDetails.rating,
        age_rating: film.filmDetails.ageRating,
        alternative_title: film.filmDetails.originalTitle,
        release: {
          date: film.filmDetails.release,
          release_country: film.filmDetails.country,
        },
      },
      user_details: {
        ...film.userDetails,
        watchlist: film.userDetails.isWatchlist,
        already_watched: film.userDetails.isWatched,
        favorite: film.userDetails.isFavorite,
        watching_date: film.userDetails.date,
      },
    };

    delete adaptedFilm.filmDetails;
    delete adaptedFilm.film_info.rating;
    delete adaptedFilm.film_info.ageRating;
    delete adaptedFilm.film_info.originalTitle;
    delete adaptedFilm.film_info.country;

    delete adaptedFilm.userDetails;
    delete adaptedFilm.user_details.isWatchlist;
    delete adaptedFilm.user_details.isWatched;
    delete adaptedFilm.user_details.isFavorite;
    delete adaptedFilm.user_details.date;

    return adaptedFilm;
  }
}
