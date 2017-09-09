var io = require('socket.io')();
var fs = require('fs');
const conf = require('./readConf.js')


io.on('connection', function(socket){

    socket.on('send',(d) =>{
      conf.getFolder(function(x){
        path = x+'/'+d.name
        fs.writeFile(path,toBuffer(d.data), (error) =>{console.log(path)})
      })
    })

    socket.on('end', function (){
      socket.disconnect(0);
    });

});
io.listen(3000);


function toBuffer(ab) {
  var buf = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}
