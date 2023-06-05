import he from 'he';
import Smart from '@view/smart.js';
import toast from '@utils/toast.js';
import { EMOTIONS } from '@utils/const.js';
import {
  onCtrlEnterKeyDown, onEscKeyDown, debounce, isOnline,
} from '@utils/common.js';
import {
  getHumanizedDate, getReleaseDate, getDuration, capitalize,
} from '@utils/stats.js';

const createComments = (comments, isDeleting) => comments.map(({
  id, emotion, text, author, date,
}) => (
  `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="/cinemaddict/assets/images/emoji/emoji-${emotion}.png"
         width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getHumanizedDate(date)}</span>
          <button class="film-details__comment-delete"
            data-id="${id}" type="button" ${isDeleting ? 'disabled' : ''}>
            ${isDeleting === id ? 'Deleting...' : 'Delete'}
          </button>
        </p>
      </div>
    </li>`
)).join('');

const createNewCommentForm = ({ emotion, comment }, isSaving) => {
  const selectedEmoji = emotion ? `<img width="55" height="55" alt="emoji-${emotion}"
          src="/cinemaddict/assets/images/emoji/emoji-${emotion}.png">` : '';

  const emojiList = EMOTIONS.map((emoji) => (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji"
      type="radio" id="emoji-${emoji}" value="${emoji}"
      ${emoji === emotion ? 'checked' : ''} ${isSaving ? 'disabled' : ''}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="/cinemaddict/assets/images/emoji/emoji-${emoji}.png" width="30" height="30" alt="${emoji}">
    </label>`
  )).join('');

  return (
    `<div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">${selectedEmoji}</div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input"
          placeholder="Select reaction below and write comment here"
          name="comment" ${isSaving ? 'disabled' : ''}
            >${comment ? he.encode(comment) : ''}</textarea>
      </label>
      <div class="film-details__emoji-list">
        ${emojiList}
      </div>
    </div>`
  );
};

const createGenres = (genres) => genres
  .map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

const createFilmDetails = (
  { filmDetails, userDetails, comments },
  commentsData,
  newComment,
  { isSaving, isDeleting },
) => {
  const {
    poster, title, originalTitle, rating, director, writers,
    actors, release, duration, country, genre, description, ageRating,
  } = filmDetails;

  const { isWatchlist, isWatched, isFavorite } = userDetails;

  const actorsLsit = actors.join(', ');
  const writersList = writers.join(', ');
  const releaseDate = getReleaseDate(release);
  const humanizedDuration = getDuration(duration);
  const descriptionCut = capitalize(description);
  const genresList = createGenres(genre);

  const commentsItems = createComments(commentsData, isDeleting);
  const commentForm = createNewCommentForm(newComment, isSaving);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="/cinemaddict/assets/${poster}" alt="">
                <p class="film-details__age">${ageRating}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writersList}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsLsit}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${humanizedDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${genresList}</td>
                </tr>
              </table>
              <p class="film-details__film-description">${descriptionCut}</p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" ${isWatchlist ? 'checked' : ''} class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" ${isWatched ? 'checked' : ''} class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" ${isFavorite ? 'checked' : ''} class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">
              ${comments.length}</span>
            </h3>
            <ul class="film-details__comments-list">
              ${commentsItems}
            </ul>
            ${commentForm}
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class DetailsView extends Smart {
  #scroll = 0;

  #film = null;

  #comments = [];

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;

    this.#setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetails(this.#film, this.#comments, this.newComment, this.state);
  }

  removeDocumentHandlers() {
    document.removeEventListener('keydown', this.#addCommentHandler);
    document.removeEventListener('keydown', this.#closeDetailsHandler);
  }

  restoreHandlers() {
    this.closeDetailsHandler = this.callback.close;
    this.scrollPositionHandler = this.callback.scroll;

    this.clickWatchlistHandler = this.callback.watchlist;
    this.clickFavoriteHandler = this.callback.favorite;
    this.clickWatchedHandler = this.callback.watched;

    this.addCommentHandler = this.callback.add;
    this.deleteCommentHandler = this.callback.delete;

    this.setScrollPosition();
    this.#setInnerHandlers();
  }

  setScrollPosition(scroll) {
    this.getElement().scrollTop = scroll ?? this.#scroll;
  }

  set closeDetailsHandler(callback) {
    this.callback.close = callback;

    document.addEventListener('keydown', this.#closeDetailsHandler);
    this.getElement().addEventListener('click', this.#closeDetailsHandler);
  }

  #closeDetailsHandler = (evt) => {
    if (onEscKeyDown(evt) || evt.target.matches('.film-details__close-btn')) {
      evt.preventDefault();
      this.callback.close();
    }
  };

  set scrollPositionHandler(callback) {
    this.callback.scroll = callback;
    this.getElement().addEventListener('scroll', this.#scrollPositionHandler, { passive: true });
  }

  #scrollPositionHandler = (evt) => {
    this.#scroll = evt.target.scrollTop;
    this.callback.scroll(evt.target.scrollTop);
  };

  set clickWatchlistHandler(callback) {
    this.callback.watchlist = callback;
    const debouncedHandle = debounce(this.#clickWatchlistHandler, true);

    this.getElement()
      .querySelector('.film-details__control-label--watchlist')
      .addEventListener('click', debouncedHandle);
  }

  #clickWatchlistHandler = (evt) => {
    evt.preventDefault();
    this.callback.watchlist();
  };

  set clickWatchedHandler(callback) {
    this.callback.watched = callback;
    const debouncedHandle = debounce(this.#clickWatchedHandler);

    this.getElement()
      .querySelector('.film-details__control-label--watched')
      .addEventListener('click', debouncedHandle);
  }

  #clickWatchedHandler = (evt) => {
    evt.preventDefault();
    this.callback.watched();
  };

  set clickFavoriteHandler(callback) {
    this.callback.favorite = callback;
    const debouncedHandle = debounce(this.#clickFavoriteHandler);

    this.getElement()
      .querySelector('.film-details__control-label--favorite')
      .addEventListener('click', debouncedHandle);
  }

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.callback.favorite();
  };

  set addCommentHandler(callback) {
    this.callback.add = callback;
    const debouncedHandle = debounce(this.#addCommentHandler);

    document.addEventListener('keydown', debouncedHandle);
  }

  #addCommentHandler = (evt) => {
    if (onCtrlEnterKeyDown(evt)) {
      if (!isOnline()) {
        toast('You can\'t send comment offline');
        return;
      }

      evt.preventDefault();

      if (!this.newComment.emotion || !this.newComment.comment) {
        return;
      }

      this.newComment.id = this.#film.id;

      this.callback.add(this.newComment);
    }
  };

  set deleteCommentHandler(callback) {
    this.callback.delete = callback;
    const debouncedHandle = debounce(this.#deleteCommentHandler);

    this.getElement().addEventListener('click', debouncedHandle);
  }

  #deleteCommentHandler = (evt) => {
    if (!evt.target.matches('.film-details__comment-delete')) {
      return;
    }

    if (!isOnline()) {
      toast('You can\' delete comment offline');
      return;
    }

    evt.preventDefault();

    this.callback.delete({
      delete: evt.target.dataset.id,
      comments: this.#comments,
    });
  };

  #setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#changeEmojiHandler);
    this.getElement().querySelector('.film-details__comment-input')
      .addEventListener('input', this.#inputCommentHandler);
  }

  #changeEmojiHandler = (evt) => {
    this.updateData({
      emotion: evt.target.value,
    });
  };

  #inputCommentHandler = (evt) => {
    this.updateData({
      comment: evt.target.value,
    }, true);
  };
}
