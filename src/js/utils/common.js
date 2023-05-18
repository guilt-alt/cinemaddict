import { DEBOUNCE_TIMEOUT } from '@utils/const.js';

export const onEscKeyDown = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export const onCtrlEnterKeyDown = (evt) => (evt.ctrlKey && evt.key === 'Enter');

export function debounce(cb, timeoutMs = DEBOUNCE_TIMEOUT) {
  return function perform(evt, ...args) {
    evt.preventDefault();
    const prevCall = this.lastCall;
    this.lastCall = Date.now();

    if (prevCall && this.lastCall - prevCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer);
    }

    this.lastCallTimer = setTimeout(() => cb(...args), timeoutMs);
  };
}

export const shake = (element) => {
  const { style } = element;
  style.animation = `shake ${600 / 1000}s`;

  setTimeout(() => {
    style.animation = '';
  }, 600);
};
