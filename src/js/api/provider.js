import FilmsModel from '@model/films.js';
import { isOnline } from '@utils/common.js';

const createStoreStructure = (items) => items
  .reduce((acc, current) => ({
    ...acc,
    ...{ [current.id]: current },
  }), {});

export default class Provider {
  #api = null;
  #store = null;

  constructor(api, store) {
    this.#api = api;
    this.#store = store;
  }

  async getFilms() {
    if (isOnline()) {
      const films = await this.#api.getFilms();

      const items = createStoreStructure(films.map(FilmsModel.adaptFilmToServer));
      this.#store.items = items;

      return films;
    }

    const storeFilms = Object.values(this.#store.items);

    return Promise.resolve(storeFilms.map(FilmsModel.adaptFilmToClient));
  }

  async getComments(id) {
    if (isOnline()) {
      return await this.#api.getComments(id);
    }

    return Promise.reject(new Error('Can\'t get comments offline'));
  }

  async updateFilm(film) {
    if (isOnline()) {
      const updatedFilm = await this.#api.updateFilm(film)
      this.#store.setItem(updatedFilm.id, FilmsModel.adaptFilmToServer(updatedFilm));

      return updatedFilm;
    }

    this.#store.setItem(film.id, FilmsModel.adaptFilmToServer({ ...film }));

    return Promise.resolve(film);
  }

  async addComment(comment) {
    if (isOnline()) {
      const newComment = await this.#api.addComment(comment);
      this.#store.setItem(newComment.id, FilmsModel.adaptCommentToServer(newComment));

      return newComment;
    }

    return Promise.reject(new Error('Add comment failed'));
  }

  async deleteComment(id) {
    if (isOnline()) {
      await this.#api.deleteComment(id);
      return this.#store.removeItem = id;
    }

    return Promise.reject(new Error('Delete comment failed'));
  }

  async sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this.#store.items);

      const syncedFilms = await this.#api.sync(storeFilms);

      const updatedFilms = createStoreStructure(syncedFilms.updated);

      this.#store.items = updatedFilms;

      return;
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
