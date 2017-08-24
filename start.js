var ip = require('ip');
var dgram = require('dgram');
var server = dgram.createSocket("udp4");
var network = require('network');
var conf = require('./readConf.js')

const SENDPORT = 41234;
var BROADADDR = '';
var NAME = '';

network.get_active_interface(function(err, obj) {
	BROADADDR= ip.or(ip.address(),ip.not(obj.netmask));
})

conf.getName(function(x){
	NAME = x
})

server.bind(function () {
	server.setBroadcast(true)
	server.setMulticastLoopback(true)
	setInterval(sendIn,3000);
})

function sendIn() {
	conf.getName(function(x){
		NAME = x
	})
	var message = new Buffer(JSON.stringify({name:NAME}));
	server.send(message, 0, message.length, SENDPORT, BROADADDR, function () {
		console.log("Sent '" + message + "'");
	});
}

exports.shutDown = function () {
    var message = new Buffer(JSON.stringify({out:true}));
    server.send(message, 0, message.length, SENDPORT, BROADADDR, function () {
		console.log("Sent '" + message + "'");
	});
}
