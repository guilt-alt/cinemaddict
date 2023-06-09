import dayjs from 'dayjs';

export const sortByDate = (
  { filmDetails: { release: b } },
  { filmDetails: { release: a } },
) => dayjs(a).diff(dayjs(b));

export const sortByRating = (
  { filmDetails: { rating: b } },
  { filmDetails: { rating: a } },
) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

export const sortByComments = (
  { comments: b },
  { comments: a },
) => {
  if (a.length > b.length) {
    return 1;
  }
  if (a.length < b.length) {
    return -1;
  }
  return 0;
};
