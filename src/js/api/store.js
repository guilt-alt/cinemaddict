export default class Store {
  #storage = null;
  #key = null;

  constructor(key, storage) {
    this.#key = key;
    this.#storage = storage;
  }

  get items() {
    try {
      return JSON.parse(this.#storage.getItem(this.#key)) || {};
    } catch (err) {
      return {};
    }
  }

  set items(items) {
    this.#storage.setItem(
      this.#key,
      JSON.stringify(items)
    );
  }

  setItem(key, value) {
    const store = this.items;

    this.#storage.setItem(
      this.#key,
      JSON.stringify({
        ...store,
        ...{ [key]: value }
      })
    );
  }

  set removeItem(key) {
    const store = this.items;

    delete store[key];

    this.#storage.setItem(
      this.#key,
      JSON.stringify(store)
    );
  }
}
