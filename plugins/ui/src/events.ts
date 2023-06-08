import { EventEmitter } from 'eventemitter3';

type GlobalEvents = {
  'sidebar:open': () => void;
};

const emitter = new EventEmitter<GlobalEvents>();

export { emitter };
