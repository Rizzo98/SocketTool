var holder = document.getElementById('drag-file');
var model = require('./viewModels/dragModel.js');
var $ = require('jQuery');


holder.ondragover = () => {
    return false;
};

holder.ondragleave = () => {
    return false;
};

holder.ondragend = () => {
    return false;
};

holder.ondrop = (e) => {
    e.preventDefault();

    for (let f of e.dataTransfer.files) {
        model.changeRoute({path: f.path, name: f.name})
    }

    return false;
};

$('#setting').click(function(){
  model.setting();
})
