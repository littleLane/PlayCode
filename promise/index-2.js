const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

let newPromise = null;

function MyPromise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null;
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }

    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = RESOLVED;
        that.value = value;
        that.resolvedCallbacks.map(cb => cb(that.value));
      }
    }, 0);
  }

  function reject(value) {
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallbacks.map(cb => cd(that.value));
      }
    }, 0);
  }

  try {
    fn(resolve, reject);
  } catch (err) {
    that.reject(err);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };

  if (that.state === PENDING) {
    return (
      newPromise = new MyPromise((resolve, reject) => {
        that.resolvedCallbacks.push(() => {
          try {
            const result = onFulfilled(that.value);
            resoluteProcedure(newPromise, result, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });

        that.rejectedCallbacks.push(() => {
          try {
            const result = onRejected(that.value);
            resoluteProcedure(newPromise, result, resolve, reject);
          } catch (err) {
            reject(err);
          }
        })
      })
    )
  }

  if (that.state === RESOLVED) {
    return (
      newPromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const result = onFulfilled(that.value);
            resoluteProcedure(newPromise, result, resolve, reject);
          } catch (err) {
            reject(err);
          }
        })
      })
    )
  }

  if (that.state === REJECTED) {
    return (
      newPromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const result = onRejected(that.value);
            resoluteProcedure(newPromise, result, resolve, reject);
          } catch (err) {
            reject(err);
          }
        })
      })
    )
  }
} 

MyPromise.prototype.resolve = function() {
  
}

function resoluteProcedure(newPromise, result, resolve, reject) {
  if (newPromise === result) {
    return reject(new TypeError('Error'));
  }

  if (result instanceof MyPromise) {
    result.then((value) => {
      resoluteProcedure(newPromise, value, resolve, reject);
    }, reject);
  }

  let called = false;
  if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
    try {
      let then = result.then;
      if (typeof then === 'function') {
        then.call(result, y => {
          if (called) return;
          called = true;
          resoluteProcedure(newPromise, y, resolve, reject);
        }, e => {
          if (called) return;
          called = true;
          reject(e);
        })
      } else {
        resolve(result);
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    resolve(x);
  }
}

// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1);
//   }, 0)
// }).then(value => {
//   console.log(value);
// })

MyPromise.resolve(4).then(value => console.log(value))