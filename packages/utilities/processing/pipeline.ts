/**
 * A basic pipeline for incrementally transforming data via a series of functions.
 * Each function in the pipeline must return a transformed result. This result is then passed
 * to the next function, etc., before the final result is returned.
 * See: https://medium.com/@ian_grubb/function-piping-in-javascript-a125b0876a2b
 *
 * Usage:
 *   const data = 0;
 *   const increase = (x) => x + 1;
 *   return pipline(data, increase, increase, increase); // 3
 *
 * If you need to pass parameters to your pipeline functions, you can use the toPipe function.
 * It has a slightly different syntax, and requires a `.value` call at the end to get the result.
 *
 * Usage:
 *   const data = 0;
 *   const sum = (x, y) => x + y;
 *   return toPipe(data)
 *     .to(sum, 1)
 *     .to(sum, 1)
 *     .to(sum, 1)
 *     .value; // 3
 */

export const pipeline = (value: any, ...functions: Array<any>) => pipe(...functions)(value);
const combine = (result: any, nextFun: any) => nextFun(result);
const pipe = (...funs: Array<any>) => (x: any) => funs.reduce(combine, x);

export const toPipe = (value: any) => ({
  value,
  to: (cb: any, ...args: Array<any>) => toPipe(cb(value, ...args))
});
