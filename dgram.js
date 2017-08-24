const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const storage = require('./storage.js');
var fs = require('fs');
var ip = require('ip');


server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  obj = JSON.parse(msg)
  if(obj.hasOwnProperty('out')){
      deleteClient(rinfo.address)
  }else{
    if(ip.address() != rinfo.address){
      x = {name :obj.name, addr : rinfo.address};
      storage.addClient(x);
      console.log(`message from ${rinfo.address}:${rinfo.port}: ${x.name}`);
    }
  }
});

function deleteClient(ip){
  fs.readFile('saved.json', 'utf8',(err, data) =>{
     if (err){
         console.log(err);
     } else {
     if(data != ''){
       object = JSON.parse(data);
       object.list.forEach(function(el){
         if (el.addr == ip){
           object.list.splice(object.list.indexOf(el))
         }
       })
       json = JSON.stringify(object);
       fs.writeFile('saved.json',json,'utf8', () => {});
     }
   }});
}

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.on('close', () => {
  storage.clearClient();
});

server.bind(41234);
