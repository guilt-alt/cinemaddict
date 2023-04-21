export const getMostRatedFilms = (films) => films.slice()
  .sort((
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
  });

export const getMostCommentedFilms = (films) => films.slice()
  .sort((
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
  });
