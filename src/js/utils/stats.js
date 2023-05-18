import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { RankTitle, RankScore } from '@utils/const.js';

dayjs.extend(duration);

const getUserRank = (films) => {
  const totalWatched = films
    .reduce((count, { userDetails: { isWatched } }) => count + Number(isWatched), 0);

  if (totalWatched >= RankScore.NOVICE.MIN && totalWatched <= RankScore.NOVICE.MAX) {
    return RankTitle.NOVICE;
  }

  if (totalWatched >= RankScore.FAN.MIN && totalWatched <= RankScore.FAN.MAX) {
    return RankTitle.FAN;
  }

  if (totalWatched > RankScore.FAN.MAX) {
    return RankTitle.MOVIE_BUFF;
  }

  return RankTitle.NONE;
};

const getAllGenres = (films) => {
  const countedGenres = films
    .reduce((allGenres, { filmDetails: { genre } }) => {
      allGenres.push(...genre);
      return allGenres;
    }, [])
    .reduce((sum, el) => {
      const genres = sum;
      genres[el] = (genres[el] || 0) + 1;
      return genres;
    }, {});

  const sortedGenres = new Map(Object.entries(countedGenres).sort(([, a], [, b]) => b - a));
  const topGenre = sortedGenres.keys().next().value ?? '-';

  return {
    genres: sortedGenres,
    topGenre,
  };
};

export const getDuration = (filmDuration) => {
  const totalMinutes = dayjs.duration(filmDuration, 'minutes').as('minutes');
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

export const capitalize = (text) => text[0].toUpperCase() + text.slice(1);

export const getShortDescription = (description) => {
  const shortDescription = description.length > 140 ? `${description.slice(0, 139)}...` : description;

  return capitalize(shortDescription);
};

export const getReleaseYear = (release) => dayjs(release).$y;

export const getReleaseDate = (release) => dayjs(release).format('DD MMM YYYY');

const getTotalDuration = (films) => {
  const totalMinutes = films.reduce((sum, { filmDetails: { duration: filmDuration } }) => {
    let sumDuration = sum;
    sumDuration += dayjs.duration(filmDuration, 'minutes').as('minutes');

    return sumDuration;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    h: hours,
    m: minutes,
  };
};

export default (films) => ({
  count: films.length,
  rank: getUserRank(films),
  duration: getTotalDuration(films),
  ...getAllGenres(films),
});
