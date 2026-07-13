// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  let lastArgs: Parameters<T>;

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    lastArgs = args;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, lastArgs);
    }, delay);
  };

  debounced.cancel = () => clearTimeout(timer);

  debounced.flush = () => {
    debounced.cancel();
    fn(...lastArgs);
  };

  return debounced;
};

export default debounce;
