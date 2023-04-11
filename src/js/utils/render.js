import Abstract from '@view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (containerEl, childEl, place) => {
  const container = containerEl instanceof Abstract ? containerEl.getElement() : containerEl;
  const child = childEl instanceof Abstract ? childEl.getElement() : childEl;

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    default:
      throw new Error('Ни один кейс не совпал.');
  }
};
