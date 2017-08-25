require ('../setting.js')
module.exports = function () {
	var self = this;
	self.toListView = function () {
		spa.n.navigate("views/list");
	}
};
