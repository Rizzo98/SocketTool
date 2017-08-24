var fs = require('fs');

exports.getName = function(cb){
  fs.readFile('config.json','utf8',(err, data) =>{
    if (err){
        console.log(err);
    } else {
      if(data != ''){
        object = JSON.parse(data)
        cb(object.name)
      }
    }
  })
}

exports.getFolder = function(cb){
  fs.readFile('config.json','utf8',(err, data) =>{
    if (err){
        console.log(err);
    } else {
      if(data != ''){
        object = JSON.parse(data);
        cb(object.saveFolder)
      }
    }
  })
}
