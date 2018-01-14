var fs = require('fs');
var $ = require('jQuery');

var URL = null
var NAME = null

update();
updateList();

function update(){
  setTimeout(function(){
     updateList();
     update();
  },2000);
}

function updateList(){
  $('.elm').remove();
  fs.readFile('saved.json', 'utf8',(err, data) =>{
     if (err){
         console.log(err);
     } else {
     if(data != ''){
       object = JSON.parse(data);
       object.list.forEach(function(el){
         $("#list li:last").after('<li class="list-group-item elm">'+ el.name +'<div class="vcenter text-right"><button type="button" class="btn center send" id='+el.addr+'><span class="glyphicon glyphicon-share"></span></button></div></li>');
       })
     }
   }});
}

function send(ip){
  var socket = io('http://'+ip+':3000');

  socket.on('connect', function(){
    fs.readFile(URL, (err,d) => {
      tempBuffer = new Buffer(d.length/100)
      bufferList = []
      for(i = 0; i<tempBuffer.length*100; i +=tempBuffer.length){
        d.copy(tempBuffer,0,i,(i+1)*(tempBuffer.length)-1)
        bufferList.push(tempBuffer)
        tempBuffer = new Buffer(d.length/100)
      }
      lastBuffer = new Buffer(d.length-tempBuffer.length*100)
      if(tempBuffer.length != 0){
        d.copy(lastBuffer,0,tempBuffer.length*100,d.length)
        bufferList.push(lastBuffer)
      }

      c=0
      bufferList.forEach((i)=>{
        socket.emit('send',{bf:i,index:c,name:NAME,len:bufferList.length})
        c++
      })

      socket.emit('end');
    })

  });

}

$('#list').on('click','.send', (e)=>{
    var x = $(e.currentTarget.attributes.id)
    send(x[0].value)
})

exports.getURL = function(urls){
  URL = urls.path
  NAME = urls.name
}
