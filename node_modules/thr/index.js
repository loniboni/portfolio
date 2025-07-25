/**
 * reduced overhead transform stream
 */
var Transform = require('stream').Transform;
module.exports = function (fn, flush, opts) {
  return new thr(fn, flush, opts);
}

function thr(fn,flush, opts){
  if(flush) this._flush = flush;
  this._transform = fn;
  Transform.call(this, opts || {objectMode:true});
}

require('utildot').inherits(thr, Transform);
