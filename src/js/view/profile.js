import { createElement } from '@utils/render.js';

const createUserProfile = () => `<section class="header__profile profile">
  <p class="profile__rating">Movie Buff</p>
  <img class="profile__avatar" src="/cinemaddict/assets/images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;

export default class UserProfileView {
  #element = null;

  constructor() {
    this.createUserProfile = createUserProfile();
  }

  getTemplate() {
    return this.createUserProfile;
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
