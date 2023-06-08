const createResolvable = <T>() => {
  let resolve: (value: T) => void = () => {};
  let reject: (error: unknown) => void = () => {};
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

type Resolbable<T> = ReturnType<typeof createResolvable<T>>;
type Task<T> = {
  resolvable: Resolbable<T>;
  fn: () => Promise<T>;
};

class Queue {
  #running = false;
  #tasks: Task<any>[] = [];

  #run = async () => {
    this.#running = true;

    const task = this.#tasks.shift();
    if (!task) {
      this.#running = false;
      return;
    }

    const { resolvable, fn } = task;
    try {
      const result = await fn();
      resolvable.resolve(result);
    } catch (error) {
      resolvable.reject(error);
    }
    await this.#run();
  };

  public add = <T>(fn: () => Promise<T>) => {
    const resolvable = createResolvable<T>();
    this.#tasks.push({ resolvable, fn });
    if (!this.#running) {
      this.#run();
    }
    return resolvable.promise;
  };
}

export { Queue };
