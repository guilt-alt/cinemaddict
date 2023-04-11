export const getMostRatedFilms = (films, count) => films.sort((
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
}).slice(0, count);

export const getMostCommentedFilms = (films, count) => films.sort((
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
}).slice(0, count);
