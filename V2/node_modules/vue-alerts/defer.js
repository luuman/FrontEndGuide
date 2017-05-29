export default function () {
  var resolve
  var reject

  var promise = new Promise((resolves, rejects) => {
    resolve = resolves
    reject = rejects
  })

  return {
    promise: promise,
    resolve: resolve,
    reject: reject
  }
}
