var fs = require('fs');
var temp = {list : []};

exports.addClient = function (obj){
 fs.readFile('saved.json', 'utf8',(err, data) =>{
    if (err){
        console.log(err);
    } else {
    flag = false;
    if(data != ''){
      object = JSON.parse(data);
      object.list.forEach(function(el){
        if (obj.addr == el.addr){
          flag = true;
        }
      })
    }
    if (flag==false){
      temp.list.push(obj);
      var json = JSON.stringify(temp);
      fs.writeFile('saved.json',json,'utf8', () => {});
    }
  }});
}

exports.clearClient = function (){
  fs.writeFile('saved.json','','utf8', () => {});
}
