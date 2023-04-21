import Abstract from '@view/abstract.js';

const createNavigation = (filters) => {
  const links = filters.map(({ name, count }) => `<a href="#${name}" class="main-navigation__item">${name[0].toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`).join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>

      ${links}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav >`;
};

export default class NavigationView extends Abstract {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  getTemplate() {
    return createNavigation(this.#data);
  }
}
