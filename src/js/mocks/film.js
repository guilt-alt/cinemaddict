import {
  cutArray, getRandomInt, getRandomItem, generateDate,
} from '@utils/utils.js';

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
  'santa-claus-conquers-the-martians.jpg',
];

const titles = [
  'Sagebrush Trail',
  'The Dance of Life',
  'Made For Each Other',
  'Popeye Meets Sinbad',
  'The Great Flamarion',
  'The Man With The Golden Arm',
  'Santa Claus Conquers The Martians',
];

const genres = [
  'Drama',
  'Comedy',
  'Musical',
  'Western',
  'Cartoon',
  'Mystery',
];

const descriptions = [
  'Aliquam erat volutpat.',
  'In rutrum ac purus sit amet tempus.',
  'Nunc fermentum tortor ac porta dapibus.',
  'Aliquam id orci ut lectus varius viverra.',
  'Fusce tristique felis at fermentum pharetra.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
];

const getFilmData = () => ({
  poster: getRandomItem(posters),
  title: getRandomItem(titles),
  originalTitle: 'title',
  rating: `${getRandomInt(2, 9)}.${getRandomInt(0, 9)}`,
  producer: 'Michael Alan Spiller',
  writers: 'Билл Лоуренс, Дэб Фордхэм, Дженей Баккен',
  actors: 'Ken Jenkins, Sam Lloyd, Robert Maschio, Aloma Wright, John C. McGinley',
  release: generateDate(),
  year: getRandomInt(1929, 1964),
  duration: `${getRandomInt(0, 1)}h ${getRandomInt(0, 60)}m`,
  country: 'США',
  genres: cutArray(genres),
  description: cutArray(descriptions).join(' '),
  ageRating: '16+',
  comments: new Array(getRandomInt(0, 22)).fill('1'),
  isInWatchlist: Boolean(getRandomInt(0, 1)),
  isWatched: Boolean(getRandomInt(0, 1)),
  isFavorite: Boolean(getRandomInt(0, 1)),
});

export default getFilmData;
