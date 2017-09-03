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

exports.getKeys = function(cb){
  fs.readFile('config.json','utf8',(err, data) =>{
    if (err){
        console.log(err);
    } else {
      if(data != ''){
        object = JSON.parse(data);
        cb(object.keys)
      }
    }
  })
}

exports.setFolder = function(path,cb){
  fs.readFile('config.json','utf8',(err, data) =>{
    if (err){
        console.log(err);
    } else {
      if(data != ''){
        object = JSON.parse(data);
        object.saveFolder = path;
        var json = JSON.stringify(object);
        fs.writeFile('config.json',json,'utf8', () => {cb()});
      }
    }
  })
}

exports.setName = function(name,cb){
  fs.readFile('config.json','utf8',(err, data) =>{
    if (err){
        console.log(err);
    } else {
      if(data != ''){
        object = JSON.parse(data);
        object.name = name;
        var json = JSON.stringify(object);
        fs.writeFile('config.json',json,'utf8', () => {cb()});
      }
    }
  })
}

exports.setKeys = function(keys,cb){
  fs.readFile('config.json','utf8',(err, data) =>{
    if (err){
        console.log(err);
    } else {
      if(data != ''){
        object = JSON.parse(data);
        object.keys = keys;
        var json = JSON.stringify(object);
        fs.writeFile('config.json',json,'utf8', () => {cb()});
      }
    }
  })
}
