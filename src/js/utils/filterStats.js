import dayjs from 'dayjs';
import { StatsFilterType, DateFormat } from '@utils/const.js';

const currentDate = dayjs();

export const getFilters = () => [
  {
    type: StatsFilterType.ALL,
    name: 'All time',
  },
  {
    type: StatsFilterType.TODAY,
    name: 'Today',
  },
  {
    type: StatsFilterType.WEEK,
    name: 'Week',
  },
  {
    type: StatsFilterType.MONTH,
    name: 'Month',
  },
  {
    type: StatsFilterType.YEAR,
    name: 'Year',
  },
];

export default {
  [StatsFilterType.ALL]: (films) => films
    .filter(({ userDetails: { isWatched } }) => isWatched),
  [StatsFilterType.TODAY]: (films) => films
    .filter(({ userDetails: { isWatched, date } }) => isWatched && dayjs(date)
      .isSame(currentDate, DateFormat.DAY)),
  [StatsFilterType.WEEK]: (films) => films
    .filter(({ userDetails: { isWatched, date } }) => isWatched && dayjs(date)
      .isBetween(DateFormat.WEEK, currentDate)),
  [StatsFilterType.MONTH]: (films) => films
    .filter(({ userDetails: { isWatched, date } }) => isWatched && dayjs(date)
      .isBetween(DateFormat.MONTH, currentDate)),
  [StatsFilterType.YEAR]: (films) => films
    .filter(({ userDetails: { isWatched, date } }) => isWatched && dayjs(date)
      .isBetween(DateFormat.YEAR, currentDate)),
};
