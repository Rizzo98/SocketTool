var holder = document.getElementById('drag-file');
var model = require('./viewModels/dragModel.js');

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
