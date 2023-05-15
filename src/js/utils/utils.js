import dayjs from 'dayjs';

export const onEscKeyDown = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export const getRandomInt = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);

  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

export const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateDate = () => {
  const maxDayGap = 7;
  const daysGap = getRandomInt(-maxDayGap, maxDayGap);

  return dayjs().add(daysGap, 'day').format('DD MMMM YYYY');
};

export const generateWatchingDate = () => {
  const minDayGap = 0;
  const maxDayGap = -365;
  const daysGap = getRandomInt(minDayGap, maxDayGap);
  return dayjs().add(daysGap, 'day').format('DD MMMM YYYY');
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const cutArray = (arr) => arr.slice(0, getRandomInt(1, arr.length));
