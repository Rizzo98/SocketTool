 const s = require ('../socketClient.js')
module.exports = function (data) {
	s.getURL(data)
	var self = this;
	self.toDragview = function () {
		spa.n.navigate("views/drag");
	}
};
