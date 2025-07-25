# thr

reduced overhead transform stream. same interface as `through2` but lighter

# install
```bash
$ npm i thr
```

#  use
```js
var thr = require('thr')
var t  = thr(function (msg, _, cb) {

  //push or change the incoming data
  this.push(msg)

  //callback moves stream forward to next chunk
  cb()
}, null, {objectMode:true}) // the default is objectMode:true
// btw `null`, and `opts` here after the function are both optional

//pipe to it from some source stream, like readable
readable.pipe(t)
```
