/**
* Try catch Decorator
*
* @ original author  Avraam Mavridis      <avr.mav@gmail.com>
* https://github.com/AvraamMavridis/javascript-decorators/blob/master/src/%40trycatch.js
*
* @ modified and by Bowen
* 
*/
// import { descriptorIsFunc } from './helpers';

function isFunction(prop): boolean {
  return typeof prop === 'function';
}

function descriptorIsFunc(key, func): boolean | Error {
  if (!isFunction(func)) {
    throw Error(`${key} is not a function!`);
  }
  return true;
};

/**
 * Try-catch decorator
 *
 * @method _timeout
 *
 * @param  { func } errorHandler
 *
 */
export function Trycatch (errorHandler: (any) => any) {

  if (!isFunction(errorHandler)) {
    throw Error(`The ErrorHandler should be a function. ${JSON.stringify(errorHandler)} is not a function`);
  }

  return function (key, target, descriptor) {
    const func = descriptor.value;
    descriptorIsFunc(key, func);
    descriptor.value = function (...args) {
      let res;
      try {
        res = func.apply(this, args);
      } catch (e) {
        errorHandler(e);
      }
      return res;
    };
    return descriptor;
  };
}