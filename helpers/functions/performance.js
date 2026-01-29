export function debounce (func, delay = 100) {

  if (typeof func !== "function") return;

  let timer;

  return function (...args) {

    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }
}


export function throttle (func, delay = 100) {

  if (typeof func !== "function") return;

  let flag = true;
  
  return function (...args) {
  
    if (flag) {
      func(...args);
      flag = false;
      setTimeout(() => flag = true, delay);
    }
  }
}


export function memoize(func) {

  if (typeof func !== "function") return;

  let cache = {};

  return function (...args) {

    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }
    else {
      const result = func(...args);
      cache[key] = result;
      return result;
    }
  }
}