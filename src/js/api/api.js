import FilmsModel from '@model/films.js';
import { Method, SuccessStatusRange } from '@utils/const.js';

export default class Api {
  #endPoint = null;

  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  async getFilms() {
    const response = await this.#load({ url: 'movies' });
    const films = await Api.toJSON(response);

    return films.map(FilmsModel.adaptFilmToClient);
  }

  async updateFilm(film) {
    const response = await this.#load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptFilmToServer(film)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    const updatedFilm = await Api.toJSON(response);

    return FilmsModel.adaptFilmToClient(updatedFilm);
  }

  async getComments(id) {
    const response = await this.#load({ url: `comments/${id}` });
    const comments = await Api.toJSON(response);

    return comments.map(FilmsModel.adaptCommentToClient);
  }

  async addComment(comment) {
    const response = await this.#load({
      url: `comments/${comment.id}`,
      method: Method.POST,
      body: JSON.stringify(FilmsModel.adaptCommentToServer(comment)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    const newComment = await Api.toJSON(response);

    return {
      film: FilmsModel.adaptFilmToClient(newComment.movie),
      comments: newComment.comments.map((FilmsModel.adaptCommentToClient)),
    };
  }

  async deleteComment(id) {
    await this.#load({
      url: `comments/${id}`,
      method: Method.DELETE,
    });
  }

  async sync(data) {
    const response = await this.#load({
      url: 'movies/sync',
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return Api.toJSON(response);
  }

  async #load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this.#authorization);

    try {
      const response = await fetch(`${this.#endPoint}/${url}`, { method, body, headers });

      return Api.checkStatus(response);
    } catch (err) {
      return Api.catchError(err);
    }
  }

  static checkStatus(response) {
    if (
      response.status < SuccessStatusRange.MIN
      || response.status > SuccessStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
