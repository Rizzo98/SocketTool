var io = require('socket.io')();
var fs = require('fs');

io.on('connection', function(socket){

    socket.on('inviami', (data) =>{
      fs.readFile('music.mp3',(err,datas) =>{
          fs.writeFile('server.mp3',datas, (error) =>{
              console.log(datas)
          });
          socket.emit('ricevimi',datas);
      });
    })

    socket.on('send',(d) =>{
      fs.writeFile(d.name,toBuffer(d.data), (error) =>{

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
