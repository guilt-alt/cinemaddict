import Smart from '@view/smart.js';
import renderChart from '@utils/chart.js';

const createStatsChart = () => (
  `<div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000" ></canvas>
  </div>`
);

export default class ChartView extends Smart {
  #data = null;

  #chart = null;

  #createStatsChart = createStatsChart();

  constructor(data) {
    super();
    this.#data = data;

    this.#setChart();
  }

  getTemplate() {
    return this.#createStatsChart;
  }

  #setChart() {
    if (this.#chart !== null) {
      this.#chart = null;
    }

    if (this.#data.size === 0) {
      return;
    }

    const statsCtx = this.getElement().querySelector('.statistic__chart');
    this.#chart = renderChart(statsCtx, this.#data);
  }
}
