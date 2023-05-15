import Abstract from '@view/abstract.js';

const createStatsList = ({ count, topGenre, duration: { h, m } }) => (
  `<ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${count}
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">
          ${h} <span class="statistic__item-description">h</span>
          ${m} <span class="statistic__item-description">m</span>
        </p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}
      </li>
    </ul>`
);

export default class StatsList extends Abstract {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  getTemplate() {
    return createStatsList(this.#data);
  }
}
