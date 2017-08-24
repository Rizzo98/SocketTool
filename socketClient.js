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
         $("#list li:last").after('<li class="list-group-item elm">'+ el.name +'<div class="vcenter text-right"><button type="button" class="btn center send" id='+el.addr+'>Send</button></div></li>');
       })
     }
   }});
}

function send(ip){
  var socket = io('http://'+ip+':3000');

  socket.on('connect', function(){
    fs.readFile(URL, (err,d) => {
      socket.emit('send',{data: d, name: NAME});
      socket.emit('end');
    })

  });

}

$('#list').on('click','.send', (e)=>{
    var x = jQuery(e.currentTarget.attributes.id)
    send(x[0].value)
})

exports.getURL = function(urls){
  URL = urls.path
  NAME = urls.name
}
