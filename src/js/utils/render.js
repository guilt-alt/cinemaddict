export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    default:
      throw new Error('Ни один кейс не совпал.');
  }
};

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
