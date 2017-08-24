(function () {

	var fs = require('fs');
	var path = require('path');
	var rootDir = './';

	var Navigator = function (element) {
		var self = this;
		var _element = element;
		var _v = null;
		var args = null

		self.navigate = function (view, arg) {
			if(arg != undefined){
				args = arg
			}
			location.hash = "#" + view;
		};

		window.addEventListener("hashchange", function () {
			var hash = location.hash;
			var viewName = hash.slice(1, hash.length);
			_navigate(viewName,args);
		}, false);

		var _navigate = function name(view, args) {
			fs.readFile(rootDir + view + ".html", "utf-8", function (err, data) {
				if (_v != null) {
					ko.removeNode(_v);
					_v = null;
				}
				element.innerHTML = data;
				_v = document.getElementById(view)
				var vmModule = _v.getAttribute("data-vm");
				VM = require('../' + vmModule + '.js');
				if(args != null){
					ko.applyBindings(new VM(args), _v);
				}else{
					ko.applyBindings(new VM(), _v);
				}
			});
		}
	};

	module.exports = function (element) {
		var navigator = new Navigator(element);
		return {
			n: navigator
		};
	};

})();
