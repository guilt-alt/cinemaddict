import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { BAR_HEIGHT } from '@utils/const.js';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

export default (statsCtx, genres) => {
  const ctx = statsCtx;
  ctx.height = BAR_HEIGHT * genres.size < 300 ? 300 : BAR_HEIGHT * genres.size;

  return new Chart(ctx, {
    type: 'bar',
    plugins: [ChartDataLabels],
    data: {
      labels: [...genres.keys()],
      datasets: [{
        data: [...genres.values()],
        hoverBackgroundColor: '#ffe800',
        backgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: false,
        tooltip: {
          enabled: false,
        },
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxis: {
          ticks: {
            padding: 40,
            font: {
              size: 0.0001,
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#ffffff',
            font: {
              size: 20,
              weight: 700,
            },
          },
          grid: {
            display: false,
          },
        },
        x: {
          display: false,
        },
      },
    },
  });
};
