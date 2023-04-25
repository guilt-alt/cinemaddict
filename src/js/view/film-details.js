import Smart from '@view/smart.js';
import { onEscKeyDown } from '@utils/utils.js';
import { EMOTIONS } from '@utils/const.js';

const createCommentEmoji = (emotion) => (emotion ? `<img src="/cinemaddict/assets/images/emoji/emoji-${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : '');

const createEmotionInputsList = (checkedEmotion) => EMOTIONS.map((emotion) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji"
      type="radio" id="emoji-${emotion}" value="${emotion}" ${emotion === checkedEmotion ? 'checked' : ''}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="/cinemaddict/assets/images/emoji/emoji-${emotion}.png" width="30" height="30" alt="${emotion}">
    </label>`).join('');

const createNewCommentForm = (emotionTemplate, comment, checkedEmotion) => `<div class="film-details__new-comment">
  <div class="film-details__add-emoji-label">
    ${emotionTemplate || ''}
  </div>
  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment || ''}</textarea>
  </label>
  <div class="film-details__emoji-list">
    ${createEmotionInputsList(checkedEmotion)}
  </div>
</div>`;

const createFilmDetails = ({ filmDetails, userDetails }, emojiElement, comment, checkedEmotion) => {
  const {
    poster, title, originalTitle, rating, director, writers,
    actors, release, duration, country, genres, description, ageRating,
  } = filmDetails;

  const {
    isWatchlist, isWatched, isFavorite,
  } = userDetails;

  const createGenres = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

  // const createComments = comments.map(
  // ({ text, emotion, author, date }) => `<li class="film-details__comment">
  //       <span class="film-details__comment-emoji">
  //         <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
  //       </span>
  //       <div>
  //         <p class="film-details__comment-text">${text}</p>
  //         <p class="film-details__comment-info">
  //           <span class="film-details__comment-author">${author}</span>
  //           <span class="film-details__comment-day">${date}</span>
  //           <button class="film-details__comment-delete">Delete</button>
  //         </p>
  //       </div>
  //     </li>`).join(``);

  const newCommentForm = createNewCommentForm(emojiElement, comment, checkedEmotion);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="/cinemaddict/assets/images/posters/${poster}" alt="">
              <p class="film-details__age">${ageRating}</p>
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
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${release}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${createGenres}
              </tr>
            </table>
            <p class="film-details__film-description">${description}</p>
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
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
          <ul class="film-details__comments-list">
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="/cinemaddict/assets/images/emoji/emoji-smile.png" width="55" height="55" alt="emoji-smile">
              </span>
              <div>
                <p class="film-details__comment-text">Interesting setting and a good cast</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">Tim Macoveev</span>
                  <span class="film-details__comment-day">2019/12/31 23:59</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="/cinemaddict/assets/images/emoji/emoji-sleeping.png" width="55" height="55" alt="emoji-sleeping">
              </span>
              <div>
                <p class="film-details__comment-text">Booooooooooring</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">John Doe</span>
                  <span class="film-details__comment-day">2 days ago</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="/cinemaddict/assets/images/emoji/emoji-puke.png" width="55" height="55" alt="emoji-puke">
              </span>
              <div>
                <p class="film-details__comment-text">Very very old. Meh</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">John Doe</span>
                  <span class="film-details__comment-day">2 days ago</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="/cinemaddict/assets/images/emoji/emoji-angry.png" width="55" height="55" alt="emoji-angry">
              </span>
              <div>
                <p class="film-details__comment-text">Almost two hours? Seriously?</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">John Doe</span>
                  <span class="film-details__comment-day">Today</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
          </ul>
          ${newCommentForm}
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetailsView extends Smart {
  #data = null;

  #scroll = 0;

  #emoji = null;

  #emojiElement = null;

  #comment = null;

  constructor(data) {
    super();
    this.#data = data;

    this.#setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetails(this.#data, this.#emojiElement, this.#comment, this.#emoji);
  }

  removeDocumentHandler() {
    document.removeEventListener('keydown', this.#closeDetailsHandler);
  }

  restoreHandlers() {
    this.clickWatchlistHandler = this.callback.watchlist;
    this.clickFavoriteHandler = this.callback.favorite;
    this.clickWatchedHandler = this.callback.watched;

    this.#setInnerHandlers();
    this.#setScrollPosition();
  }

  set clickWatchlistHandler(callback) {
    this.callback.watchlist = callback;
    this.getElement()
      .querySelector('.film-details__control-label--watchlist')
      .addEventListener('click', this.#clickWatchlistHandler);
  }

  set clickWatchedHandler(callback) {
    this.callback.watched = callback;
    this.getElement()
      .querySelector('.film-details__control-label--watched')
      .addEventListener('click', this.#clickWatchedHandler);
  }

  set clickFavoriteHandler(callback) {
    this.callback.favorite = callback;
    this.getElement()
      .querySelector('.film-details__control-label--favorite')
      .addEventListener('click', this.#clickFavoriteHandler);
  }

  set closeDetailsHandler(callback) {
    this.callback.close = callback;

    document.addEventListener('keydown', this.#closeDetailsHandler);
    this.getElement().addEventListener('click', this.#closeDetailsHandler);
  }

  #getScrollPosition() {
    this.#scroll = this.getElement().scrollTop;
  }

  #setScrollPosition() {
    this.getElement().scrollTop = this.#scroll;
  }

  #setInnerHandlers() {
    this.getElement().querySelector('.film-details__comment-input')
      .addEventListener('input', this.#inputCommentHandler);
    this.getElement().querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#changeEmojiHandler);
  }

  #clickWatchlistHandler = (evt) => {
    evt.preventDefault();
    this.#setScrollPosition();
    this.callback.watchlist(evt);
  };

  #clickWatchedHandler = (evt) => {
    evt.preventDefault();
    this.#setScrollPosition();
    this.callback.watched(evt);
  };

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.#setScrollPosition();
    this.callback.favorite(evt);
  };

  #closeDetailsHandler = (evt) => {
    if (onEscKeyDown(evt) || evt.target.matches('.film-details__close-btn')) {
      evt.preventDefault();
      this.callback.close();
    }
  };

  #changeEmojiHandler = (evt) => {
    this.#emojiElement = createCommentEmoji(evt.target.value);
    this.#emoji = evt.target.value;

    this.#getScrollPosition();
    this.updateElement();
  };

  #inputCommentHandler = (evt) => {
    this.#comment = evt.target.value;
  };
}
