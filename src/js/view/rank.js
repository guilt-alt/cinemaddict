import Abstract from '@view/abstract.js';

const createRank = (rank) => (
  `<p class="statistic__rank">Your rank
    <img class="statistic__img" src="/cinemaddict/assets/images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${rank}</span>
  </p>`
);

export default class Rank extends Abstract {
  #rank = null;

  constructor(rank) {
    super();
    this.#rank = rank;
  }

  getTemplate() {
    return createRank(this.#rank);
  }
}
