import Abstract from '@view/abstract.js';
import { getUserRank } from '@utils/stats.js';

const createUserProfile = (data) => {
  const rank = getUserRank(data);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" alt="Avatar" width="35" height="35"
        src="/cinemaddict/assets/images/bitmap@2x.png">
    </section>`
  );
};

export default class UserProfileView extends Abstract {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  getTemplate() {
    return createUserProfile(this.#data);
  }
}
