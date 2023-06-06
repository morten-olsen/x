import { EventEmitter } from 'eventemitter3';
import { Database } from '../../database';

type AuthEvents = {
  update: (service: string, data: any) => void;
};

class AuthStore extends EventEmitter<AuthEvents> {
  #data: Record<string, any> = {};
  #database: Database;

  constructor(database: Database) {
    super();
    this.#database = database;
  }

  public setData = async (service: string, data: any) => {
    this.#data[service] = data;
    this.#database.setAuth(service, data);
    this.emit('update', service, data);
  };

  public getData = async (service: string) => {
    if (!this.#data[service]) {
      this.#data[service] = await this.#database.getAuth(service);
    }
    return this.#data[service];
  };
}

export { AuthStore };
