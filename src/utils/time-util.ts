export function asyncDelay(start: number, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, Math.min(delay - (new Date().getTime() - start), delay));
  });
}

export async function asyncTimeout(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, timeout);
  });
}
