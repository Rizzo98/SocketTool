require ('../drag.js')
module.exports = function () {
	var self = this;
	self.toListView = function () {
		spa.n.navigate("views/list");
	}
};


exports.changeRoute = function(url){
		spa.n.navigate("views/list",url);
}
