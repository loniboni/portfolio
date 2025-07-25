var Writable = require('stream').Writable;

function resumer(stream) {
  if (!stream.readable) {
    return stream;
  }
  stream._read ? stream.pipe(new Sink) : stream.resume();

  return stream;
}

function Sink() {
  this._write = function(_, _, cb) {
    process.nextTick(cb);
  }

  Writable.call(this, {
    objectMode: true
  });
}

require('utildot').inherits(Sink, Writable);
