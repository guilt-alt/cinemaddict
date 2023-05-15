import Abstract from '@view/abstract.js';

const createStats = () => '<section class="statistic"></section>';

export default class StatsView extends Abstract {
  #createStats = createStats();

  getTemplate() {
    return this.#createStats;
  }
}
