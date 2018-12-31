const isFunction = value => typeof value === 'function';

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
  constructor (handler) {
    if (!isFunction(handler)) {
      throw new Error('MyPromise must accept a function as a parameter!');
    }

    this._status = PENDING;
    this._value = undefined;
    this._fulfilledQueues = [];
    this._rejectedQueues = [];

    try {
      handler(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise(resolve => resolve(value));
  }

  static reject(error) {
    return new MyPromise((resolve, reject) => reject(value));
  } 

  static all(list) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let count = 0;
      for(let [i, p] of list.entries()) {
        this.resolve(p).then(res => {
          results[i] = res;
          count++;
          if(count === list.length) resolve(results);
        }, err => {
          reject(err);
        })
      }
    })
  }

  static race(list) {
    return new MyPromise((resolve, reject) => {
      for(let p of list) {
        this.resolve(p).then(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
      }
    })
  }

  static finally(cb) {
    return this.then(
      value => MyPromise.resolve(cb()).then(() => value),
      err => MyPromise.reject(cb()).then(() => { throw err })
    )
  }

  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return;
      this._status = FULFILLED;

      const runFulfilled = value => {
        let cb;
        while(cb = this._fulfilledQueues.shift()) {
          cb(value);
        }
      }

      const runRejected = error => {
        let cb;
        while(cb = this._rejectedQueues.shift()) {
          cb(error);
        }
      }

      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value;
          runFulfilled(value);
        }, err => {
          this._value = err;
          runRejected(err);
        })
      } else {
        this._value = val;
        runFulfilled(val);
      }
    }

    setTimeout(run, 0);
  }

  _reject(err) {
    if (this._status !== PENDING) return;

    const run = () => {
      this._status = REJECTED;
      this._value = err;
      let cb;
      while(cd = this._rejectedQueues.shift()) {
        cb(err);
      }
    }

    setTimeout(run, 0);
  }

  then(onFulfilled, onRejected) {
    const { _value, _status } = this;

    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      const fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            const result = onFulfilled(value);
            if (result instanceof MyPromise) {
              result.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(result);
            }
          }
        } catch(err) {
          onRejectedNext(err);
        }
      }

      const rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            const result = onRejected(error);
            if (result instanceof MyPromise) {
              result.then(onFulfilledNext, onRejectedNext);
            } else {
              onRejectedNext(error);
            }
          }
        } catch(err) {
          onRejectedNext(err);
        }
      }

      switch(_status) {
        case PENDING:
          this._fulfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);
          break;
        case FULFILLED:
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
}