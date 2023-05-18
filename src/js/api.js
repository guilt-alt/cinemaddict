import FilmsModel from '@model/films.js';
import { Method, SuccessStatusRange } from '@utils/const.js';

export default class Api {
  #endPoint = null;

  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  getFilms() {
    return this.#load({ url: 'movies' })
      .then(Api.toJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    return this.#load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
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
