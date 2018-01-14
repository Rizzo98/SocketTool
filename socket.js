var io = require('socket.io')();
var fs = require('fs');
const conf = require('./readConf.js')


io.on('connection', function(socket){

  socket.on('send',(x)=>{
  		a.push(x.bf)
  		if(x.len-x.index==1){
  			b = Buffer.concat(a)
  			conf.getFolder(function(k){
  				path = k+'/'+x.name
  				fs.writeFile(path,toBuffer(b), (error) =>{console.log(path)})
  			})
  		}
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
