import { getRandomInt, getRandomItem, generateDate } from '@utils/utils.js';

const comments = [
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'Interesting setting and a good cast',
];

const emotions = [
  'puke',
  'smile',
  'angry',
  'sleeping',
];

const authors = [
  'John Doe',
  'Tim Macoveev',
  'Austin Powers',
  'Michael Random',
];

const comment = () => ({
  id: getRandomInt(0, 22),
  text: getRandomItem(comments),
  emotion: getRandomItem(emotions),
  author: getRandomItem(authors),
  date: generateDate(),
});

export default comment;
