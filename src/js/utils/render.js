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

export const replace = (newChildEl, oldChildEl) => {
  const newChild = newChildEl instanceof Abstract ? newChildEl.getElement() : newChildEl;
  const oldChild = oldChildEl instanceof Abstract ? oldChildEl.getElement() : oldChildEl;

  const parent = oldChild.parentElement;

  if (!parent || !oldChild || !newChild) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};
